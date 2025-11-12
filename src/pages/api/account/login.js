import jwt from 'jsonwebtoken';
import { JWT_API, NO_AUTHENTICATION_REQUIRED } from 'config';
import cors from 'utils/cors';
import users from 'data/users.json';
import { messages } from 'utils';

// constant
const JWT_SECRET = JWT_API.secret;
const JWT_EXPIRES_TIME = JWT_API.timeout;

export default async function handler(req, res) {
  await cors(req, res, NO_AUTHENTICATION_REQUIRED);

  let email;
  let password;
  let isMicroservicesRequest = false;

  // Check if this is a microservices request
  if (req.body?.metadata && req.body?.data) {
    // BeDemux format: { metadata: {...}, data: { email, password } }
    isMicroservicesRequest = true;
    ({ email, password } = req.body.data);
    console.log('🔐 [MOCKAPI] BeDemux microservices login request:', {
      correlationId: req.body.metadata?.correlationId,
      email
    });
  } else if (req.body?.data) {
    // Support legacy wrapped payload
    ({ email, password } = req.body.data);
  } else {
    // Support direct payload
    ({ email, password } = req.body);
  }

  const user = users.find((_user) => _user.email === email);

  if (!user) {
    const errorMessage = messages.errorMessages.verifyEmailAndPassword;
    if (isMicroservicesRequest) {
      return res.status(200).json({
        success: false,
        message: errorMessage,
        data: null,
        error: {
          code: 400,
          details: 'No user found with the provided email address'
        },
        meta: {
          correlationId: req.body.metadata?.correlationId,
          timestamp: new Date().toISOString(),
          service: 'aas-saas-mockapi'
        }
      });
    }
    return res.status(400).json({ message: errorMessage });
  }

  if (user.password !== password) {
    const errorMessage = messages.errorMessages.invalidPassword;
    if (isMicroservicesRequest) {
      return res.status(200).json({
        success: false,
        message: errorMessage,
        data: null,
        error: {
          code: 400,
          details: 'The provided password is incorrect'
        },
        meta: {
          correlationId: req.body.metadata?.correlationId,
          timestamp: new Date().toISOString(),
          service: 'aas-saas-mockapi'
        }
      });
    }
    return res.status(400).json({ message: errorMessage });
  }

  user.loginCount += 1;
  user.lastLoginAt = new Date().toISOString();
  user.updatedAt = new Date().toISOString();

  const serviceToken = jwt.sign({ userId: user.id }, JWT_SECRET || '', {
    expiresIn: JWT_EXPIRES_TIME
  });

  const userData = {
    id: user.id,
    email: user.email,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: user.avatar,
    role: user.role,
    apps: user.apps,
    dashboard: user.dashboard,
    extraPermissions: user.extraPermissions,
    deniedPermissions: user.deniedPermissions,
    loginCount: user.loginCount,
    lastLoginAt: user.lastLoginAt,
    locale: user.locale,
    timezone: user.timezone,
    deletedAt: user.deletedAt,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };

  if (isMicroservicesRequest) {
    console.log('✅ [MOCKAPI] Microservices login successful:', {
      correlationId: req.body.metadata?.correlationId,
      userId: user.id,
      email: user.email
    });
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        serviceToken,
        user: userData
      },
      meta: {
        correlationId: req.body.metadata?.correlationId,
        timestamp: new Date().toISOString(),
        service: 'aas-saas-mockapi'
      }
    });
  }

  // Legacy format for backward compatibility
  return res.status(200).json({
    serviceToken,
    user: userData
  });
}
