const express = require('express');
const app = express();
const { checkLoggedIn, logger } = require('./middlewares/middle.js')
const morgan = require('morgan')
const expSession = require('express-session')
const fileUploadMiddleware = require('express-fileupload')

app.use(express.urlencoded({extended:true}))
app.use(fileUploadMiddleware())
app.use(morgan('dev'))


app.use(express.static('public')) 
app.use(express.static('views'))

const dbHelper = require('./db.js')
const Restaurant = require('./models/Restaurant.js')


dbHelper.dbInit()

const oneDay = 1000 * 60 * 60 * 24;

const myRegister = new expSession.MemoryStore()

app.use(expSession({
    secret: "alkjsdlakjsdlnl1k2j3lknlzkxcjalskdj",
    saveUninitialized: true,
    resave: false,
    store: myRegister,
    name: "zomato_lite",
    cookie: { maxAge: oneDay }
}))




app.post('/login', (req, res) => {
    console.log("app.post ~ req.body", req.body)
    const { emailId, pass } = req.body
    console.log(req.session)

    //
    

    if (isUserExist.length === 1) {
        req.session.user = emailId
        req.session.loggedIn = true
        console.log(req.session)
        res.redirect('/restaurants')
    }else{
        res.redirect('/login')
    }
})





app.get('/', logger, (req, res) => {
    res.sendFile(`${__dirname}/restaurantForm.html`)
})

//Create  restaurant
app.post(`/restaurants`, checkAuth, async(req,res)=>{
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


function checkAuth(req, res, next){

    console.log("Store/Register", myRegister)
    if(req.session.user && req.session.loggedIn === true){
        next()
    }else{
        res.redirect('/login')
    }

}

//Get All  restaurant
app.get(`/restaurants`, checkAuth, async (req,res)=>{
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
app.get(`/restaurants/:uniqueId`, checkAuth, async (req,res)=>{
    try {
        
        const restaurant  = await Restaurant.findById(req.params.uniqueId)
        res.send(restaurant)

    } catch (error) {
        res.send({
            error: true,
            errorObj: error
        })
    }

})



// update restaurant
app.put('/restaurants/:uniqueID',checkAuth, async (req,res)=>{
    try{
        const data = req.body
        const updatedData = await Restaurant.findByIdAndUpdate(req.params.uniqueID, data)
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
app.delete('/restaurants/:uniqueID', checkAuth, async (req,res)=>{
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



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Zomato Lite listening on port ${PORT}!`);
});

//Run app, then load http://localhost:port in a browser to see the output.