const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');


const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'trello',
  allowedFormats: ['JPG','jpg', 'png'],
  filename: function (req, file, next) {
    next(null, `${Date.now()}${file.originalname}`);
  }
});

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET
});

module.exports = multer({ storage });
