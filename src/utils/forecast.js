const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=433804f553be7699fff57532f02e7686&query='+latitude + ',' + longitude 
    // request({url: url, json:true}, (error, response) => {
    //     if(error){
    //         callback("Unable to connect to server", undefined)
    //     }else if(response.body.error){
    //         callback("Unable to find location", undefined)
    //     }else{
    //         callback(undefined,'Temperature is '+response.body.current.temperature+' degree Celcius, and Chances of rain are ' + response.body.current.precip+"%")
    //     }
    // })


    //Destructuring way
    request({url, json:true}, (error, { body }) => {
        if(error){
            callback("Unable to connect to server", undefined)
        }else if(body.error){
            callback("Unable to find location", undefined)
        }else{
            callback(undefined,'Temperature is '+body.current.temperature+' degree Celcius, Humidity is '+body.current.humidity+' and Chances of rain are ' + body.current.precip+"%")
        }
    })
}

module.exports = forecast