const { Router } = require('express');

const router = Router();

router.get('/', (_req, res) => {
  res.json({ service: '${{ values.name }}', version: '1.0.0' });
});

router.get('/items', (_req, res) => {
  res.json([]);
});

router.post('/items', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: { message: 'name is required' } });
  }
  res.status(201).json({ id: crypto.randomUUID(), name });
});

module.exports = router;
