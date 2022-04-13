

const singlePublicFileUpload = async (file) => {
    const { originalname, mimetype, buffer } = await file;
    const path = require("path");
    // name of the file in your S3 bucket will be the date in ms plus the extension name
    const Key = new Date().getTime().toString() + path.extname(originalname);
    const uploadParams = {
        Bucket: NAME_OF_BUCKET,
        Key,
        Body: buffer,
        ACL: "public-read",
    };
    const result = await s3.upload(uploadParams).promise();

    // return is the image url
    return result.Location;
};

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, "");
    },
});


const singleMulterUpload = (nameOfKey) =>
    multer({ storage: storage }).single(nameOfKey);