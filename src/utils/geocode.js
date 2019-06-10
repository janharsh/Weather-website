const request = require('request')

const geocode = (address,callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoid2VhdGhlcmFwcG5vZGUiLCJhIjoiY2p3ODM0aTFjMXJwcDQwbzNhNXEydmQ2ZyJ9.XwuIIfKWsHlIQLTg2W3FPw&limit=1'

        request({url , json : true},(error, {body}) => {


            if (error) {
                callback('Unable to get location info from API !',undefined)
            }else if (body.features.length === 0){
                callback('No cordinates found for the given location',undefined)

            }
        
            else{
                callback(undefined,{
                    latitude : body.features[0].center[1],
                    longitude : body.features[0].center[0],
                    location : body.features[0].place_name

                })
            } 

    })
}

module.exports=geocode