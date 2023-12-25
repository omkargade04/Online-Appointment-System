const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors());
require('dotenv').config()
const dbConfig = require("./config/dbConfig");
app.use(express.json());
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const doctorsRoute = require("./routes/doctorsRoute");
const port = process.env.PORT || 5000;

console.log(process.env.MONGO_URL)

app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/doctor', doctorsRoute);

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
})