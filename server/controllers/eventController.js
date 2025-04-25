const {Event} = require("../models/event");
const {errorHandler} = require("./helpers/errorHandler");
const {User} = require("../models/users");
const { default: mongoose } = require("mongoose");

class eventController{
    async getAllEvents(request, response){
        try{
            const events = await Event.find().populate("players").populate("creater");
            response.status(200).json(events);

        }catch(error){
            console.log("failed to fetch all events");
            errorHandler(request, response, error);
        }
    }
    async getEvent(request, response){
        try{
            const eventId = request.params.eventId;
            const event = await Event.findById(eventId);
            if(!event){
                response.status(404).send("Match Not Found");
            }
            return response.status(200).json(event);

        }catch(error){
            errorHandler(request, response, error);
        }
    }
    async createEvent(request, response){
        try{
            console.log("Event attempting to create is: ", request.body);
            var  neededPlayers = null;
            if(request.body.private){
                neededPlayers = request.body.players;
            }
            const createrId = request.body.userId;
            const user = await User.findById(createrId);
            if(!user){
                return response.status(404).send("User Not found");
            }
            // i need to parse the object back to an object for the geolocation
            const objLocation = JSON.parse(request.body.geolocation);
            console.log(objLocation);
            const newEvent = Event({
                creater: createrId,
                sport_name: request.body.sportName,
                location: request.body.location,
                geolocation:objLocation,
                time: request.body.time,
                date: new Date(request.body.date),
                players: [createrId],
                matches: [],
                private: request.body.private,
                players_needed: neededPlayers 
            });
            await newEvent.save();
            return response.status(201).send('Created');
        }catch(error){
            errorHandler(request, response, error);
        }
    }
    async removeEvent(request, response){
        try{
            if(!mongoose.Types.ObjectId.isValid(request.params.eventId) || !mongoose.Types.ObjectId.isValid(request.body.userId)){
                return response.status(400).send(" Not a Vailid UserId or EventId Format");
            }
            const event = await Event.findById(request.params.eventId);
            if(!event){
                return response.status(404).send("Event Not Found");
            }
            const userId = request.body.userId;
            if(userId != event.creater){
                return response.status(401).send("Not Authorized to Delete this Event")
            }
            for (const player of event.players) {
                await User.findByIdAndUpdate(player._id, { $pull: { attending_Events: event._id } }, { new: true });
            }
            await Event.findByIdAndDelete(event._id);
            return response.status(200).send("Event Removed");
        }catch(error){
            errorHandler(request, response, error);
        }
    }
}

module.exports = new eventController();