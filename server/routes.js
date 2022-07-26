const express = require('express');
const router = express.Router();
const Message = require('./model/Message');
const { connection } = require('mongoose');

router.get('/', async (req, res) => {
  await connection.collection('messages').find().sort({ $natural: -1 }).limit(25).toArray((err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: err })
    }
    return res.status(200).json(results);
  })
});

router.post('/save', async (req, res) => {
  const payload = new Message(req.body);
  payload.createdAt = Date.now();
  await connection.collection('messages').insertOne(payload, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, message: err })
    }
    return res.status(200).json({ success: true, message: 'Messsage successfully saved' })
  })
})

module.exports = router;
