const extract = require("pdf-parse");
const fs = require("fs");
const GSON = require("gson");
const axios = require("axios");
const admin = require("firebase-admin");
const Enum = require("enum");

let bucket = admin.storage().bucket();

let updateOptions = new Enum({
    'deleteUpdate': 1,
    'addUpdate': 2,
})


saveContent = async (destinationPath, contentType, file) => {
    return await bucket.upload(file.filepath, {
        destination: destinationPath,
        metadata: {
            contentType: contentType,
        }
    });

}
const deleteContent = async (filePath) => {
    return await bucket.deleteFiles({prefix: filePath, force: true});
}
const updateContent = async (destinationPath, contentType, file, updateOptions) => {
    console.log(updateOptions)
    switch (updateOptions.key) {
        case 'deleteUpdate': {
            deleteContent(destinationPath).then(() => {
                return saveContent(destinationPath, contentType, file);
            })


        }
            break;

        case 'addUpdate': {
            return saveContent(destinationPath, contentType, file);
        }

    }
}

module.exports = {saveContent, deleteContent, updateContent, updateOptions};
