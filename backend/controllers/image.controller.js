const fs = require("fs");
const db = require("../helpers/db");
const Image = db.image;

const uploadFiles = async (req, res) => {
    try {
        console.log(req.file);

        Image.create({
            type: req.file.mimetype,
            name: req.file.originalname,
            data: fs.readFileSync(
                __basedir + "/public/img/" + req.file.filename
            ),
        }).then((image) => {
            fs.writeFileSync(
                __basedir + "/public/img/" + image.name,
                image.data
            );

            return res.send(`File has been uploaded.`);
        });
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload images: ${error}`);
    }
};

module.exports = {
    uploadFiles,
};
