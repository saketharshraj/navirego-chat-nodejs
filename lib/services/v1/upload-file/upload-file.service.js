"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const upload_file_class_1 = require("./upload-file.class"); // Renamed class to UploadFile
const upload_file_hooks_1 = __importDefault(require("./upload-file.hooks")); // Updated hooks file name
const multer_1 = __importDefault(require("multer"));
const uploadToS3_1 = __importDefault(require("../../../utils/uploadToS3"));
function default_1(app) {
    const options = {
        paginate: app.get('paginate'),
    };
    const storage = multer_1.default.memoryStorage();
    const upload = (0, multer_1.default)({ storage: storage });
    // Initialize our service with any options it requires
    app.use('/v1/upload-file', upload.any(), async function (req, res, next) {
        if (!req.files || req.files.length === 0) {
            req.body = {
                result: false,
                message: 'Please upload a file',
            };
            next();
        }
        else {
            const bucket = app.get('aws-bucket');
            const s3 = app.get('s3');
            const result = {
                result: true,
                path: [],
            };
            for (const file of req.files) {
                const fileType = file.mimetype;
                const timestamp = Date.now();
                const fileName = file.originalname;
                const folderName = `file_${fileName.substring(0, fileName.lastIndexOf('.'))}_${timestamp}`;
                const fileKey = `files/${folderName}/${timestamp}_${fileName}`;
                const fileData = await (0, uploadToS3_1.default)(fileKey, file.buffer, fileType, s3, bucket);
                if (!fileData) {
                    req.body = {
                        result: false,
                        message: 'S3 Bucket upload Error.',
                    };
                    next();
                }
                const filePath = fileData.Location;
                result.path.push(filePath);
            }
            req.body = result;
            next();
        }
    }, new upload_file_class_1.UploadFile(options, app));
    // Get our initialized service so that we can register hooks
    const service = app.service('v1/upload-file');
    service.hooks(upload_file_hooks_1.default);
}
exports.default = default_1;
