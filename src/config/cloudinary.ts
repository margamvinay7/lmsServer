import { v2 as cloudinary } from 'cloudinary';
import crypto from 'crypto';

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Generate a signature for Cloudinary upload
const generateSignature = (folder: string, publicId: string, timestamp: number) => {
  const signature = cloudinary.utils.api_sign_request(
    {
      folder,
      public_id: publicId,
      timestamp,
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    },
    process.env.CLOUDINARY_API_SECRET!
  );
  return signature;
};

// Generate a signed upload URL for Cloudinary
export const generateSignedUploadUrl = (folder: 'posters' | 'videos', publicId: string) => {
  const timestamp = Math.round(Date.now() / 1000);
  const signature = generateSignature(folder, publicId, timestamp);
  
  return {
    url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/${folder === 'videos' ? 'video' : 'image'}/upload`,
    timestamp,
    signature,
    api_key: process.env.CLOUDINARY_API_KEY,
    folder,
    public_id: publicId,
    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
  };
};

// Verify the Cloudinary webhook signature
export const verifyWebhookSignature = (signature: string, body: string, timestamp: string) => {
  const signatureString = `timestamp=${timestamp}${body}`;
  const expectedSignature = crypto
    .createHash('sha256')
    .update(signatureString + process.env.CLOUDINARY_API_SECRET)
    .digest('hex');

  return signature === expectedSignature;
};

export default cloudinary;
