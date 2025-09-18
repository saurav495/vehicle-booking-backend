import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    "name" : { 
        type: String,
        required: true 
    },
    "type" : { 
        type: String,
        required: true 
    },
    "capacity" : { 
        type: Number,
        required: true 
    },
    "rentalPricePerDay" : { 
        type: Number,
        required: true 
    },
    "tyers" : { 
        type: String,
        required: true 
    },
    "imageUrl" : { 
        type: String 
    },
    "availabilityStatus" : { 
        type: Boolean,
        default: true 
    },
    "createdAt": {
        type: Date,
        default: Date.now,
    },
    "updatedAt": {
        type: Date,
        default: Date.now,
    }

})

export default mongoose.model('Vehicle', vehicleSchema);