class ItemReviewModel {
    constructor(customer_email, review, star_count) {
        this.customerEmail = customer_email;
        this.review = review;
        this.starCount = star_count;
    }
}

module.exports = ItemReviewModel