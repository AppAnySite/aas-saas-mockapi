import pkg from '../../../package.json';

const isReady = true; // Replace with your readiness logic
export default function handler(req, res) {
  res.status(isReady ? 200 : 503).json({
    status: isReady ? 'Ready' : 'Not Ready',
    service: pkg.name,
    timestamp: new Date().toISOString()
  });
}
