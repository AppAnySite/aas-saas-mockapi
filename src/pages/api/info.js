import pkg from '../../../package.json';

export default function handler(req, res) {
  res.status(200).json({
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    homepage: pkg.homepage,
    Repository: pkg.repository,
    Bugs: pkg.bugs,
    Engine: pkg.engines,
    timestamp: new Date().toISOString()
  });
}
