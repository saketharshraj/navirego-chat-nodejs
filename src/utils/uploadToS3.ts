/**
 * @description upload files to aws bucket.
 * @param key
 * @param fileBuffer
 * @param fileType
 * @param s3
 * @param bucket
 */
const uploadToS3 = async (
    key: string,
    fileBuffer: any,
    fileType: string,
    s3: any,
    bucket: string,
) => {
    /**
     * Specify parameters to upload file to the bucket
     * @type {{ContentType: *, Bucket: string, Body: *, Key: string}}
     */

    const uploadParams = {
        Bucket: bucket,
        Key: key,
        Body: fileBuffer,
        ContentType: fileType,
        ACL: 'public-read',
    };

    /**
     * Upload the file to s3 bucket
     * @type {ManagedUpload.SendData}
     */
    return await s3
        .upload(uploadParams)
        .promise()
        // eslint-disable-next-line no-unused-vars
        .catch((e: Error) => {
            console.error(e);
            return null;
        });
};

export default uploadToS3;
