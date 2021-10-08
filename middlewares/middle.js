
function logger(req, res, next){ //a,b,c
    // req.body = {
    //     fullName: "Yash",
    //     age: 123
    // }
    console.log('Some Request Came from the client')
    next()
}

function checkLoggedIn(req, res,next){
    console.log('I will write some custom message')
    // console.log(req.customText)
    // next()
    if(req.query.username){
        next()
    }else{
        res.send("You must log in")
    }
}


module.exports = {
    logger,
    checkLoggedIn
}