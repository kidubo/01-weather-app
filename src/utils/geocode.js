const request = require('request')


const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiaW5ub2NlbnRrZGIiLCJhIjoiY2thNGw2aDZ4MDFiOTNybnVxMnZ1dmJuNCJ9.5GxUtKZjQZAs-OzI_sthYg'

    request({url, json: true},(error, {body}) => {
        if(error){
            callback('can not connect to the network!')
        }else if(body.features.length===0){
            callback('Can not find the location ,please try another search')
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports = geocode

