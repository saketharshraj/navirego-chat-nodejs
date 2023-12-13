// Initializes the `v1/upload` service on path `/v1/upload`
import { Upload } from './upload.class';
import hooks from './upload.hooks';
import multer from 'multer';
import { Application } from '@feathersjs/feathers';
import fs from 'fs';
import moment from 'moment';

export default function (app: Application) {
    const options = {
        paginate: app.get('paginate'),
    };
    const checkAndCreateDirectory = (path: any, success: any) => {
        fs.stat(path, (error) => {
            if (error)
                fs.mkdir(path, () => {
                    success();
                });
            else success();
        });
    };
    const storage = multer.diskStorage({
        destination: (_req: any, _file: any, cb: any) => {
            const folder1 = moment(new Date()).format('YYYY'); //'2021'
            const folder2 = moment(new Date()).format('MMDD'); //'1129'
            let path = `public/uploads/${folder1}`;
            checkAndCreateDirectory(path, () => {
                path = `${path}/${folder2}`;
                checkAndCreateDirectory(path, () => {
                    cb(null, path);
                });
            });
        },
        filename: (_req: any, file: any, cb: any) => cb(null, Date.now() + file.originalname),
    });
    const upload = multer({ storage: storage }).any();
    // Initialize our service with any options it requires
    app.use(
        '/v1/upload',
        function (req: any, res: any, next: any) {
            upload(req, res, function (err: any) {
                if (err instanceof multer.MulterError) {
                    req.body = {
                        result: false,
                        message: err.toString(),
                    };
                } else if (err) {
                    req.body = {
                        result: false,
                        message: err.toString(),
                    };
                } else {
                    if (req.files && req.files.length > 0) {
                        const files = req.files.map(
                            (each: any) =>
                                (each.path = `http://${req.feathers.headers.host}/${each.path.replace(
                                    'public/uploads',
                                    'uploads',
                                )}`),
                        );
                        req.body = {
                            result: true,
                        };
                        if (files.length === 1) req.body.path = files[0];
                        else req.body.path = files;
                    } else {
                        req.body = {
                            result: false,
                            message: 'Please Upload Some Files',
                        };
                    }
                }
                next();
            });
        },
        new Upload(options),
    );

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/upload');

    service.hooks(hooks);
}
