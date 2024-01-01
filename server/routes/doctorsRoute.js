const express = require('express');
const router = express.Router();
const Doctor = require("../models/doctorModel");
const authMiddleware = require("../middlewares/authMiddleware");
const Appointment = require('../models/appointmentModel');
const User = require('../models/userModel');

router.get("/get-doctor-info-by-user-id/:userId", authMiddleware, async(req, res) => {

    try{
        console.log(req.params.userId);
        const doctor = await Doctor.findOne({userId: req.params.userId});
        console.log(doctor);
        res.status(200).send({
            success: true,
            message: "Doctor info fetched successfully",
            data: doctor,
        })
        
    }catch (error){
        res
        .status(500)
        .send({message: "Error getting doctor info", success: false, error});
    }
});

router.post("/get-doctor-info-by-id", authMiddleware, async(req, res) => {
    try{
        console.log(_id);
        const doctor = await Doctor.findOne({_id: req.body.doctorId});

        console.log(doctor.firstName);
        console.log(doctor.lastName);

        res.status(200).send({
            success: true,
            message: "Doctor info fetched successfully",
            data: doctor,
        })
        
    }catch (error){
        res
        .status(500)
        .send({message: "Error getting doctor info", success: false, error});
    }
});

router.post('/update-doctor-profile', authMiddleware, async(req, res) => {

    try{
        const doctor = await Doctor.findOneAndUpdate({userId: req.body.userId}, req.body);

        console.log(doctor);

        res.status(200).send({
            success: true,
            message: "Doctor profile updated successfully",
            data: doctor,
        })
    }catch (error){
        return res
        .status(500)
        .send({message: "Error getting doctor info", sucess: false, error});
    }
});

router.get("/get-appointments-by-doctor-id", authMiddleware, async(req, res) => {
    try{
        const doctor = await Doctor.findOne({userId: req.body.userId});
        console.log(doctor);
        const appointments = await Appointment.find({doctorId: doctor._id});
        res.status(200).send({
            message: "Appointments fetched successfully",
            success: true,
            data: appointments,
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            message: "Error getting appointments",
            success: false,
            error,
        });
    }
});

router.post("/change-appointment-status", authMiddleware, async(req, res) => {
    try{
        const {appointmentId, status} = req.body;
        const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
            status,
        });

        const user = await User.findOne({_id: appointment.userId});

        console.log(user);

        const unseenNotifications = user.unseenNotifications;
        unseenNotifications.push({
            type: "Appointment-status-changed",
            message: `Appointment status has been ${status}`,
            onClickPath: "/appointments",
        })
        await user.save();

        console.log(unseenNotifications);

        res.status(200).send({
            message: "Appointment status changed successfully",
            success: true,
            data: appointment,
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            message: "Error changing appointment status",
            success: false,
            error,
        });
    }
});

module.exports = router;