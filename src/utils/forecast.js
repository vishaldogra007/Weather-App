const request = require("request")


const forecast = (latitude , longitude , callback)=>{
const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + encodeURIComponent(latitude) +'&lon=' +encodeURIComponent(longitude) + '&appid=8548dca0f69550bc19bebbb3e243fba6&units = m'
request({  url, json: true }, (error, {body}) => {
    if (error) {
        callback("unable to connect" , undefined)
    } else if (body.error) {
        callback("Unable to find the location" , undefined)
    }
    else {
        const weather = body.main
        const temp = (weather.temp -273).toFixed(2)

        const humidity = weather.humidity
        const desc = body.weather[0].description
        callback(undefined,{
             temp,
             desc
        })
        // console.log(desc + ". It is currently " + temp.toFixed(2) + " degrees out. And Humidity is " + humidity)
        // callback(undefined , desc + ". It is currently " + temp.toFixed(2) + " degrees out. And Humidity is " + humidity)
    }
})
}
module.exports = {forecast}