import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "doow2zx7f",
  api_key: "952895577516329",
  api_secret: "ur-0lMu9_pPt9O2V778eDQ3LN7s",
});
  
export default cloudinary;

// upload image

// export const uploadImage = async (imagePath ,uploadPath,req,next) => {

//     // Use the uploaded file's name as the asset's public ID and
//     // allow overwriting the asset with new versions
//     const options = {
//       use_filename: true,
//       unique_filename: false,
//       overwrite: true,
// 	  folder:uploadPath
//     };

//     try {
//       // Upload the image
//       const result = await cloudinary.uploader.upload(imagePath, options);
//       console.log(result);
//       return {public_id , secure_url};
//     } catch (error) {
//       req.error = error
// 	  return next(req.error)
//     }
// };
