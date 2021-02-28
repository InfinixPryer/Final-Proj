const BoxSDK = require('box-node-sdk');

const sdk = new BoxSDK({
  clientID: process.env.BOX_CLIENT_ID,
  clientSecret: process.env.BOX_CLIENT_SECRET
});

const client = sdk.getBasicClient(process.env.BOX_DEVELOPER_TOKEN);


const getFile = (path, params) => {
    return new Promise((resolve, reject) => {
        client.files.getRepresentationContent(path, "[jpg?dimensions=1024x1024]", params, (err, stream) => {
            if (err) {
                reject(err);
            }
            // const chunks = [];
            // stream.on('data', (chunk) => chunks.push(chunk));
            // stream.on('error', (err) => reject(err));
            // stream.on('end', () => resolve(Buffer.concat(chunks)));
            resolve(stream);
        });
    });
    // return client.files.getThumbnail(path)
    //             .then(thumbnailInfo => {
    //                return thumbnailInfo.file;
    //             })
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