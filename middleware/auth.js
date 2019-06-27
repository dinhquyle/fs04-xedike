const jwt = require("jsonwebtoken");// Cai dat npm i jsonwebtoken

//Middleware
const authenticating = (req, res, next) =>{
    /*verify token
        - thanh cong: return next()
        - that bai: res.json(err);*/
    const token = req.header("Authorization");
    const fingerprint = req.header("fingerprint");
    console.log("TCL: authenticating -> fingerprint", fingerprint);
    const KEY = "Cybersoft" + fingerprint;
    try{
        const decoded = jwt.verify(token, "Cybersoft");
        console.log("decoded", decoded)
        req.user = decoded;
        next();

    } catch(error){
        res.status(403).json({error: "Kg the vao, token hoac Fingerprint kg hop le"})
    }
}

// User: passenger, driver, admin
// Middleware
const authorizasing = (userTypeArray) =>{
    return( req, res, next ) => {
        const { userType } = req.user;
        // userTypeArray: danh sach cac loai nguoi dung co the truy cap
        //userType: loai nguoi dung hien tai( lay tu decoded cua token)
        //Neu userTypeArray co chua userType ==> next()
        if( userTypeArray.indexOf(userType) > -1 ){
            return next();
        }
        else{
            res.status(403).json({errors: "Ban da dang nhap, nhung kg co quyen xem dieu nay"})
        }
    }
}
module.exports = {
    authenticating, authorizasing
}