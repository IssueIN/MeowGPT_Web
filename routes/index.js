const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')

const filePath = './public/data/output.txt'; // Replace with your file path

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/data/');  
  },
  filename: function (req, file, cb) {
    cb(null, 'meow.wav');  // Set the file name to be saved
  }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  let emotion;
  if (fs.existsSync(filePath)) {
      emotion = fs.readFileSync(filePath, 'utf8');
  } else {
      emotion = null;
  }
  res.render('index', { emotion: emotion });
});

router.post('/upload', upload.single('fileField'), (req, res) => {
  if (!req.file) {
      return res.status(400).send('No file uploaded');
  } else {
    let emotion;
    if (fs.existsSync(filePath)) {
        emotion = fs.readFileSync(filePath, 'utf8');
    } else {
        emotion = null;
    }
    res.render('index', {
      emotion: emotion
    });
  }
});


module.exports = router