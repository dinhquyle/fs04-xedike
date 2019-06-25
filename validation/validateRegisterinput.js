const validator = require("validator");
const _ = require("lodash");

const {User} = require("../modles/User")

/* const errorConfig = {
    email: {},
    password: {}
} */

validateRegisterInput = async(data) => {
    let errors = {};


    ///Kime tra xem input co bi bo trong kg
    // Neu bo trong thi cho no la String rong
    //data.email = data.email ? data.email : ""
    data.email = _.get(data, "email", "")// dung lodash
    data.password = _.get(data, "password", "")
    data.password2 = _.get(data, "password2", "")
    data.userType = _.get(data, "userType", "")
    data.fullName = _.get(data, "fullName", "")
    data.DOB = _.get(data, "DOB", "")
    data.phone = _.get(data, "phone", "")

    //_.toPairs(); // object ==> array
    //_.fromPairs(); //array ==> object
    // data (object) => data(array) => map (return tung element ===> array) ===> object
    //                  _.toPairs     _.map                                      _.fromPairs
    // _.toPairs(_.fromPairs(data).map())
    //trong lap trin huong ham( function programing): pipe line _.chain
    // _.chain(data).toPairs().map().fromPairs


    //Validate

    //email
    //item = "email"
    /* if( validator.isEmpty(data[item])){
        errors[item] = `${item} is required `
    }
    else if(!validator[item.check]data[item]){

    } */

    if( validator.isEmpty(data.email) ){ // true String rong"", false: co gia tri
        errors.email = "Email is required";
    }
    else if( !validator.isEmail(data.email)){ // true: email valid, false: email invalid
        errors.email = "Email is invalid"
    }
    else{
        const user = await User.findOne({email: data.email})
        if( user ) errors.email = "Email exits";
    }

    //Password
    if( validator.isEmpty(data.password)){
        errors.password = "Pass is required"
    }
    else if(!validator.isLength(data.password, 6) ){
        errors.password = "Password has at leat6 characters"
    }
    //Password confirm
    if( validator.isEmpty(data.password2)){
        errors.password2 = "Confirm pass is required"
    }
    else if(!validator.equals(data.password, data.password2) ){
        errors.password2 = "Password is not match"
    }
    // phone, 
    if( validator.isEmpty(data.phone)){
        errors.phone = "Phone is required"
    }
    else {
        const user = await User.findOne({phone: data.phone})
        if( user ) errors.phone = "Phone exists"
    }

    return {
        // isValid: true neu errors la {}; isValid: false khi errors co thuoc tinh
        isValid: _.isEmpty(errors),
        errors
    }
}
module.exports = validateRegisterInput