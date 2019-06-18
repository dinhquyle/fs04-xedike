const express = require("express");
const userController = require("./users");
const router = express.Router();
const {authenticating, authorizasing} = require("../../../middleware/auth");
const upload = require("../../../middleware/uploadimage");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/test-private", 
    authenticating, 
    authorizasing(["admin", "coder22"]),
    userController.testPrivate
);

router.post("/upload-avatar", 
    authenticating,
    upload.single('avatar'), 
    userController.uploadAvatar
)

module.exports = router;