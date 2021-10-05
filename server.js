const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.urlencoded({extended:true}))

const dbHelper = require('./db.js')

dbHelper.dbInit()

//Schema Definition
const RestaurantSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    avgRating: {
        type: Number,
        default: 0
    },
    contactNumber: {
        type: String,
        required: true
    },
    cuisine: String, //change to Enum later,

})

//creating Model
const RestaurantModel = mongoose.model('Restaurant', RestaurantSchema) //restarauntss

//Get All  restaurant
app.get(`/restaurants`, async (req,res)=>{
    try {
        
        const insertedData  = await RestaurantModel.find({})
        res.send(insertedData)

    } catch (error) {
        res.send({
            error: true,
            errorObj: error
        })
    }

})


//Get Specific  restaurant
app.get(`/restaurants/:uniqueId`, async (req,res)=>{
    try {
        
        const restaurant  = await RestaurantModel.findById(req.params.uniqueId)
        res.send(restaurant)

    } catch (error) {
        res.send({
            error: true,
            errorObj: error
        })
    }

})

//Create  restaurant
app.post(`/restaurants`,async(req,res)=>{
    try {
        
        const data = req.body

        const insertedData  = await RestaurantModel.create(data)
        res.send(insertedData)

    } catch (error) {
        res.send({
            error: true,
            errorObj: error
        })
    }

})

// update restaurant
app.put('/restaurants/:uniqueID',async (req,res)=>{
    try{
        const data = req.body
        const updatedData = await RestaurantModel.findByIdAndUpdate(req.params.uniqueID, data)
        res.send(updatedData)
    }
    catch(err){
        res.send({
            error:true,
            errorObj:err
        })
    }
})


// Delete restaurant
app.delete('/restaurants/:uniqueID',async (req,res)=>{
    try{
        
        const deletedData = await RestaurantModel.findByIdAndDelete(req.params.uniqueID)
        res.send(deletedData)
    }
    catch(err){
        res.send({
            error:true,
            errorObj:err
        })
    }
})



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Zomato Lite listening on port ${PORT}!`);
});

//Run app, then load http://localhost:port in a browser to see the output.