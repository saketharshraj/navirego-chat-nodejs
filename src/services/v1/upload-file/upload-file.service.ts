// Initializes the `v1/upload-file` service on path `/v1/upload-file`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { UploadFile } from './upload-file.class'; // Renamed class to UploadFile
import hooks from './upload-file.hooks'; // Updated hooks file name
import multer from 'multer';
import UploadToS3 from '../../../utils/uploadToS3';

// Add this service to the service type index
declare module '../../../declarations' {
    interface ServiceTypes {
        'v1/upload-file': UploadFile & ServiceAddons<any>; // Renamed service
    }
}

interface UploadResult {
  result: boolean;
  path: string[]; 
}

export default function (app: Application): void {
    const options = {
        paginate: app.get('paginate'),
    };
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });

    // Initialize our service with any options it requires
    app.use(
        '/v1/upload-file', 
        upload.any(),
        async function (req: any, res: any, next: any) {
            if (!req.files || req.files.length === 0) {
                req.body = {
                    result: false,
                    message: 'Please upload a file',
                };
                next();
            } else {
                const bucket = app.get('aws-bucket');

                const s3 = app.get('s3');
                const result: UploadResult = {
                    result: true,
                    path: [],
                };

                for (const file of req.files) {
                    const fileType = file.mimetype;
                    const timestamp = Date.now();
                    const fileName = file.originalname;
                    const folderName = `file_${fileName.substring(0, fileName.lastIndexOf('.'))}_${timestamp}`;

                    const fileKey = `files/${folderName}/${timestamp}_${fileName}`;
                    const fileData = await UploadToS3(fileKey, file.buffer, fileType, s3, bucket);
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
        },
        new UploadFile(options, app),
    );

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/upload-file');

    service.hooks(hooks);
}
