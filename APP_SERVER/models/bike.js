var mongoose = require('mongoose');

var bikeSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        minlength: 3
    },
    
    description:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    seats:{
        type:Number,
        required:true
    },
    launchYear:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        default:0,
    }
});


mongoose.model('Bike', bikeSchema);