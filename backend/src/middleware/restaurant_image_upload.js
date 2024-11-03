const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadPath = () => {
  const UPLOADS_FOLDER = './public/uploads/restaurants';

  // if not exists to `upload` folder to create
  if (!fs.existsSync('./public/uploads')) {
    fs.mkdirSync('./public/uploads', { recursive: true });
  }

  // if not exists to `rooms` folder to create
  if (!fs.existsSync(UPLOADS_FOLDER)) {
    fs.mkdirSync(UPLOADS_FOLDER, { recursive: true });
  }

  return UPLOADS_FOLDER;
};

// define the storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadPath());
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName = `${file.originalname.replace(fileExt, '').toLowerCase().split(' ').join('-')}-${Date.now()}`;

    cb(null, fileName + fileExt);
  }
});

// prepare the final multer upload object
const restaurantsImageUpload = multer({
  storage,
  limits: {
    fileSize: 1000000 
  },
  fileFilter: (_req, files, cb) => {
    if (files.fieldname === 'images') {
      if (files.mimetype === 'image/png' || files.mimetype === 'image/jpg' || files.mimetype === 'image/jpeg') {
        cb(null, true);
      } else {
        cb(new Error('Only .jpg, .png or .jpeg format allowed!'));
      }
    } else {
      cb(new Error('There was an unknown error!'));
    }
  }
});

module.exports =restaurantsImageUpload;