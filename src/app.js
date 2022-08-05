const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forcast = require('./utils/forecast')

const app = express()
//to run the weather on heroku 
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../template/views')
const partialPath = path.join(__dirname, '../template/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index',{
        title:'Weather app',
        name: 'Monkey D. Luffy'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:'About',
        name:'Monkey D. Luffy'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title:'Help page',
        name:'Monkey D. Luffy',
        helpText:'This is some helpfull text'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.latitude){
        return res.send({
            error:'You must provide latitude and longitude!'
        })
    }
    forcast(req.query.latitude, req.query.longitude, (error, forecastData) => {
        if(error){
            return res.send({error})
        }
            
        res.send({
            forcast: forecastData, 
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a serch term!'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'Monkey D. Luffy',
        errorMessage:'Help article not found!'
    })
})

app.get('/*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'Monkey D. Luffy',
        errorMessage:'Page not found!'
    })
})

//Below line is used to start the application on server
// app.listen(3000, () => {
//     console.log('Server is up on port 3000.')
// })

app.listen(port, () => {
    console.log('Server is up on port '+port)
})

//http://localhost:3000/weather?latitude=12.9716&longitude=-77.5946
//12.9716 -77.5946

//https://shekhar-bhargav-weather-app.herokuapp.com/