const admin = require('firebase-admin');
const AuthFetchUtil = require('../util/AuthFetchUtil');


const getVendor = async (req,resp)=>{
    try {
        const userRecord = await AuthFetchUtil.fetchLoginData(req.query.email_list);
        return resp.json({message:'data fetched!',data:userRecord})
    } catch (error) {
        console.error("Error fetching user:", error);
        if (error.code === "auth/user-not-found") {
            console.log("User does not exist");
        } else
            throw error;
    }

}

module.exports= {getVendor}