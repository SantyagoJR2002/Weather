import {useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'

function App() {

const [lonLat, setLonLat] = useState({})
const [weather, setWeather] = useState()
useEffect(() => {

  const success = position =>{
console.log(position.coords)
const lat = position.coords.latitude 
const lon = position.coords.longitude 
setLonLat({lat, lon})
  }

  navigator.geolocation.getCurrentPosition(success)
  },[])
  useEffect(() => {
    if(lonLat.lat !== undefined){
      const apiKey = '54f9f152a144f5abba86a545e7cd5d8f'
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lonLat.lat}&lon=${lonLat.lon}&appid=${apiKey}`

      axios.get(url)
      .then(res =>{
        setWeather(res.data)
        setCelsius(res.data.main.temp - 273.15)
      })
      .catch(err=>console.log(err))
    }
  }, [lonLat])
  console.log(weather?.name)
  console.log(weather?.sys.country)
 
  const [celsius, setCelsius]=useState()
  const [FC, setFC] = useState('C')
const fToCelsius = ()=>{
 

  if (FC=="C"){
    setCelsius(celsius*(9/5)+32)
    setFC('F')
  }else{
    setCelsius((celsius-32)*(5/9))
    setFC('C')
  }

}
 
  return (
    
    <div className={`App ${weather?.name}`}>
     <current>
       <div className='container'>
     <h2>Weather Calculator</h2>
     <br/>
  <city>
    <coord lon="-122.09" lat="37.39" />
    <country>City: 🏢{`${weather?.name}`}({`${weather?.sys.country}`})</country>
    <timezone>{`${weather?.timezone}`}</timezone>

  </city>
  <temperature value="278.07" min="273.15" max="282.59" unit="kelvin" />
  <p>Temperature: 🌡️{Math.round(celsius)}°{FC}</p>
  <p>Humidity: 🌊{`${weather?.main.humidity}`}%</p>
  <p>{weather?.weather[0].description}</p>
  </div>
  <div className='container'>
  <img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
  <br/>
  <button className="cf-fc"onClick={fToCelsius}>C°/F° - F°/C°</button>
  </div>
  
  </current>
    </div>
  )
}

export default App
