const admin = require('firebase-admin');
const ClientModel = require('../model/ClientModel')

fetchLoginData = async (email_list) => {
    let client = new ClientModel('', '', '', '');
    let client_list = email_list ? email_list.split(',') : []
    console.log(client_list);
    let data_list = [];
    for (const email of client_list) {
        console.log(email.replace('.com', ''))
        let user = await admin.database().ref(`customer_login/status/${email.replace('.com', '')}`);
        const snapshot = await user.get();
        if (!snapshot.exists()) {
            return data_list.push({exists: false, online: false});
        }

        const data = snapshot.val();
        client.clientEmail = data.email;
        client.lastSeen = data.last_changed,
            client.clientAvatarUrl = data.picture;
        client.clientStatus = data.state;

        data_list.push(client);
    }

    return data_list;


}

module.exports = {fetchLoginData}