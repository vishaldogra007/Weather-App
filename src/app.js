const express= require('express')
const path = require('path')
const app= express()
const hbs = require('hbs')
const Geolocation = require('./utils/Geolocation')
const forecast = require('./utils/forecast')

//setup static directory
const publicPath = path.join(__dirname , '../public')
app.use(express.static(publicPath))

//setup handlebars
const viewPath = path.join(__dirname , '../templates/views')
app.set('view engine' ,'hbs')
app.set('views' , viewPath)

//setting partials
const partialPath = path.join(__dirname , '../templates/partials')
hbs.registerPartials(partialPath)

//setting routes


//Weather page
app.get('/about' , (req, res)=>{
    res.render('about' , {
        title : "About",
        name : "vishal"
    })
})

app.get('/help' , (req, res)=>{
    res.render('help' , {
        title : "Help",
        message : "I am here to help",
        name : "vishal"
    })
})

app.get('' , (req , res)=>{
    res.render('index' , {
        title : "Weather-App",
        name : "Vishal "
    })
})
app.get('/weather' , (req , res)=>{
    if(!req.query.address){
        return res.send({
            error : "Please enter the address"
        })
    }
    
    Geolocation.coordinates(req.query.address , (error ,{latitude , longitude}={})=>{
        
     if(error){
         return  res.send({
            error : error
        })
     }else{
         forecast.forecast(latitude , longitude , (error , {temp , desc})=>{
            if(error){
               return res.send({
                    error
                })
            }
            res.send({
                temperature : temp,
                description : desc,
                location : req.query.address,
                forecast : desc + ". It is curretly " + temp + " degree out"

            })
         })
     }
    })

    
    //    res.send({
    //     location : req.query.address , 
    //     forecast : " its 20 degree" ,


    // })
})



app.get('/help/*' , (req ,res)=>{
    res.render('404' , {
        error : "Help article not found",
        name : "vishal"
    })
 })

app.get('*' , (req, res)=>{
    res.render('404' , {
        error : 'No such page found',
        name : "vishal"
    })
})


//POrt to listen app
app.listen(3000 , ()=>{
    console.log("server is running on port 3000")
})