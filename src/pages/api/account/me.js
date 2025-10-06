// project imports
import { JWT_API, NO_AUTHENTICATION_REQUIRED } from 'config';
import cors from 'utils/cors';
import { verify } from 'jsonwebtoken';
import users from 'data/users.json';

// constant
const JWT_SECRET = JWT_API.secret;

export default async function handler(req, res) {
  await cors(req, res, NO_AUTHENTICATION_REQUIRED);
  
  let isMicroservicesRequest = false;
  let accessToken;
  
  // Check if this is a microservices request (has operation field)
  if (req.body?.operation && req.body?.metadata) {
    isMicroservicesRequest = true;
    // For microservices requests, get token from Authorization header
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: 'Token Missing',
        data: null
      });
    }
    accessToken = `${authorization}`.split(' ')[1];
    console.log('👤 [MOCKAPI] Microservices user info request:', {
      operation: req.body.operation,
      correlationId: req.body.metadata?.correlationId
    });
  } else {
    // Legacy format - get token from Authorization header
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token Missing' });
    }
    accessToken = `${authorization}`.split(' ')[1];
  }
  
  const data = verify(accessToken, JWT_SECRET);
  const userId = typeof data === 'object' ? data?.userId : '';
  const user = users.find((_user) => _user.id === userId);

  if (!user) {
    const errorMessage = 'Invalid Token';
    if (isMicroservicesRequest) {
      return res.status(401).json({
        success: false,
        message: errorMessage,
        data: null
      });
    }
    return res.status(401).json({ message: errorMessage });
  }
  
  const userData = {
    id: user.id,
    email: user.email,
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
    console.log('✅ [MOCKAPI] Microservices user info successful:', {
      correlationId: req.body.metadata?.correlationId,
      userId: user.id,
      email: user.email
    });
    return res.status(200).json({
      success: true,
      message: "User info retrieved successfully",
      data: {
        user: userData
      }
    });
  }
  
  // Legacy format for backward compatibility
  return res.status(200).json({
    user: userData
  });
}
