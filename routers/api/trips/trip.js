const {Trip} = require("../../../modles/Trip");
const {User} = require("../../../modles/User");

const createTrip = (req, res, next) =>{
    //req.body
    const { locationFrom, locationTo, startTime, availableSeats, fee} = req.body;
    const driverId = req.user.id;
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

const bookTrip = async(req, res, next) =>{
    const { tripId } = req.params;
    const passengerId = req.user._id;
    const passenger = await User.findById(passengerId);
    const trip = await Trip.findById(tripId);
    if( !passenger ) return res.status(400).json({errors: "Passenger not found"})
    if( !trip ) return res.status(400).json({errors: "Trip not found"})

    trip.passengerId.push(passengerId);
    return await trip.save()
    
}

module.exports = {
    createTrip,
    bookTrip
}
