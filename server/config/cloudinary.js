const cloudinary = require("cloudinary").v2;

cloudinary.config({ 
    cloud_name: 'dcrwhj71h', 
    api_key: '692415228375347', 
    api_secret: 'mGcMbzwY5zCiXdCL-tFLLphzPOk' 
  });

  module.exports = cloudinary;