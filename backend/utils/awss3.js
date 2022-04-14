const multer = require('multer');
const path = require("path");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });


const singlePublicFileUpload = async (file) => {
    const { originalname, mimetype, buffer } = await file;
    // name of the file in your S3 bucket will be the date in ms plus the extension name
    const Key = new Date().getTime().toString() + path.extname(originalname);
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
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


module.exports = {
    singlePublicFileUpload,
    singleMulterUpload
};