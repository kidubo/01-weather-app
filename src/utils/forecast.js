const request = require('request')

const forecast = (latitude,longitude,callback) =>{
    const url = 'https://api.darksky.net/forecast/09c8626cc46c235c7e479c2cbfc65d93/' + latitude + ',' + longitude

request({url, json:true}, (error,{body}={})=>{
    if(error){
        callback('Unable to connect to weather service!',undefined)

    }else if(body.error){
        callback('Unable to find location', undefined)

    }else{
        
        callback(undefined,
            body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + 'degrees out, There is ' + body.currently.precipProbability + '%chance of rain.')
    }
})
}

module.exports = forecast
