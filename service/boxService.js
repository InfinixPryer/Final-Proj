const BoxSDK = require('box-node-sdk');
const config = {
    boxAppSettings: {
        clientID: process.env.BOX_CLIENT_ID,
        clientSecret: process.env.BOX_CLIENT_SECRET,
        appAuth: {
          publicKeyID: process.env.BOX_PUBLIC_KEY_ID,
          privateKey: process.env.BOX_PRIVATE_KEY.replace(/\\n/g, '\n'), 
          passphrase: process.env.BOX_PASSPHRASE,
        }
      },
    enterpriseID: process.env.BOX_ENTERPRISE_ID
}

const sdk = BoxSDK.getPreconfiguredInstance(config);
const client = sdk.getAppAuthClient("enterprise");
client.asUser();
// const client = sdk.getBasicClient("CvPg2dz1iYAdTxBfBUivZMx7Q5yhvFqV");

const getFile = (path, params) => {
    return new Promise((resolve, reject) => {
        client.files.getRepresentationContent(path, "[jpg?dimensions=1024x1024]", params, (err, stream) => {
            if (err) {
                reject(err);
            }
            resolve(stream);
        });
    });
}


const postFile = (filename, stream) => {
    return client.files.uploadFile(process.env.BOX_FOLDER_ID, filename, stream)
                        .then(res => res.entries[0].id);
}

const deleteFile = (path, params) => {
    return new Promise((resolve, reject) => {
        client.del(path, params, (err, response) => {
            if (err) {
                reject(err);
            }
            resolve(response);
        });
    });
}
module.exports = {
    getFile,
    postFile,
    deleteFile
};