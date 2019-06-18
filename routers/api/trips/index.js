const express = require("express");
const router = express.Router();
const {authenticating, authorizasing} = require("../../../middleware/auth");
const tripContronller = require("./trip");

//driver
router.post("/create-trip", 
    authenticating,
    authorizasing(["driver"]),
    tripContronller.createTrip
)

//Passenger 
router.post("/book-trip/:tripId", 
    authenticating,
    authorizasing(["passenger"]),
    tripContronller.bookTrip
)


module.exports = router;