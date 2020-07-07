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
// test 
router.post('/placeorder', async (req, res) => {
    try {
        const { customerName, orderNo } = req.body;    
        
        if (customerName && orderNo) {
          return res.send({ message : 'Success' })
        } else {
          return res.send({ message : 'Fail' })
        }
      } catch (e) {
        res.status(500).send(e)
    }
})



// Place order
router.post('/placeorder', async (req, res) => {

    const url = ecourierBaseUrl()
    const headers = ecourierHeaders()
    const body = ecourierPlaceOrderBody()

    fetch(`${url}/Place%20order`, {
            method : 'POST',
            crossDomain : true,
            headers : { headers },
            body : JSON.stringify(body)
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err))
});

//  Parcel track
router.post('/parceltrack', async (req, res) => {

    const url = ecourierBaseUrl()
    const headers = ecourierHeaders()
    const body = ecourierParcelTrackBody()

    fetch(`${url}/Parcel%20track`, {
            method : 'POST',
            crossDomain : true,
            headers : { headers },
            body : JSON.stringify(body)
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err))
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
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err))
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
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err))
});


//  Package list
router.post('/packagelist', async (req, res) => {

    const url = ecourierBaseUrl()
    const headers = ecourierHeaders()

    fetch(`${url}/Package%20list`, {
            method : 'POST',
            crossDomain : true,
            headers : { headers },
            body : { "parcel" : req.body.parcel || "packagelist" }
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err))
});
  


//  Cancel Order
router.post('/cancelorder', async (req, res) => {

    const url = ecourierBaseUrl()
    const headers = ecourierHeaders()
    const body = ecourierCancelOrderBody()

    fetch(`${url}/Cancel%20Order`, {
            method : 'POST',
            crossDomain : true,
            headers : { headers },
            body : JSON.stringify(body)
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err))
});
  

//   Fraud alert service 
router.post('/cancelorder', async (req, res) => {

    const url = ecourierBaseUrl()
    const headers = ecourierHeaders()

    fetch(`${url}/Fraud%20alert%20service `, {
            method : 'POST',
            crossDomain : true,
            headers : { headers },
            body : {
                "parcel" : "fraud_status_check",
                "number" : req.body.number // Customer mobile number
            }
    })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err))
});
  



module.exports = router