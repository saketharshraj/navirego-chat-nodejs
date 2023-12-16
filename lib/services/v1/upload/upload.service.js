"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Initializes the `v1/upload` service on path `/v1/upload`
const upload_class_1 = require("./upload.class");
const upload_hooks_1 = __importDefault(require("./upload.hooks"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const moment_1 = __importDefault(require("moment"));
function default_1(app) {
    const options = {
        paginate: app.get('paginate'),
    };
    const checkAndCreateDirectory = (path, success) => {
        fs_1.default.stat(path, (error) => {
            if (error)
                fs_1.default.mkdir(path, () => {
                    success();
                });
            else
                success();
        });
    };
    const storage = multer_1.default.diskStorage({
        destination: (_req, _file, cb) => {
            const folder1 = (0, moment_1.default)(new Date()).format('YYYY'); //'2021'
            const folder2 = (0, moment_1.default)(new Date()).format('MMDD'); //'1129'
            let path = `public/uploads/${folder1}`;
            checkAndCreateDirectory(path, () => {
                path = `${path}/${folder2}`;
                checkAndCreateDirectory(path, () => {
                    cb(null, path);
                });
            });
        },
        filename: (_req, file, cb) => cb(null, Date.now() + file.originalname),
    });
    const upload = (0, multer_1.default)({ storage: storage }).any();
    // Initialize our service with any options it requires
    app.use('/v1/upload', function (req, res, next) {
        upload(req, res, function (err) {
            if (err instanceof multer_1.default.MulterError) {
                req.body = {
                    result: false,
                    message: err.toString(),
                };
            }
            else if (err) {
                req.body = {
                    result: false,
                    message: err.toString(),
                };
            }
            else {
                if (req.files && req.files.length > 0) {
                    const files = req.files.map((each) => (each.path = `http://${req.feathers.headers.host}/${each.path.replace('public/uploads', 'uploads')}`));
                    req.body = {
                        result: true,
                    };
                    if (files.length === 1)
                        req.body.path = files[0];
                    else
                        req.body.path = files;
                }
                else {
                    req.body = {
                        result: false,
                        message: 'Please Upload Some Files',
                    };
                }
            }
            next();
        });
    }, new upload_class_1.Upload(options));
    // Get our initialized service so that we can register hooks
    const service = app.service('v1/upload');
    service.hooks(upload_hooks_1.default);
}
exports.default = default_1;
