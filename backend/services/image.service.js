const multer = require("multer");

const imageFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, false);
    } else {
        cb(new Error('Only .jpeg or .png or .jpg files are accepted'), true);
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/public/img/');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;
