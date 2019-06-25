const {Trip} = require("../../../modles/Trip");
const {User} = require("../../../modles/User");

const createTrip = (req, res, next) =>{
    //req.body
    console.log(req.body)
    const { locationFrom, locationTo, startTime, availableSeats, fee} = req.body;
    const driverId = req.user.id;
    // const numberOfBookingSeats = req.body;
    User
        .findById(driverId)
        .then(driver => {
            if( !driver ) return Promise.reject({errors: "sai"})
            const newTrip = new Trip({
                driverId,
                locationFrom, locationTo, startTime, availableSeats,
                fee,
            })

            return newTrip.save();
        })
        .then(trip => res.status(200).json(trip))
        .catch( err => res.status(400).json(err))
        
}

/* const bookTrip = async(req, res, next) =>{
    const { tripId } = req.params;
    const passengerId = req.user.id;
    const passenger = await User.findById(passengerId);
    const trip = await Trip.findById(tripId);
    const numberOfBookingSeats = req.body;
    console.log(passengerId)
    if( !passenger ) return res.status(400).json({errors: "Passenger not found"})
    if( !trip ) return res.status(400).json({errors: "Trip not found"})
    if( numberOfBookingSeats > trip.availableSeats ) return res.status(400).json({errors: "Your booking"})
    trip.availableSeats = trip.availableSeats - numberOfBookingSeats
    trip.passengerIds.push(passengerId);
    const savedTrip =  await trip.save()
    res.status(200).json.save(savedTrip);
} */

//ES7 promise all
const bookTrip = (req, res, next) => {
    const { tripId } = req.params;
    const passengerId = req.user.id;
    const {numberOfBookingSeats} = req.body;
    console.log(numberOfBookingSeats)
    
    Promise.all([
        User.findById(passengerId),
        Trip.findById(tripId)
    ])
    .then( results => {
        const passenger = results[0];
        const trip = results[1];
        console.log(trip)
        if( !passenger ) return Promise.reject({errors: "Passenger not found"})
        if( !trip ) return Promise.reject({errors: "Trip not found"})
        if( numberOfBookingSeats > trip.availableSeats ) return Promise.reject({errors: "Your booking is over"})
        trip.availableSeats = trip.availableSeats - numberOfBookingSeats
        trip.passengerIds.push(passengerId);
        return trip.save();
    })
    .then(trip => {
        res.status(200).json(trip)
    })
    .catch(err => res.status(400).json(err))
}

module.exports = {
    createTrip,
    bookTrip
}
