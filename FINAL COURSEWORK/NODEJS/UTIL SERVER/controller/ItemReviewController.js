const itemReviewModel = require('../model/ItemReviewModel');
const axios = require('axios');
const formidable = require('formidable');
const GSON = require("gson");


const addReview = async (req, resp) => {
    const form = formidable({multiples: true});
    const itemId = req.query.itemId;

    const itemReview = new itemReviewModel('', '', 0);

    form.parse(req, async (err, fields) => {
        if (err) {
            return resp.status(400).json({error: 'Form parse error'});
        }

        itemReview.review = fields.reviewText;
        itemReview.customerEmail = fields.customerEmail;
        itemReview.starCount = Number(fields.starCount);

        try {
            const searchResponse = await axios.get(
                "http://localhost:8080/api/v1/item/find",
                {
                    headers: {token: "snfjg85YY39475fhestdgff"},
                    params: {searchText: itemId}
                }
            );

            const updatedItem = searchResponse.data.data.items[0];
            updatedItem.reviews.push(itemReview);

            await axios.put(
                "http://localhost:8080/api/v1/item",
                updatedItem,
                {headers: {token: "snfjg85YY39475fhestdgff"}, params: {id: itemId}}
            );

            return resp.json({message: "Updated successfully"});

        } catch (error) {
            console.error(error);
            return resp.status(500).json({error: "Update failed"});
        }
    });
};


module.exports = {addReview}