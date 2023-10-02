const path = require("path");
const fs = require("fs");
const crypto = require('crypto');
const axios = require('axios');

function generateRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  }
  
  function generateUniqueImageName() {
    const timestamp = new Date().getTime().toString();
    const randomString = generateRandomString(8); 
    const uniqueName = `${timestamp}_${randomString}`;
    return uniqueName;
  }
  


const uploadImage = async(file) => {
    const fileName = file.name;

    const allowedFileds = ["jpg", "png", "jpeg"]
    const fileExtension = fileName.split(".").pop();

    if (!allowedFileds.includes(fileExtension)) {
        return { error: "this file format not supported" }
    }

    const newFileName = generateUniqueImageName() + "." + fileExtension;
    var results = { fileName: newFileName }

    await file.mv(path.resolve("./public/images/" + newFileName), (e) => {
        if (e) {
            results.error = "Something went wrong. Unable to uplaod image."
        }
    });

    return results;

}


const uploadImageFromUrl = async (imageUrl) => {
    try {
      const response = await axios.get(imageUrl, {
        responseType: 'stream',
      });
  
      if (response.status === 200) {
        const fileExtension = path.extname(imageUrl);
        const newFileName = generateUniqueImageName() + '.jpg';
        const filePath = path.resolve('./public/images/' + newFileName);
  
        const writer = fs.createWriteStream(filePath);
  
        response.data.pipe(writer);
  
        await new Promise((resolve, reject) => {
          writer.on('finish', resolve);
          writer.on('error', reject);
        });
  
        return newFileName;
      } else {
        return { error: 'Failed to download the image from the URL' };
      }
    } catch (error) {
      return { error: 'An error occurred while downloading the image: ' + error.message };
    }
  };

const removeImage = async (file) => {
    if (file === "no-image.jpg") {
        return ""
    }


    var results = "File remove success"

    await fs.unlink(("./public/images/" + file), (e) => {
        if (e) {
            results = "Something went wrong. Unable to uplaod image."
        }
    });

    return results;


};

module.exports = { uploadImage, removeImage, uploadImageFromUrl };
