const request = require('request')

const forecast = (latitude,longitude,callback) =>{

    const url = 'https://api.darksky.net/forecast/98b6d0a51e834855137b956cfb39ad81/'+latitude+','+longitude

    request({ url , json : true},(error, {body}) => {
        
        if (error) {

            callback('Unable to connect to weather service.',undefined)

        }else if(body.error){

            callback('Unable to find the location with given cordinates',undefined)
        
        }else{

            callback(undefined,body.daily.data[0].summary +`It is currently ${body.currently.temperature} degree out, There is ${body.currently.precipProbability} % chance of rain. `)

        }

    
    })
}

module.exports = forecast
