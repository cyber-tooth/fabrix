const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb('Only .jpeg or .png or .jpg files are accepted', false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

const uploadFiles = upload.any();

const uploadImages = (req, res, next) => {
    uploadFiles(req, res, err => {
        if (err instanceof multer.MulterError) {
            if (err.code === "LIMIT_UNEXPECTED_FILE") {
                return res.send("Too many files to upload.");
            }
        } else if (err) {
            return res.send(err);
        }

        next();
    });
};

const resizeImages = async (req, res, next) => {
    if (!req.files) return next();

    req.body.images = [];
    await Promise.all(
        req.files.map(async file => {
            const filename = file.fieldname;
            const newFilename = `${filename}.jpeg`;

            await sharp(file.buffer)
                .resize(640, 320)
                .toFormat("jpeg")
                .jpeg({ quality: 90 })
                .toFile(`public/img/${newFilename}`);

            req.body.images.push(newFilename);
        })
    );

    next();
};

const getResult = async (req, res) => {

    const images = req.body.images
        .map(image => "" + image + "")
        .join("");

    return res.send(`Images were uploaded:${images}`);
};

module.exports = {
    uploadImages: uploadImages,
    resizeImages: resizeImages,
    getResult: getResult
};
