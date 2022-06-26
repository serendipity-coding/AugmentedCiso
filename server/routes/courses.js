import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  console.log(1);
  res.send('Hello from express');
});

export default router;
