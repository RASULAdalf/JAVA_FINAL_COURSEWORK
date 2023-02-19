class ItemModel {

    constructor(itemDescription, itemCategory, itemLogoUrl, slideShowImageUrls, unitPrice, qtyOnHand, vendorEmail, specsDocUrl, specsDocContent) {
        this.itemDescription = itemDescription;
        this.itemCategory = itemCategory;
        this.itemLogoUrl = itemLogoUrl;
        this.slideShowImageUrls = slideShowImageUrls;
        this.unitPrice = unitPrice;
        this.qtyOnHand = qtyOnHand;
        this.vendorEmail = vendorEmail;
        this.specsDocUrl = specsDocUrl;
        this.specsDocContent = specsDocContent;
    }


}

module.exports = ItemModel;