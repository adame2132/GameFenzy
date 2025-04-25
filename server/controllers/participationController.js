const {User} = require("../models/users");
const {errorHandler} = require("./helpers/errorHandler");
const mongoose = require("mongoose");
const{Event} = require("../models/event");
const {Participation} = require("../models/participation")

class participationController{
    async getParticipents(req, res){
        console.log("get particpents called");
        try{
            const id = req.params.eventId;
            console.log("event id is : ", id);
            const participents = await Participation.find({event: id}).populate("user");
            console.log("particpents found are : ", participents);
            return res.status(200).json(participents);
        }catch(error){
            errorHandler(req, res, error);
        }
    }
    async removeParticipent(request, response){
        try{
            console.log("params are : ", request.params.userId);
            const user = await User.findById(request.params.userId);
            const event = await Event.findById(request.params.eventId);
            if(!user || !event){
                return response.status(404).send(' Not Found');
            }
            const participation = await Participation.findOneAndDelete({ user: request.params.userId, event: request.params.eventId});
            if(!participation){
                return response.status(404).send("Particpation Not Found");

            }
            return response.status(200).send("Removed Participant");




        }catch(error){
            errorHandler(request, response, error);
        }
    }
    async createParticipent(request, response){
        try{
            console.log("Request body: ", request.body);
            const eventId = request.body.event;
            const userId = request.body.user;
            const event = await Event.findById(eventId);
            const user = await User.findById(userId);
            if(!user || !event){
                return response.status(404).send("Not Found");
            }
            const newParticipant = Participation({
                event: eventId,
                user: userId
            });
            await newParticipant.save();
            return response.status(201).send("created");
        }catch(error){
            errorHandler(request, response, error);
        }
    }
    async getParticpentsEvents(request, response) {
        try {
            const userId = request.params.userId;
            console.log("Fetching events for user ID:", userId);
            const user = await User.findById(userId);
            if (!user) {
                return response.status(404).send("User not found");
            }
            const participations = await Participation.find({ user: userId, checkedIn: false }).populate("event");
    
            console.log("User's participations:", participations);
    
            return response.status(200).json(participations);
        } catch (error) {
            errorHandler(request, response, error);
        }
    }
    async checkIn(request, response){
        try {
            const userId = request.params.userId;
            const eventId = request.params.eventId;
            console.log("id trying to check in is: ", userId, " to event: ", eventId);

            const participation = await Participation.findOne({ user: userId, event: eventId });
    
            if (!participation) {
                return response.status(404).send("Participation not found");
            }
            participation.checkedIn = true;
            await participation.save();
    
            return response.status(200).json(participation);
    
        } catch (error) {
            errorHandler(request, response, error);
        }
    }
    async getParticpentsHistory(request, response) {
        try {
            const today = new Date();
            const userId = request.params.userId;
            console.log("Fetching history for user ID:", userId, "today is:", today);
    
            const user = await User.findById(userId);
            if (!user) {
                return response.status(404).send("User not found");
            }
    
            const participations = await Participation.find({ user: userId, checkedIn: true })
                .populate({
                    path: 'event',
                    match: { date: { $lt: today } }
                });
            const pastParticipations = participations.filter(p => p.event);
    
            console.log("User's past participations:", pastParticipations);
    
            return response.status(200).json(pastParticipations);
        } catch (error) {
            errorHandler(request, response, error);
        }
    }
}
module.exports = new participationController();