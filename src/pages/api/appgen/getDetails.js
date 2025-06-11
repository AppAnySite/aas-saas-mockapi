import cors from 'utils/cors';
import { NO_AUTHENTICATION_REQUIRED } from 'config';
import { messages } from 'utils';
import apps from 'data/apps.json';

export default async function handler(req, res) {
  await cors(req, res, NO_AUTHENTICATION_REQUIRED);

  // Validate apps data loaded
  if (!apps.length) {
    return res.status(500).json({
      code: 500,
      message: 'No app data available',
      data: null
    });
  }

  // Pick one random app
  const randomIndex = Math.floor(Math.random() * apps.length);
  const randomApp = apps[randomIndex];

  // Professional response shape
  return res.status(200).json({
    code: 200,
    message: 'OK',
    data: randomApp
  });
}

// import path from 'path';
// import cors from 'utils/cors';
// import { NO_AUTHENTICATION_REQUIRED } from 'config';
// import { messages } from 'utils';
// import fs from 'fs';

// // Load apps.json once — safe to cache in memory for mock API
// const appsFilePath = path.resolve(process.cwd(), 'data', 'apps.json');
// let apps = [];

// // Load apps file — sync at load time is fine for mock API
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
//       data: null
//     });
//   }

//   // Pick one random app
//   const randomIndex = Math.floor(Math.random() * apps.length);
//   const randomApp = apps[randomIndex];

//   // Professional response shape
//   return res.status(200).json({
//     code: 200,
//     message: 'OK',
//     data: randomApp
//   });
// }
