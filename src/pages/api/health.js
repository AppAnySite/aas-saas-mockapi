import pkg from '../../../package.json';

export default function handler(req, res) {
  res.status(200).json({
    status: 'Healthy',
    service: pkg.name,
    timestamp: new Date().toISOString()
  });
}
