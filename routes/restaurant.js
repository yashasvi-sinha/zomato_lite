const Restaurant = require('../models/Restaurant')
const { Router } = require('express')
const jwt = require('jsonwebtoken')

const restaurantRoutes = Router()


function checkJWTToken(req, res, next){
    console.log(`🚀 ~ checkJWTToken ~ req`, req.headers)
    
    try {
        const authTokenDecodedData = jwt.verify(req.headers.token, "This is my secret key")
        console.log(authTokenDecodedData)
        next()
    } catch (err) {
        res.status(401).json({
            error: true,
            errorObj: err,
            message: "Invalid Token",
        })
    }
}

restaurantRoutes.use(checkJWTToken)

//Create  restaurant
restaurantRoutes.post(`/`, async(req,res)=>{
    try {
        
        const data = req.body

        const fileData = req.files.restaurantImage
        console.log('File Received', fileData)

        const fileName = `${fileData.md5}-${fileData.name}`
        
        const filePath = `${__dirname}/public/userUploads${fileName}`
        await fileData.mv(filePath)

        data.imageURL = `userUploads/${fileName}`
        
        console.log("data", data)

        const insertedData  = await Restaurant.create(data)
        
        res.send(insertedData)

    } catch (error) {
        res.send({
            error: true,
            errorObj: error
        })
    }

})



//Get All  restaurant
restaurantRoutes.get(`/`, async (req,res)=>{
    try {
        
        const insertedData  = await Restaurant.find({})
        res.send(insertedData)

    } catch (error) {
        res.send({
            error: true,
            errorObj: error
        })
    }

})


//Get Specific  restaurant
restaurantRoutes.get(`/:uniqueId`, async (req,res)=>{
    try {

        const restaurant  = await Restaurant.findById(req.params.uniqueId)    
        res.json(restaurant)

    } catch (error) {
        res.send({
            error: true,
            errorObj: error
        })
    }

})



// update restaurant
restaurantRoutes.put('/:uniqueID', async (req,res)=>{
    try{
        const data = req.body
        const updatedData = await Restaurant.findByIdAndUpdate(req.params.uniqueID, data)
        delete fetchedRestaurants[req.params.uniqueID]
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
restaurantRoutes.delete('/:uniqueID', async (req,res)=>{
    try{
        
        const deletedData = await Restaurant.findByIdAndDelete(req.params.uniqueID)
        res.send(deletedData)
    }
    catch(err){
        res.send({
            error:true,
            errorObj:err
        })
    }
})


module.exports = restaurantRoutes
