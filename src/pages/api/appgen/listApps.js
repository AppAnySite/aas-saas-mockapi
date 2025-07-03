import cors from 'utils/cors';
import { NO_AUTHENTICATION_REQUIRED } from 'config';
import apps from 'data/apps.json';

export default async function handler(req, res) {
  try {
    await cors(req, res, NO_AUTHENTICATION_REQUIRED);

    const { ownerId } = req.query;

    if (!ownerId) {
      return res.status(400).json({
        code: 400,
        message: 'Missing ownerId in query',
        data: []
      });
    }

    const filteredApps = apps.filter(app => app.ownerId === ownerId);

    if (!filteredApps.length) {
      return res.status(404).json({
        code: 404,
        message: `No apps found for ownerId: ${ownerId}`,
        data: []
      });
    }

    return res.status(200).json({
      code: 200,
      message: 'OK',
      data: filteredApps
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error',
      error: error.message,
      data: []
    });
  }
}

