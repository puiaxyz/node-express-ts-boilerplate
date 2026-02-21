import express from 'express';

const router = express.Router();

router.get('/', (req, res, _next) => {
  res.render('index', { title: 'Express' });
});

export default router;
