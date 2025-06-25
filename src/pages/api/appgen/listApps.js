import cors from 'utils/cors';
import { NO_AUTHENTICATION_REQUIRED } from 'config';
import apps from 'data/apps.json';

// Helper: pick N random items from an array
function getRandomItems(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Helper: random integer between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default async function handler(req, res) {
  await cors(req, res, NO_AUTHENTICATION_REQUIRED);

  if (!apps.length) {
    return res.status(500).json({
      code: 500,
      message: 'No app data available',
      data: []
    });
  }

  const maxCount = Math.min(4, apps.length);
  const randomCount = getRandomInt(1, maxCount);
  const randomApps = getRandomItems(apps, randomCount);

  return res.status(200).json({
    code: 200,
    message: 'OK',
    data: randomApps
  });
}

// import path from 'path';
// import cors from 'utils/cors';
// import { NO_AUTHENTICATION_REQUIRED } from 'config';
// import fs from 'fs';

// // Helper: pick N random items from an array
// function getRandomItems(array, count) {
//   const shuffled = [...array].sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, count);
// }

// // Helper: random integer between min and max (inclusive)
// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

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

//   // Decide random number between 1 and 4
//   const maxCount = Math.min(4, apps.length);
//   const randomCount = getRandomInt(1, maxCount);

//   // Pick randomCount random apps
//   const randomApps = getRandomItems(apps, randomCount);

//   // Return result
//   return res.status(200).json({
//     code: 200,
//     message: 'OK',
//     data: randomApps
//   });
// }
