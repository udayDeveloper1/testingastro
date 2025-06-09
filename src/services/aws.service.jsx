// import AWS from 'aws-sdk'
// import { Constatnt } from '../utils/Constent'

// AWS.config.update({
//   accessKeyId: Constatnt?.AWS_ACCESS_KEY_ID,
//   secretAccessKey: Constatnt?.AWS_SECRET_ACCESS_KEY,
//   region: Constatnt?.AWS_S3_REGION_NAME,
//   endpoint: `https://s3.${Constatnt?.AWS_S3_REGION_NAME}.amazonaws.com`
// });

// const s3 = new AWS.S3();

// export const uploadImageToS3 = async (file, folder) => {

//   if (!file) {
//     throw new Error("No file provided for upload.");
//   }
//   try {
//     console.log(  Constatnt?.AWS_ACCESS_KEY_ID,
//       Constatnt?.AWS_SECRET_ACCESS_KEY,
//       Constatnt?.AWS_S3_REGION_NAME,
//       `https://s3.${Constatnt?.AWS_S3_REGION_NAME}.amazonaws.com`);
//     // const extension = file.type?.split("/")[1] || "jpg";
//     // const fileName = `${new Date().getTime()}.${extension}`;
//     // const key = `chatmyastrologer/${folder}/${fileName}`;

//   const extension = file.type?.split("/")[1] || "jpg";
//   const fileName = `${new Date().getTime()}.${extension}`;
//   const key = `chatmyastrologer/${folder}/${fileName}`;

//   const params = {
//     Bucket: Constatnt?.AWS_STORAGE_BUCKET_NAME,
//     Key: key,
//     Body: file,
//     // ContentType: file.type,
//   };
//     await s3.upload(params).promise();
//     // Manually construct URL with region, even if it's 'us-east-1'
//     const uploadedUrl = `https://${Constatnt.AWS_STORAGE_BUCKET_NAME}.s3.${Constatnt.AWS_S3_REGION_NAME}.amazonaws.com/${key}`;

//     return uploadedUrl;
//   } catch (err) {
//     console.error("Upload Error:", err);
//     throw err;
//   }
// };

// export const uploadImageToS3 = async (file, folder) => {
//   if (!file) {
//     throw new Error("No file provided for upload.");
//   }
//   try {
//     console.log(  Constatnt?.AWS_ACCESS_KEY_ID,
//       Constatnt?.AWS_SECRET_ACCESS_KEY,
//       Constatnt?.AWS_S3_REGION_NAME,
//       `https://s3.${Constatnt?.AWS_S3_REGION_NAME}.amazonaws.com`);
//     // const extension = file.type?.split("/")[1] || "jpg";
//     // const fileName = `${new Date().getTime()}.${extension}`;
//     // const key = `chatmyastrologer/${folder}/${fileName}`;

//   const extension = file.type?.split("/")[1] || "jpg";
//   const fileName = `${new Date().getTime()}.${extension}`;
//   const key = `chatmyastrologer/${folder}/${fileName}`;

//   const params = {
//     Bucket: Constatnt?.AWS_STORAGE_BUCKET_NAME,
//     Key: key,
//     Body: file,
//     // ContentType: file.type,
//   };
//     await s3.upload(params).promise();
//     // Manually construct URL with region, even if it's 'us-east-1'
//     const uploadedUrl = `https://${Constatnt.AWS_STORAGE_BUCKET_NAME}.s3.${Constatnt.AWS_S3_REGION_NAME}.amazonaws.com/${key}`;
//     return uploadedUrl;
//   } catch (err) {
//     console.error("Upload Error:", err);
//     throw err;
//   }
// };
