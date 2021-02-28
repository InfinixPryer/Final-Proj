const BoxSDK = require('box-node-sdk');

const sdk = new BoxSDK({
  clientID: process.env.BOX_CLIENT_ID,
  clientSecret: process.env.BOX_CLIENT_SECRET
});

const client = sdk.getBasicClient(process.env.BOX_DEVELOPER_TOKEN);

const getFile = (path, params) => {
    // return new Promise((resolve, reject) => {
    //     client.get(path, params, (err, response) => {
    //         if (err) {
    //             reject(err);
    //         }
    //         resolve(response);
    //     });
    // });

    return new Promise((resolve, reject) => {
        
    })
}



const postFile = (filename, stream) => {
    return client.files.uploadFile(process.env.BOX_FOLDER_ID, filename, stream);
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