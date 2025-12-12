class VendorModel  {

    constructor(vendorEmail,lastSeen,vendorAvatarLogoUrl,vendorStatus){
        this.vendorEmail = vendorEmail;
            this.lastSeen = lastSeen;
            this.vendorAvatarLogoUrl = vendorAvatarLogoUrl;
            this.vendorStatus = vendorStatus;

    }
}

module.exports = VendorModel;