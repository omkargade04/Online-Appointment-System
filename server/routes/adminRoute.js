const express = require('express');
const router = express.Router();
const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/get-all-doctors", authMiddleware, async(req, res) => {
    try{
        const doctors = await Doctor.find({});
        console.log(doctors);
        res.status(200).send({
            message: "Doctors fetched successfully",
            success: true,
            data: doctors,
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            message: "Error applying doctor account",
            success: false,
            error,
        });
    }
});

router.get("/get-all-users", authMiddleware, async(req, res) => {
    try{
        const users = await User.find({});
        console.log(users);
        res.status(200).send({
            message: "Users fetched successfully",
            success: true,
            data: users,
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            message: "Error applying doctor account",
            success: false,
            error,
        });
    }
});

router.post("/change-doctor-account-status", authMiddleware, async(req, res) => {
    try{
        const {doctorId, status} = req.body;
        const doctor = await Doctor.findByIdAndUpdate(doctorId, {
            status,
        });

        console.log(doctor);

        const user = await User.findOne({_id: doctor.userId});

        console.log(user);

        const unseenNotifications = user.unseenNotifications;
        unseenNotifications.push({
            type: "new-doctor-request-changed",
            message: `Your doctor account has been ${status}`,
            onClickPath: "/notifications",
        })
        user.isDoctor = status === "approved" ? true : false;
        await user.save();

        res.status(200).send({
            message: "Doctor status updated successfully",
            success: true,
            data: doctor,
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            message: "Error applying doctor account",
            success: false,
            error,
        });
    }
});

module.exports = router;