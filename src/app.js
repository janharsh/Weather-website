const path = require ('path')
const express = require ('express')
const request = require('request')
const hbs = require('hbs')
const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')

const app = express()
const viewsDirctory = path.join(__dirname,'../templetes/views')
const publicDirectoryPath = path.join(__dirname,'../public')
const partialDirectory = path.join(__dirname,'../templetes/partials')

app.set('view engine','hbs')
app.set('views',viewsDirctory)



app.use(express.static(publicDirectoryPath))

hbs.registerPartials(partialDirectory)


app.get('/',(req, res) => {

   res.render('index',{
       title : 'Weather',
       name : 'Andrew'


   })
})

app.get('/about',(req, res) => {

    res.render('about',{

        title : 'About',
        name : 'Andrew'
    })


})

app.get('/help',(req, res) => {

    res.render('help',{
        title : 'help',
        name : 'Andrew'
    })
})


app.get('/weather', (req, res) => {

    

    if(!req.query.address){

        res.send({

            error:'Please provide address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude, location} = {}) => {
        if (error)  {

            return res.send({error})
        }
        
        forecast(latitude,longitude,(error,forecastData) => {


            if (error) {

                return res.send({
                    error
                })
            }
            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })


    })
   
})

app.get('/help/*', (req, res) =>{
    res.render('404',{
        title : '404 not found',
        name : 'Andrew',
        errorMessage : 'Help page not found'
    })
})

app.get('*', (req, res) => {

    res.render('404',{

        title: 'Page not found',
        name : 'Andrew',
        errorMessage : 'Page not found'
    })
})

app.listen(3000,() => {

    console.log('Listening on port 3000')

})