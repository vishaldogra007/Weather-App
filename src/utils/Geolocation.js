

const { Module } = require("module")
const request = require("request")
const util = require('util')

const coordinates = (location , callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(location) + ".json?access_token=pk.eyJ1IjoidmlzaGFsZG9ncmEiLCJhIjoiY2ttbjZzajE1MXMwcTJwcW9uNmw1NHk2aiJ9.VfdFRFaUqYKsO5vaw9tWOA&limit=1"
    request({  url, json: true },  function  (error, {body})  {
        // console.log(util.inspect(res.body , {depth : null}))
        if (error) {
            callback("Unbale to connect to services" , undefined)
        }
        else if ((body.features).length === 0) {
            callback( "LOcation not found" , undefined)
        } else {
           const loc = body.features[0].place_name
           const longitude = body.features[0].geometry.coordinates[0]
           const latitude = body.features[0].geometry.coordinates[1]
            
            callback(undefined , {
                loc,
                latitude,
                longitude
            })
           
           
        }
    })
   
}



module.exports = { coordinates }