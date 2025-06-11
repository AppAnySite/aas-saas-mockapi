import cors from 'utils/cors';
import { NO_AUTHENTICATION_REQUIRED } from 'config';
import apps from 'data/apps.json';

export default async function handler(req, res) {
  await cors(req, res, NO_AUTHENTICATION_REQUIRED);

  if (!apps.length) {
    return res.status(500).json({
      code: 500,
      message: 'No app data available',
      data: []
    });
  }

  return res.status(200).json({
    code: 200,
    message: 'OK',
    data: apps
  });
}

// import path from 'path';
// import cors from 'utils/cors';
// import { NO_AUTHENTICATION_REQUIRED } from 'config';
// import fs from 'fs';

// const appsFilePath = path.resolve(process.cwd(), 'data', 'apps.json');
// let apps = [];

// // Load apps.json once
// try {
//   const fileContent = fs.readFileSync(appsFilePath, 'utf8');
//   apps = JSON.parse(fileContent);
// } catch (err) {
//   console.error(`Failed to load apps.json: ${err.message}`);
// }

// export default async function handler(req, res) {
//   await cors(req, res, NO_AUTHENTICATION_REQUIRED);

//   // Validate apps data loaded
//   if (!apps.length) {
//     return res.status(500).json({
//       code: 500,
//       message: 'No app data available',
//       data: []
//     });
//   }

//   // Return full apps list
//   return res.status(200).json({
//     code: 200,
//     message: 'OK',
//     data: apps
//   });
// }
