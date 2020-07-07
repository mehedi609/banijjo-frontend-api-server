const { query } = require("../db_config")

const api_key = "asdasdasd"
const api_secret = "asdasdasd"
const user_id = "asdasdasd"

const sandbox = true
const sandbox_url = "https://dev.ecourier.com.bd/apiv2/"
const production_url = "https://ecourier.com.bd/apiv2/"

module.exports.ecourierBaseUrl = () => {
    return sandbox ? sandbox_url : production_url
}

module.exports.ecourierHeaders = () => {
    return {
        'API_KEY' : api_key,
        'API_SECRET' : api_secret,
        'USER_ID' : user_id,
        'Content-Type' : 'application/json'
    }
}

module.exports.ecourierPlaceOrderBody = (req) => {
    return {
        "parcel" : req.body.parcel,
        "recipient_name" : req.body.recipient_name,
        "recipient_mobile" : req.body.recipient_mobile,
        "recipient_city" : req.body.recipient_city,
        "recipient_area" : req.body.recipient_area,
        "recipient_address" : req.body.recipient_address,
        "package_code" : req.body.package_code,
        "product_price" : req.body.product_price,
        "payment_method" : req.body.payment_method,
        "recipient_landmark" : req.body.recipient_landmark,
        "parcel_type" : req.body.parcel_type,
        "is_anonymous" : req.body.is_anonymous,
        "requested_delivery_time" : req.body.requested_delivery_time,
        "delivery_hour" : req.body.delivery_hour,
        "recipient_zip" : req.body.recipient_zip,
        "product_id" : req.body.product_id,
        "pick_address" : req.body.pick_address,
        "comments" : req.body.comments,
        "number_of_item" : req.body.number_of_item,
        "actual_product_price" : req.body.actual_product_price
    }
}


module.exports.ecourierParcelTrackBody = (req) => {
    return {
        "parcel" : req.body.parcel || "track", // Define the type operation to be performed, example 'track'
        "product_id" : req.body.product_id,
        "ecr" : req.body.ecr //  eCourier ID
    }
}

module.exports.ecourierCancelOrderBody = (req) => {
    return {
        "parcel" : req.body.parcel || "track", // Define the type operation to be performed, example 'track'
        "tracking_no" : req.body.tracking_no, //  eCourier ID
        "comment" : req.body.comment
    }
}





