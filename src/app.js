
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



//console.log(path.join(__dirname, '../public'))
//console.log(__filename)

const app = express()

//Define path for express config
const publicDrPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, "../templates/partials")

//Setup handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDrPath))


app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Innocent Kidubo '
    })
})

app.get('/about',(req, res)=>{
    res.render('about', {
        title:'About Me ',
        name: 'Innocent Kidubo'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        msg: 'You may need some Help!',
        title: 'Help',
        name: 'Innocent Kidubo'
    })
})


app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "You should provide the address !!"
        })
    }

    geocode(req.queryaddress, (error, {latitude, longitude, location}={}) => {
        if(error){
            return res.send({ error })
        }
        
    
        forecast( latitude, longitude, (error,forecastData)=>{
            if(error){
               return res.send({ error })
            }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })

        })
    })


     

})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Innocent Kidubo',
        errorMessage:'Help article not found'
    })

})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: "Innocent Kidubo",
        errorMessage: "Page not found."
    })

})



app.listen(5000, ()=>{
    console.log('server is up and runing!')
}) 