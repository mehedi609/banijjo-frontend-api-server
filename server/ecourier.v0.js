const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const { query } = require('../db_config')



const {
    ecourierBaseUrl,
    ecourierHeaders,
    ecourierPlaceOrderBody,
} = require('./ecourierHelpers')

// test
router.get('/', async (req, res) => {
    res.send('ecourier api')
})

//test
router.get('/test', async (req, res) => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => {
        return res.json();
    })
    .then(data => {
        return res.send(data);
    })
    .catch(err => {
        console.log(err);
    })
})

// test 
router.post('/test', async (req, res) => {
    try {
        const { customerName, orderNo } = req.body;            
        if (customerName && orderNo) return res.status(200).send({ message : 'Success' })
        else return res.send({ message : 'Fail' })        
      } catch (e) {
        res.status(500).send(e)
    }
})



// Place order
router.post('/order-place', async (req, res) => {

    const url = ecourierBaseUrl()
    const headers = ecourierHeaders()
    const body = ecourierPlaceOrderBody(req)
    
    fetch(`${url}/order-place`, {
            method : 'POST',
            crossDomain : true,
            headers : { headers },
            body : JSON.stringify(body)
    })
    .then(res =>  res.json())
    .then(data => {
        const { message, ID } = data
        saveOrderInfo(ID)
        res.send(message)
    })
    .catch(err => {
        res.send(err)
    })
});


const saveOrderInfo = async (ID) => {
    try{        
        return await query(
            `INSERT INTO order 
            (courier_service_id, courier_order_code) VALUES (1, ${ID})`
        );
    }catch(err){
        res.send(err)
    }
}


//  Parcel track
router.post('/track', async (req, res) => {

    const url = ecourierBaseUrl()
    const headers = ecourierHeaders()
    const body = ecourierParcelTrackBody()

    fetch(`${url}/track`, {
            method : 'POST',
            crossDomain : true,
            headers : { headers },
            body : JSON.stringify(body)
    })
    .then(res => {
        return res.json();
    })
    .then(data => {
        return res.send(data);
    })
    .catch(err => {
        console.log(err);
    })
});
  


//  Package list
router.post('/packages', async (req, res) => {

    const url = ecourierBaseUrl()
    const headers = ecourierHeaders()

    fetch(`${url}/packages`, {
            method : 'POST',
            crossDomain : true,
            headers : { headers },
            body : { "parcel" : req.body.parcel || "packagelist" }
    })
    .then(res => {
        return res.json();
    })
    .then(data => {
        return res.send(data);
    })
    .catch(err => {
        console.log(err);
    })
});



//  Cancel Order
router.post('/cancel-order', async (req, res) => {

    const url = ecourierBaseUrl()
    const headers = ecourierHeaders()
    const body = ecourierCancelOrderBody()

    fetch(`${url}/cancel-order`, {
            method : 'POST',
            crossDomain : true,
            headers : { headers },
            body : JSON.stringify(body)
    })
    .then(res => {
        return res.json();
    })
    .then(data => {
        return res.send(data);
    })
    .catch(err => {
        console.log(err);
    })
});
  

//  Fraud alert service 
router.post('/fraud-status-check', async (req, res) => {

    const url = ecourierBaseUrl()
    const headers = ecourierHeaders()

    fetch(`${url}/fraud-status-check`, {
            method : 'POST',
            crossDomain : true,
            headers : { headers },
            body : {
                // "parcel" : "fraud_status_check",
                "number" : req.body.number // Customer mobile number
            }
    })
    .then(res => {
        return res.json();
    })
    .then(data => {
        return res.send(data);
    })
    .catch(err => {
        console.log(err);
    })
});
  

  


//  City list
router.post('/citylist', async (req, res) => {

    const url = ecourierBaseUrl()
    const headers = ecourierHeaders()

    fetch(`${url}/City%20list`, {
            method : 'POST',
            crossDomain : true,
            headers : { headers },
            body : { "parcel" : req.body.parcel || "citylist" }
    })
    .then(res => {
        return res.json();
    })
    .then(data => {
        return res.send(data);
    })
    .catch(err => {
        console.log(err);
    })
});
  

//  Coverage area 
router.post('/coveragearea', async (req, res) => {

    const url = ecourierBaseUrl()
    const headers = ecourierHeaders()

    fetch(`${url}/Coverage%20area`, {
            method : 'POST',
            crossDomain : true,
            headers : { headers },
            body : { 
                "parcel" : req.body.parcel || "citylist",
                "city" : req.body.city || "Dhaka"
            }
    })
    .then(res => {
        return res.json();
    })
    .then(data => {
        return res.send(data);
    })
    .catch(err => {
        console.log(err);
    })
});






module.exports = router