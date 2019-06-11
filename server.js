/* 3rd packages */
const express  = require("express");
const mongoose = require("mongoose");
//get thi chi de duoc dl tren header va params
// Post thi de dc dl tren header, params va body


/* my packages */
mongoose.connect("mongodb://localhost:27017/fs04-xedike", {useNewUrlParser: true})
.then(() => console.log("connected to DB"))
.catch(err => console.log(err))
const app = express();

/*middleware */
// parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//router
app.use("/api/users", require("./routers/api/users"));

const port = process.env.PORT || 5000; // day la bien moi truong  giong voi a=1?a:b

app.listen(port, () => {
    console.log(`server is runing on port ${port}`);
})
