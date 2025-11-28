import { v2 as cloudinary } from 'cloudinary';
const cloudName = process.env.CLOUD_NAME;
const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET

exports.connectCloudinary = () => {

    try {
        cloudinary.config({
            cloud_name: cloudName,
            api_key: apiKey,
            api_secret: apiSecret
        })
        console.log("Connection bn gya cloudinary se")
    } catch (error) {
        console.log('error aa gya')
    }

}
/////////////////////////
// Uploads an image file
/////////////////////////
exports.uploadImage = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };

    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath, options);
        // console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
};