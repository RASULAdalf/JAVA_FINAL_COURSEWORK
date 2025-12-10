const ItemModel = require('../model/ItemModel');
const fs = require('fs');
const formidable = require("formidable");
const extract = require('pdf-parse');
const GSON = require('gson');
const axios = require('axios');
const admin = require('firebase-admin');
const crudUtil = require('../util/CrudUtil');


console.log("Item Controller")

// const saveItem = (req, resp) => {
//     let vEmail = "";
//     let itemId = '';
//     let i = 0;
//     const itemModel = new ItemModel('', '', '', [], 0, 0, '', '', '');
//     // const KEYPATH = './drive.json';
//     // const SCOPES = ['https://www.googleapis.com/auth/drive'];
//     // //fieldsInfo = fields;
//     // const auth = new google.auth.GoogleAuth({
//     //     keyFile: KEYPATH,
//     //     scopes: SCOPES
//     // });
//
//     const bufferedEvents = [];
//     const form = formidable({ multiples: true });
//     form.parse(req);
//
//     let formFieldPromise = new Promise((resolve, reject) => {
//         form.on('field', function (field, value) {
//             // console.log("inside field");
//             switch (field) {
//                 case 'itemDescription': {
//                     itemModel.itemDescription = value;
//                     break;
//                 }
//                 case 'itemCategory':
//                     itemModel.itemCategory = value;
//                     break;
//                 case 'unitPrice':
//                     itemModel.unitPrice = value;
//                     break;
//                 case 'qty': {
//                     itemModel.qtyOnHand = value;
//                     resolve();
//                 }
//                     break;
//                 case 'vendorEmail': {
//                     itemModel.vendorEmail = value;
//                     vEmail = value;
//                     break;
//                 }
//
//                 default:
//                     break;
//             }
//
//         })
//     })
//
//     async function handleBuffered() {
//         for (const event of bufferedEvents) {
//             let destinationPath = `${vEmail}/${itemId}/${event.field}/${event.file.originalFilename}`;
//             console.log(destinationPath);
//             await saveUploadToFireStorage(destinationPath, event.file.mimetype, event.file, event.field, itemId, form, itemModel, resp).then(r => console.log());
//
//         }
//     }
//
//     formFieldPromise.then(() => {
//         axios.post('http://localhost:8080/api/v1/item', GSON.parse(GSON.stringify(itemModel)), {
//             headers: {'token': 'snfjg85YY39475fhestdgff'}
//         }).then(async response => {
//             itemId = response.data.data;
//             console.log("handling buffered");
//             await handleBuffered();
//         }, error => {
//             console.log(error);
//         })
//     }, err => {
//
//         resp.send({'message': err});
//     })
//
//     form.on('file', (field, file) => {
//
//         bufferedEvents.push({type: "file", field, file});
//
//
//         // if (itemIdSet) {
//         //     let destinationPath = `${vEmail}/${itemId}/${field}/${file.originalFilename}`;
//         //     console.log(destinationPath);
//         //     uploadToFireStorage(destinationPath, file.mimetype, file, field, itemId).then(r => console.log());
//         //
//         // }
//
//
//     })
//
//
//
//
//     // form.on('file', (field, file) => {
//     //     let promise = new Promise((resolve, reject) => {
//     //         if (i===0) {
//     //             axios.post('http://localhost:8080/api/v1/item', GSON.parse(GSON.stringify(itemModel)), {
//     //                 headers: {'token': 'snfjg85YY39475fhestdgff'}
//     //             }).then(res => {
//     //                 itemId = res.data.data;
//     //                 resolve();
//     //                 let destinationPath = `${vEmail}/${itemId}/${field}/${file.originalFilename}`;
//     //                 //uploadToFireStorage(destinationPath, file.mimetype, file, field,itemId).then(r => console.log());
//     //
//     //                 console.log("Axios post - "+i)
//     //             }, err => {
//     //                 reject();
//     //                 resp.send({'message': err});
//     //             })
//     //         }
//     //     })
//     //
//     //
//     //
//     //     //let contentType = file.mimetype
//     //     //console.log(vEmail);
//     //     // let _field = field;
//     //     // // console.log("inside file");
//     //     // if (_field === "slideShowImgs") {
//     //     //     parents = 'slideShowImgs';
//     //     // } else if (_field === "specsDoc") {
//     //     //     parents = "1fYEjwOpbiS_sAH4dtafOM_NaLn4g4RyX";
//     //     // } else if (_field === "showImg") {
//     //     //     parents = "1moKJZqcotloZyTpjgZtBTPzuKuELkK_f";
//     //     // }
//     //     // // console.log("inside");
//     //     // let fileMetaData = {
//     //     //     'name': file.name,
//     //     //     'parents': [parents]
//     //     // }
//     //     // const media = {
//     //     //     mimeType: file.mimeType,
//     //     //     body: fs.createReadStream(file.filepath)
//     //     // };
//     //     promise.then((res) => {
//     //         if (i>1) {
//     //             console.log("upload - "+i);
//     //             let destinationPath = `${vEmail}/${itemId}/${field}/${file.originalFilename}`;
//     //             //uploadToFireStorage(destinationPath, contentType, file, field, itemId).then(r => console.log());
//     //
//     //         }
//     //     })
//     //
//     //
//     //
//     //
//     // });
//
//
//     /*form.on('end',()=>{
//
//          while (specsDocUrl=== ''){}
//          console.log('third')
//          while (specsDocContent=== ''){}
//          itemModel.slideShowImageUrls = slideShowImgUrls;
//          itemModel.specsDocUrl= specsDocUrl;
//          itemModel.specsDocContent = specsDocContent;
//          resp.json(GSON.parse(GSON.stringify(itemModel)));
//
//      })*/
//
//
//     /*
//         form.parse(req, function (err, fields, files) {
//             const KEYPATH = './drive.json';
//             const SCOPES = ['https://www.googleapis.com/auth/drive'];
//             fieldsInfo = fields;
//             const auth = new google.auth.GoogleAuth({
//                 keyFile: KEYPATH,
//                 scopes: SCOPES
//             });
//             return new Promise(function (resolve, reject) {
//                for (let i = 0; i < form.openedFiles.length; i++) {
//                    //console.log(files);
//                    if (files.slideShowImgs.originalFilename === form.openedFiles[i].originalFilename) {
//
//                        let fileMetaData = {
//                            'name': form.openedFiles[i].originalFilename,
//                            'parents': ['1cHET8_6ozSzScV4HkgOMa4ltLOzyTlVu']
//                        }
//                        const media = {
//                            mimeType: form.openedFiles[i].mimeType,
//                            body: fs.createReadStream(form.openedFiles[i].filepath)
//                        };
//
//                        uploadToDriveSlideShowImgs(auth).then(r => {
//                            console.log(i + " " + r)
//
//
//                        });
//                        async function uploadToDriveSlideShowImgs(auth) {
//                            const driveService = google.drive({version: 'v3', auth: auth});
//
//                            let response = await driveService.files.create({
//                                resource: fileMetaData,
//                                media: media,
//                                fields: 'webViewLink'
//                            });
//                            console.log('passed')
//                            slideShowImgUrls.push(response.data.webViewLink.replace('view?usp=drivesdk','preview'));
//                            if (i===(form.openedFiles.length-1)) {resolve(true);}
//                            return "uploaded slideShowImgs";
//                        }
//                    }
//
//                    if (files.specsDoc.originalFilename === form.openedFiles[i].originalFilename) {
//
//                        let fileMetaData = {
//                            'name': form.openedFiles[i].originalFilename,
//                            'parents': ['1X0_SNx60tkCG2PfR6z5omFmw310AzkE2']
//                        }
//                        const media = {
//                            mimeType: form.openedFiles[i].mimeType,
//                            body: fs.createReadStream(form.openedFiles[i].filepath)
//                        };
//
//                        uploadToDriveSpecsDoc(auth).then(r => {
//                            console.log(i + " " + r)
//
//
//                               extract(fs.readFileSync(form.openedFiles[i].filepath)).then(function (data){
//                                   specsDocContent = data.text;
//
//                               });
//
//
//                        });
//                       async function uploadToDriveSpecsDoc(auth) {
//                            const driveService = google.drive({version: 'v3', auth: auth});
//
//                            let response = await driveService.files.create({
//                                resource: fileMetaData,
//                                media: media,
//                                fields: 'webViewLink'
//                            });
//                            specsDocUrl = response.data.webViewLink;
//                            if (i===(form.openedFiles.length-1)){resolve(true);}
//                            return "uploaded SpecsDoc";
//                           }
//                    }
//
//                     if (files.showImg.originalFilename === form.openedFiles[i].originalFilename) {
//
//                        let fileMetaData = {
//                            'name': form.openedFiles[i].originalFilename,
//                            'parents': ['1-k1otsFRka3vCUicOVBXCopQzlwlVOG9']
//                        }
//                        const media = {
//                            mimeType: form.openedFiles[i].mimeType,
//                            body: fs.createReadStream(form.openedFiles[i].filepath)
//                        };
//
//                        uploadToDriveShowImg(auth).then(r => {
//                            console.log(i + " " + r)
//
//
//                        });
//                       async function uploadToDriveShowImg(auth) {
//                            const driveService = google.drive({version: 'v3', auth: auth});
//
//                            let response = await driveService.files.create({
//                                resource: fileMetaData,
//                                media: media,
//                                fields: 'webViewLink'
//                            });
//                            showImg = response.data.webViewLink.replace('view?usp=drivesdk','preview');
//                            if (i===(form.openedFiles.length-1)) {
//                                console.log("finished");resolve(true)}
//                            return "uploaded ShowImgs";
//                           }
//                    }
//
//                }
//
//
//         }).then(r=>{
//                 let itemModel = new ItemModel(fieldsInfo.itemDescription,  fieldsInfo.itemCategory, showImg, slideShowImgUrls,  fieldsInfo.unitPrice,  fieldsInfo.qty,  fieldsInfo.vendorEmail, specsDocUrl, specsDocContent);
//                 resp.json(GSON.parse(GSON.stringify(itemModel)));
//                 ;;
//
//
//
//     })
//     });*/
//
//
// }

const saveItem = (req, resp) => {
    const itemModel = new ItemModel('', '', '', [], 0, 0, '', '', '');
    let vEmail = "";
    let itemId = "";
    let bufferedEvents = [];

    const form = new formidable.IncomingForm({multiples: true});

    form.on("field", (field, value) => {
        switch (field) {
            case "itemDescription":
                itemModel.itemDescription = value;
                break;
            case "itemCategory":
                itemModel.itemCategory = value;
                break;
            case "unitPrice":
                itemModel.unitPrice = value;
                break;
            case "qty":
                itemModel.qtyOnHand = value;
                break;
            case "vendorEmail":
                itemModel.vendorEmail = value;
                vEmail = value;
                break;
        }
    });

    form.on("file", (field, file) => {
        bufferedEvents.push({field, file});
    });

    form.on("end", async () => {
        try {
            // 1. Save item in DB (get itemId)
            const response = await axios.post(
                "http://localhost:8080/api/v1/item",
                GSON.parse(GSON.stringify(itemModel)),
                {headers: {token: "snfjg85YY39475fhestdgff"}}
            );

            itemId = response.data.data;

            // 2. Upload files to Firebase (one by one)
            for (const event of bufferedEvents) {
                const {field, file} = event;

                const path = `${vEmail}/${itemId}/${field}/${file.originalFilename}`;
                const uploaded = await crudUtil.saveContent(path, file.mimetype, file);

                if (field === "slideShowImgs")
                    itemModel.slideShowImageUrls.push(uploaded[0].metadata.mediaLink);

                if (field === "showImg")
                    itemModel.itemLogoUrl = uploaded[0].metadata.mediaLink;

                if (field === "specsDoc") {
                    itemModel.specsDocUrl = uploaded[0].metadata.mediaLink;
                    const text = await extract(fs.readFileSync(file.filepath));
                    itemModel.specsDocContent = text.text;
                }
            }

            // 3. Update DB
            await axios.put(
                "http://localhost:8080/api/v1/item",
                GSON.parse(GSON.stringify(itemModel)),
                {headers: {token: "snfjg85YY39475fhestdgff"}, params: {id: itemId}}
            );

            return resp.json({message: "Saved successfully"});

        } catch (err) {
            console.error(err);
            return resp.status(500).json({error: "Upload failed"});
        }
    });

    form.parse(req);
};


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
    const itemId = req.query.id;
    const updateOption = req.query.option;

    const itemModel = new ItemModel('', '', '', [], 0, 0, '', '', '');
    const bufferedEvents = [];

    const form = formidable({multiples: true});

    // Capture form fields
    form.on("field", (field, value) => {
        switch (field) {
            case 'itemDescription':
                itemModel.itemDescription = value;
                break;
            case 'itemCategory':
                itemModel.itemCategory = value;
                break;
            case 'unitPrice':
                itemModel.unitPrice = value;
                break;
            case 'qty':
                itemModel.qtyOnHand = value;
                break;
            case 'vendorEmail':
                itemModel.vendorEmail = value;
                vEmail = value;
                break;
        }
    });

    // Buffer file uploads
    form.on("file", (field, file) => {
        bufferedEvents.push({field, file});
    });

    // After all form data is ready
    form.on("end", async () => {
        try {
            const destinationBase = `${vEmail}/${itemId}`;

            //
            // ──────────────────────────────────────────────
            //   1. DELETE UPDATE MODE
            // ──────────────────────────────────────────────
            //
            if (updateOption === "deleteUpdate") {
                await crudUtil.deleteContent(destinationBase);
            }

            //
            // ──────────────────────────────────────────────
            //   2. UPLOAD NEW FILES (for both addUpdate & deleteUpdate)
            // ──────────────────────────────────────────────
            //
            for (const event of bufferedEvents) {
                const {field, file} = event;

                const destinationPath =
                    `${vEmail}/${itemId}/${field}/${file.originalFilename}`;

                const uploaded = await crudUtil.saveContent(
                    destinationPath,
                    file.mimetype,
                    file
                );

                const url = uploaded[0].metadata.mediaLink;

                if (field === "slideShowImgs") {
                    itemModel.slideShowImageUrls.push(url);
                }

                if (field === "showImg") {
                    itemModel.itemLogoUrl = url;
                }

                if (field === "specsDoc") {
                    itemModel.specsDocUrl = url;
                    const text = await extract(fs.readFileSync(file.filepath));
                    itemModel.specsDocContent = text.text;
                }
            }

            //
            // ──────────────────────────────────────────────
            //   3. ADDITIONAL LOGIC FOR addUpdate
            // ──────────────────────────────────────────────
            //
            if (updateOption === "addUpdate") {
                // Load existing data and append to slideShow list
                const searchResponse = await axios.get(
                    "http://localhost:8080/api/v1/item/find",
                    {
                        headers: {token: "snfjg85YY39475fhestdgff"},
                        params: {searchText: itemId}
                    }
                );

                const existing = searchResponse.data.data.items[0];

                // Append old slideshow images if any
                if (existing.slideShowImageUrls) {
                    itemModel.slideShowImageUrls.push(...existing.slideShowImageUrls);
                }
            }

            //
            // ──────────────────────────────────────────────
            //   4. UPDATE BACK-END DATABASE
            // ──────────────────────────────────────────────
            //
            await axios.put(
                "http://localhost:8080/api/v1/item",
                GSON.parse(GSON.stringify(itemModel)),
                {
                    headers: {token: "snfjg85YY39475fhestdgff"},
                    params: {id: itemId}
                }
            );

            return resp.json({message: "Updated successfully!"});

        } catch (error) {
            console.error(error);
            return resp.status(500).json({message: "Update failed", error});
        }
    });

    form.parse(req);
};


// const updateItem = async (req, resp) => {
//     let i = 0;
//     let vEmail = req.query.vEmail;
//     let itemId = req.query.id;
//     let updateOption = req.query.option;
//     let destinationPath = `${vEmail}/${itemId}`;
//     console.log(vEmail + "-" + itemId);
//
//
//     const itemModel = new ItemModel('', '', '', [], 0, 0, '', '', '');
//
//     const bufferedEvents = [];
//     const form = new formidable.IncomingForm({multiples: true});
//
//     form.on('field', function (field, value) {
//         // console.log("inside field");
//         switch (field) {
//             case 'itemDescription': {
//                 itemModel.itemDescription = value;
//                 break;
//             }
//             case 'itemCategory':
//                 itemModel.itemCategory = value;
//                 break;
//             case 'unitPrice':
//                 itemModel.unitPrice = value;
//                 break;
//             case 'qty': {
//                 itemModel.qtyOnHand = value;
//
//             }
//                 break;
//             case 'vendorEmail': {
//                 itemModel.vendorEmail = value;
//                 vEmail = value;
//                 break;
//             }
//
//             default:
//                 break;
//         }
//
//
//     })
//
//
//     async function handleBuffered() {
//         switch (updateOption) {
//             case 'deleteUpdate': {
//                 crudUtil.deleteContent(destinationPath).then(async response => {
//                     for (const event of bufferedEvents) {
//                         let destinationPath = `${vEmail}/${itemId}/${event.field}/${event.file.originalFilename}`;
//                         console.log(destinationPath);
//                         await saveUploadToFireStorage(destinationPath, event.file.mimetype, event.file, event.field, itemId, form, itemModel, resp, i).then(r => console.log());
//
//                     }
//                 }, error => {
//                     resp.send({"message": "error updating item"});
//                 })
//             }
//                 break
//
//             case 'addUpdate': {
//                 console.log(bufferedEvents)
//                 for (const event of bufferedEvents) {
//                     let destinationPath = `${vEmail}/${itemId}/${event.field}/${event.file.originalFilename}`;
//                     console.log(destinationPath);
//                     await updateUploadToFireStorage(destinationPath, event.file.mimetype, event.file, event.field, itemId, form, itemModel, resp, i).then(r => console.log());
//
//                 }
//
//
//             }
//                 break;
//             default:
//                 break;
//
//         }
//
//
//     }
//
//
//     form.on('file', (field, file) => {
//
//         bufferedEvents.push({type: "file", field, file});
//         console.log(bufferedEvents);
//
//
//     })
//
//
//     form.on('end', async () => {
//         await handleBuffered();
//     })
//
//
//     form.parse(req);
// }
//
// async function saveUploadToFireStorage(destinationPath, contentType, file, field, itemId, form, itemModel, resp, i) {
//
//     // const driveService = google.drive({version: 'v3', auth: auth});
//
//     console.log("in saveUp...")
//
//     let response = await crudUtil.saveContent(destinationPath, contentType, file);
//
//     if (field === "slideShowImgs") {
//         itemModel.slideShowImageUrls.push(response[0].metadata.mediaLink);
//     } else if (field === "specsDoc") {
//         itemModel.specsDocUrl = response[0].metadata.mediaLink;
//         extract(fs.readFileSync(file.filepath)).then(function (data) {
//             itemModel.specsDocContent = data.text;
//
//         });
//     } else if (field === "showImg") {
//         itemModel.itemLogoUrl = response[0].metadata.mediaLink;
//     }
//     i++;
//     if (i === form.openedFiles.length) {
//         const body = GSON.parse(GSON.stringify(itemModel));
//         console.log(body);
//         axios.put('http://localhost:8080/api/v1/item', body, {
//             headers: {'token': 'snfjg85YY39475fhestdgff'},
//             params: {
//                 id: itemId,
//             }
//         }).then(res => {
//             resp.json({'message': 'Updated successfully!'});
//             return "updated!";
//         }, err => {
//             resp.send({'message': err});
//             return "error updating!";
//         })
//
//     }
//
// }
//
// async function updateUploadToFireStorage(destinationPath, contentType, file, field, itemId, form, itemModel, resp, i) {
//
//     // const driveService = google.drive({version: 'v3', auth: auth});
//
//     console.log("in updateUp...")
//     let response = await crudUtil.saveContent(destinationPath, contentType, file);
//
//     if (field === "slideShowImgs") {
//         itemModel.slideShowImageUrls.push(response[0].metadata.mediaLink);
//     } else if (field === "specsDoc") {
//         itemModel.specsDocUrl = response[0].metadata.mediaLink;
//         extract(fs.readFileSync(file.filepath)).then(function (data) {
//             itemModel.specsDocContent = data.text;
//
//         });
//     } else if (field === "showImg") {
//         itemModel.itemLogoUrl = response[0].metadata.mediaLink;
//     }
//     i++;
//     if (i === form.openedFiles.length) {
//         console.log("")
//         axios.get('http://localhost:8080/api/v1/item/find', {
//             headers: {'token': 'snfjg85YY39475fhestdgff'},
//             params: {
//                 searchText: itemId,
//             }
//         }).then(res => {
//             console.log(res.data.data.items[0].slideShowImageUrls);
//             itemModel.slideShowImageUrls.push(res.data.data.items[0].slideShowImageUrls);
//             const body = GSON.parse(GSON.stringify(itemModel));
//             console.log(body);
//             axios.put('http://localhost:8080/api/v1/item', body, {
//                 headers: {'token': 'snfjg85YY39475fhestdgff'},
//                 params: {
//                     id: itemId,
//                 }
//             }).then(res => {
//                 resp.json({'message': 'Updated successfully!'});
//                 return "updated!";
//             }, err => {
//                 resp.send({'message': err});
//                 return "error updating!";
//             })
//         })
//
//
//     }
//
// }
//

module.exports = {saveItem, deleteItem, updateItem};