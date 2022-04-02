


const form = document.querySelector('form')
const input = document.querySelector('input')
const forecast = document.querySelector('.forecast')
const loc = document.querySelector('.location')

form.addEventListener('submit' , (e)=>{
    e.preventDefault()
  
   const location = input.value
    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            forecast.innerHTML = data.error
        }else{
        //    loc.innerHTML = location
           forecast.innerHTML = data.forecast

        }
    })
})
   
})