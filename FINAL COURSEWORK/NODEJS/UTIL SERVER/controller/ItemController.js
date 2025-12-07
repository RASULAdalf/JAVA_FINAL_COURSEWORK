const ItemModel = require('../model/ItemModel');
const fs = require('fs');
const formidable = require("formidable");
const extract = require('pdf-parse');
const GSON = require('gson');
const axios = require('axios');
const admin = require('firebase-admin');
const crudUtil = require('../util/CrudUtil');


const saveItem = (req, resp) => {
    let vEmail = "";
    let itemId = '';

    const itemModel = new ItemModel('', '', '', [], 0, 0, '', '', '');
    // const KEYPATH = './drive.json';
    // const SCOPES = ['https://www.googleapis.com/auth/drive'];
    // //fieldsInfo = fields;
    // const auth = new google.auth.GoogleAuth({
    //     keyFile: KEYPATH,
    //     scopes: SCOPES
    // });

    const bufferedEvents = [];
    const form = new formidable.IncomingForm();
    form.parse(req);

    let formFieldPromise = new Promise((resolve, reject) => {
        form.on('field', function (field, value) {
            // console.log("inside field");
            switch (field) {
                case 'itemDescription': {
                    itemModel.itemDescription = value;
                    break;
                }
                case 'itemCategory':
                    itemModel.itemCategory = value;
                    break;
                case 'unitPrice':
                    itemModel.unitPrice = value;
                    break;
                case 'qty': {
                    itemModel.qtyOnHand = value;
                    resolve();
                }
                    break;
                case 'vendorEmail': {
                    itemModel.vendorEmail = value;
                    vEmail = value;
                    break;
                }

                default:
                    break;
            }

        })
    })

    function handleBuffered() {
        for (const event of bufferedEvents) {
            let destinationPath = `${vEmail}/${itemId}/${event.field}/${event.file.originalFilename}`;
            console.log(destinationPath);
            saveUploadToFireStorage(destinationPath, event.file.mimetype, event.file, event.field, itemId, form, itemModel, resp).then(r => console.log());

        }
    }

    formFieldPromise.then(() => {
        axios.post('http://localhost:8080/api/v1/item', GSON.parse(GSON.stringify(itemModel)), {
            headers: {'token': 'snfjg85YY39475fhestdgff'}
        }).then(response => {
            itemId = response.data.data;
            console.log("handling buffered");
            handleBuffered();
        }, error => {
            console.log(error);
        })
    }, err => {

        resp.send({'message': err});
    })

    form.on('file', (field, file) => {

        bufferedEvents.push({type: "file", field, file});


        // if (itemIdSet) {
        //     let destinationPath = `${vEmail}/${itemId}/${field}/${file.originalFilename}`;
        //     console.log(destinationPath);
        //     uploadToFireStorage(destinationPath, file.mimetype, file, field, itemId).then(r => console.log());
        //
        // }


    })


    // form.on('file', (field, file) => {
    //     let promise = new Promise((resolve, reject) => {
    //         if (i===0) {
    //             axios.post('http://localhost:8080/api/v1/item', GSON.parse(GSON.stringify(itemModel)), {
    //                 headers: {'token': 'snfjg85YY39475fhestdgff'}
    //             }).then(res => {
    //                 itemId = res.data.data;
    //                 resolve();
    //                 let destinationPath = `${vEmail}/${itemId}/${field}/${file.originalFilename}`;
    //                 //uploadToFireStorage(destinationPath, file.mimetype, file, field,itemId).then(r => console.log());
    //
    //                 console.log("Axios post - "+i)
    //             }, err => {
    //                 reject();
    //                 resp.send({'message': err});
    //             })
    //         }
    //     })
    //
    //
    //
    //     //let contentType = file.mimetype
    //     //console.log(vEmail);
    //     // let _field = field;
    //     // // console.log("inside file");
    //     // if (_field === "slideShowImgs") {
    //     //     parents = 'slideShowImgs';
    //     // } else if (_field === "specsDoc") {
    //     //     parents = "1fYEjwOpbiS_sAH4dtafOM_NaLn4g4RyX";
    //     // } else if (_field === "showImg") {
    //     //     parents = "1moKJZqcotloZyTpjgZtBTPzuKuELkK_f";
    //     // }
    //     // // console.log("inside");
    //     // let fileMetaData = {
    //     //     'name': file.name,
    //     //     'parents': [parents]
    //     // }
    //     // const media = {
    //     //     mimeType: file.mimeType,
    //     //     body: fs.createReadStream(file.filepath)
    //     // };
    //     promise.then((res) => {
    //         if (i>1) {
    //             console.log("upload - "+i);
    //             let destinationPath = `${vEmail}/${itemId}/${field}/${file.originalFilename}`;
    //             //uploadToFireStorage(destinationPath, contentType, file, field, itemId).then(r => console.log());
    //
    //         }
    //     })
    //
    //
    //
    //
    // });


    /*form.on('end',()=>{

         while (specsDocUrl=== ''){}
         console.log('third')
         while (specsDocContent=== ''){}
         itemModel.slideShowImageUrls = slideShowImgUrls;
         itemModel.specsDocUrl= specsDocUrl;
         itemModel.specsDocContent = specsDocContent;
         resp.json(GSON.parse(GSON.stringify(itemModel)));

     })*/


    /*
        form.parse(req, function (err, fields, files) {
            const KEYPATH = './drive.json';
            const SCOPES = ['https://www.googleapis.com/auth/drive'];
            fieldsInfo = fields;
            const auth = new google.auth.GoogleAuth({
                keyFile: KEYPATH,
                scopes: SCOPES
            });
            return new Promise(function (resolve, reject) {
               for (let i = 0; i < form.openedFiles.length; i++) {
                   //console.log(files);
                   if (files.slideShowImgs.originalFilename === form.openedFiles[i].originalFilename) {

                       let fileMetaData = {
                           'name': form.openedFiles[i].originalFilename,
                           'parents': ['1cHET8_6ozSzScV4HkgOMa4ltLOzyTlVu']
                       }
                       const media = {
                           mimeType: form.openedFiles[i].mimeType,
                           body: fs.createReadStream(form.openedFiles[i].filepath)
                       };

                       uploadToDriveSlideShowImgs(auth).then(r => {
                           console.log(i + " " + r)


                       });
                       async function uploadToDriveSlideShowImgs(auth) {
                           const driveService = google.drive({version: 'v3', auth: auth});

                           let response = await driveService.files.create({
                               resource: fileMetaData,
                               media: media,
                               fields: 'webViewLink'
                           });
                           console.log('passed')
                           slideShowImgUrls.push(response.data.webViewLink.replace('view?usp=drivesdk','preview'));
                           if (i===(form.openedFiles.length-1)) {resolve(true);}
                           return "uploaded slideShowImgs";
                       }
                   }

                   if (files.specsDoc.originalFilename === form.openedFiles[i].originalFilename) {

                       let fileMetaData = {
                           'name': form.openedFiles[i].originalFilename,
                           'parents': ['1X0_SNx60tkCG2PfR6z5omFmw310AzkE2']
                       }
                       const media = {
                           mimeType: form.openedFiles[i].mimeType,
                           body: fs.createReadStream(form.openedFiles[i].filepath)
                       };

                       uploadToDriveSpecsDoc(auth).then(r => {
                           console.log(i + " " + r)


                              extract(fs.readFileSync(form.openedFiles[i].filepath)).then(function (data){
                                  specsDocContent = data.text;

                              });


                       });
                      async function uploadToDriveSpecsDoc(auth) {
                           const driveService = google.drive({version: 'v3', auth: auth});

                           let response = await driveService.files.create({
                               resource: fileMetaData,
                               media: media,
                               fields: 'webViewLink'
                           });
                           specsDocUrl = response.data.webViewLink;
                           if (i===(form.openedFiles.length-1)){resolve(true);}
                           return "uploaded SpecsDoc";
                          }
                   }

                    if (files.showImg.originalFilename === form.openedFiles[i].originalFilename) {

                       let fileMetaData = {
                           'name': form.openedFiles[i].originalFilename,
                           'parents': ['1-k1otsFRka3vCUicOVBXCopQzlwlVOG9']
                       }
                       const media = {
                           mimeType: form.openedFiles[i].mimeType,
                           body: fs.createReadStream(form.openedFiles[i].filepath)
                       };

                       uploadToDriveShowImg(auth).then(r => {
                           console.log(i + " " + r)


                       });
                      async function uploadToDriveShowImg(auth) {
                           const driveService = google.drive({version: 'v3', auth: auth});

                           let response = await driveService.files.create({
                               resource: fileMetaData,
                               media: media,
                               fields: 'webViewLink'
                           });
                           showImg = response.data.webViewLink.replace('view?usp=drivesdk','preview');
                           if (i===(form.openedFiles.length-1)) {
                               console.log("finished");resolve(true)}
                           return "uploaded ShowImgs";
                          }
                   }

               }


        }).then(r=>{
                let itemModel = new ItemModel(fieldsInfo.itemDescription,  fieldsInfo.itemCategory, showImg, slideShowImgUrls,  fieldsInfo.unitPrice,  fieldsInfo.qty,  fieldsInfo.vendorEmail, specsDocUrl, specsDocContent);
                resp.json(GSON.parse(GSON.stringify(itemModel)));
                ;;



    })
    });*/


}
const deleteItem = async (req, resp) => {
    let vEmail = req.query.vEmail;
    let itemId = req.query.id;
    let destinationPath = `${vEmail}/${itemId}`;
    console.log(vEmail + "-" + itemId);
    crudUtil.deleteContent(destinationPath).then(response => {
        axios.delete('http://localhost:8080/api/v1/item', {
            headers: {'token': 'snfjg85YY39475fhestdgff'},
            params: {
                id: itemId,
            }
        }).then(res => {
            resp.json({'message': 'Deleted successfully!'});
        }, err => {
            resp.send({'message': err});
        })

    }, err => {
        resp.send({'message': err});
    })
}

const updateItem = async (req, resp) => {
    let vEmail = req.query.vEmail;
    let itemId = req.query.id;
    let updateOption = req.query.option;
    let destinationPath = `${vEmail}/${itemId}`;
    console.log(vEmail + "-" + itemId);


    const itemModel = new ItemModel('', '', '', [], 0, 0, '', '', '');

    const bufferedEvents = [];
    const form = new formidable.IncomingForm();
    form.parse(req);

    let formFieldPromise = new Promise((resolve, reject) => {
        form.on('field', function (field, value) {
            // console.log("inside field");
            switch (field) {
                case 'itemDescription': {
                    itemModel.itemDescription = value;
                    break;
                }
                case 'itemCategory':
                    itemModel.itemCategory = value;
                    break;
                case 'unitPrice':
                    itemModel.unitPrice = value;
                    break;
                case 'qty': {
                    itemModel.qtyOnHand = value;
                    resolve();
                }
                    break;
                case 'vendorEmail': {
                    itemModel.vendorEmail = value;
                    vEmail = value;
                    break;
                }

                default:
                    break;
            }

        })
    })

    formFieldPromise.then(() => {
        handleBuffered();
    })

    function handleBuffered() {
        switch (updateOption) {
            case 'deleteUpdate': {
                crudUtil.deleteContent(destinationPath).then(response => {
                    for (const event of bufferedEvents) {
                        let destinationPath = `${vEmail}/${itemId}/${event.field}/${event.file.originalFilename}`;
                        console.log(destinationPath);
                        saveUploadToFireStorage(destinationPath, event.file.mimetype, event.file, event.field, itemId, form, itemModel, resp).then(r => console.log());

                    }
                }, error => {
                    resp.send({"message": "error updating item"});
                })
            }
                break

            case 'addUpdate': {

                for (const event of bufferedEvents) {
                    let destinationPath = `${vEmail}/${itemId}/${event.field}/${event.file.originalFilename}`;
                    console.log(destinationPath);
                    updateUploadToFireStorage(destinationPath, event.file.mimetype, event.file, event.field, itemId, form, itemModel, resp).then(r => console.log());

                }


            }

        }

    }


    form.on('file', (field, file) => {

        bufferedEvents.push({type: "file", field, file});


    })


}

async function saveUploadToFireStorage(destinationPath, contentType, file, field, itemId, form, itemModel, resp) {

    // const driveService = google.drive({version: 'v3', auth: auth});
    let i = 0;

    let response = await crudUtil.saveContent(destinationPath, contentType, file);

    if (field === "slideShowImgs") {
        itemModel.slideShowImageUrls.push(response[0].metadata.mediaLink);
    } else if (field === "specsDoc") {
        itemModel.specsDocUrl = response[0].metadata.mediaLink;
        extract(fs.readFileSync(file.filepath)).then(function (data) {
            itemModel.specsDocContent = data.text;

        });
    } else if (field === "showImg") {
        itemModel.itemLogoUrl = response[0].metadata.mediaLink;
    }
    i++;
    if (i === form.openedFiles.length) {
        const body = GSON.parse(GSON.stringify(itemModel));
        console.log(body);
        axios.put('http://localhost:8080/api/v1/item', body, {
            headers: {'token': 'snfjg85YY39475fhestdgff'},
            params: {
                id: itemId,
            }
        }).then(res => {
            resp.json({'message': 'Updated successfully!'});
        }, err => {
            resp.send({'message': err});
        })

    }

}

async function updateUploadToFireStorage(destinationPath, contentType, file, field, itemId, form, itemModel, resp) {

    // const driveService = google.drive({version: 'v3', auth: auth});
    let i = 0;

    let response = await crudUtil.saveContent(destinationPath, contentType, file);

    if (field === "slideShowImgs") {
        itemModel.slideShowImageUrls.push(response[0].metadata.mediaLink);
    } else if (field === "specsDoc") {
        itemModel.specsDocUrl = response[0].metadata.mediaLink;
        extract(fs.readFileSync(file.filepath)).then(function (data) {
            itemModel.specsDocContent = data.text;

        });
    } else if (field === "showImg") {
        itemModel.itemLogoUrl = response[0].metadata.mediaLink;
    }
    i++;
    if (i === form.openedFiles.length) {
        axios.get('http://localhost:8080/api/v1/item/find', {
            headers: {'token': 'snfjg85YY39475fhestdgff'},
            params: {
                searchText: itemId,
            }
        }).then(res => {

            itemModel.slideShowImageUrls.push(res.data.slideShowImageUrls);
            const body = GSON.parse(GSON.stringify(itemModel));
            console.log(body);
            axios.put('http://localhost:8080/api/v1/item', body, {
                headers: {'token': 'snfjg85YY39475fhestdgff'},
                params: {
                    id: itemId,
                }
            }).then(res => {
                resp.json({'message': 'Updated successfully!'});
            }, err => {
                resp.send({'message': err});
            })
        })


    }

}


module.exports = {saveItem, deleteItem, updateItem};