const admin = require('firebase-admin');
const VendorModel = require('../model/VendorModel')

fetchLoginData = async (email_list)=>{
    let vendor = new VendorModel('','','','');
    let vendor_list = email_list ? email_list.split(',') : []
    for (const email of vendor_list){
        console.log(email.replace('.com',''))
        let user = await admin.database().ref(`customer_login/status/${email.replace('.com','')}`);
        const snapshot = await user.get();
        if (!snapshot.exists()) {
            return { exists: false, online: false };
        }

        const data = snapshot.val();
        vendor.vendorEmail = data.email;
        vendor.lastSeen = data.last_changed,
            vendor.vendorAvatarUrl = data.picture;
        vendor.vendorStatus = data.state;

        return vendor;
    }



}

module.exports = {fetchLoginData}