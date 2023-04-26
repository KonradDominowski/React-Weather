import { useEffect, useState } from "react";

import useWeather from "./hooks/useWeather";
import { dummy_weather } from "./media/dummy_weather";
import ConditionsContext, { conditionsContextValue, PrecipContext, precipDefaultValue } from "./context/context";

import Modal from "./UI/Modal";
import Today from "./components/WeatherDetails";
import Mainlayout from "./UI/MainLayout";
import DaysList from "./components/DaysList";




function App() {
  const { notLocation, geoData, weather, isLoading, fetch_weather } = useWeather()
  const [location, setLocation] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position)
      setLocation(position)
    })
  }, [])

  useEffect(() => {
    console.log('efekt run')
    if (location) {
      console.log('run fetch')
      fetch_weather({ location: location })
    }
  }, [fetch_weather, location])

  return <>
    <PrecipContext.Provider value={ precipDefaultValue }>
      <ConditionsContext.Provider value={ conditionsContextValue }>
        { (isLoading) && <Modal /> }
        { !weather && <Modal location={ location } setLocation={ setLocation } fetch_weather={ fetch_weather } /> }
        <Mainlayout>
          <DaysList days={ dummy_weather.days } />
          { weather && <Today weather={ weather.days.at(1) } geoData={ geoData } notLocation={ notLocation } /> }
        </Mainlayout>
      </ConditionsContext.Provider>
    </PrecipContext.Provider>
  </>
}

export default App;
