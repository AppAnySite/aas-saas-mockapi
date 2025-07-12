import cors from 'utils/cors';
import { NO_AUTHENTICATION_REQUIRED } from 'config';
import builds from 'data/builds.json';

export default async function handler(req, res) {
  await cors(req, res, NO_AUTHENTICATION_REQUIRED);

  if (!builds.length) {
    return res.status(500).json({
      code: 500,
      message: 'No build data available',
      data: []
    });
  }

  return res.status(200).json({
    code: 200,
    message: 'OK',
    data: builds
  });
}