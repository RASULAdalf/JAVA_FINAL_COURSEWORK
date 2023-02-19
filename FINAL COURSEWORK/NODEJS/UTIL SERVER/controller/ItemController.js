const ItemModel = require('../model/ItemModel');
const {google} = require('googleapis');
const path = require('path');
const fs = require('fs');
const formidable = require("formidable");
const extract = require('pdf-parse');
const GSON = require('gson');
const axios = require('axios');

let showImg = "";
let specsDocUrl = "";
let slideShowImgUrls = [];
let specsDocContent = "";



const proceed = (req, resp) => {
    let i = 0;
    const itemModel = new ItemModel('', '', '', [], 0, 0, '', '', '');
    const KEYPATH = './drive.json';
    const SCOPES = ['https://www.googleapis.com/auth/drive'];
    //fieldsInfo = fields;
    const auth = new google.auth.GoogleAuth({
        keyFile: KEYPATH,
        scopes: SCOPES
    });
    slideShowImgUrls = [];
    const form = new formidable.IncomingForm();
    form.parse(req);
    form.on('field', function (field, value) {
        // console.log("inside field");
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
                break;
            default:
                break;
        }

    })

    form.on('file', (field, file) => {
        let parents = '';
        let _field = field;
        // console.log("inside file");
        if (_field === "slideShowImgs") {
            parents = '1cHET8_6ozSzScV4HkgOMa4ltLOzyTlVu';
        } else if (_field === "specsDoc") {
            parents = "1X0_SNx60tkCG2PfR6z5omFmw310AzkE2";
        } else if (_field === "showImg") {
            parents = "1-k1otsFRka3vCUicOVBXCopQzlwlVOG9";
        }
        // console.log("inside");
        let fileMetaData = {
            'name': file.name,
            'parents': [parents]
        }
        const media = {
            mimeType: file.mimeType,
            body: fs.createReadStream(file.filepath)
        };

        uploadToDrive(auth, fileMetaData, media, _field, file).then(r => console.log());


    });

    /*form.on('end',()=>{

         while (specsDocUrl=== ''){}
         console.log('third')
         while (specsDocContent=== ''){}
         itemModel.slideShowImageUrls = slideShowImgUrls;
         itemModel.specsDocUrl= specsDocUrl;
         itemModel.specsDocContent = specsDocContent;
         resp.json(GSON.parse(GSON.stringify(itemModel)));

     })*/

    async function uploadToDrive(auth, fileMetaData, media, _field, file) {

        const driveService = google.drive({version: 'v3', auth: auth});

        let response = await driveService.files.create({
            resource: fileMetaData,
            media: media,
            fields: 'id'
        });
        console.log(response.data);
        console.log(response.data.id);
        if (_field === "slideShowImgs") {
            console.log('slide')
            slideShowImgUrls.push("https://drive.google.com/uc?export=download&id="+response.data.id);
        } else if (_field === "specsDoc") {
            console.log('specsDoc')
            specsDocUrl = "https://drive.google.com/file/d/"+response.data.id+"/view";
            console.log(specsDocUrl)
            extract(fs.readFileSync(file.filepath)).then(function (data) {
                specsDocContent = data.text;

            });
        } else if (_field === "showImg") {
            console.log('shImg')
            showImg = "https://drive.google.com/uc?export=download&id="+response.data.id;
        }
        i++;
        if (i === form.openedFiles.length) {
            itemModel.slideShowImageUrls = slideShowImgUrls;
            itemModel.specsDocUrl = specsDocUrl;
            itemModel.specsDocContent = specsDocContent;
            itemModel.itemLogoUrl = showImg;
            const body = GSON.parse(GSON.stringify(itemModel));
            axios.post('http://localhost:8080/api/v1/item',body,{
                headers: {'token': 'snfjg85YY39475fhestdgff'}
            }).then(res=>{
                resp.json({'message':'Uploaded successfully!'});
            },err=>{
                resp.send({'message':err});
            })

        }

    }


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
module.exports = {proceed};