class ClientModel {

    constructor(clientEmail, lastSeen, clientAvatarLogoUrl, clientStatus) {
        this.clientEmail = clientEmail;
        this.lastSeen = lastSeen;
        this.clientAvatarLogoUrl = clientAvatarLogoUrl;
        this.clientStatus = clientStatus;

    }
}

module.exports = ClientModel;