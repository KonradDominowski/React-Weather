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

  // Get the location from the browser on first render.
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position)
      setLocation(position)
    })
  }, [])

  // If the location is enabled, fetch weather for this location.
  useEffect(() => {
    if (location) {
      fetch_weather({ location: location })
    }
  }, [fetch_weather, location])

  return <>
    <PrecipContext.Provider value={ precipDefaultValue }>
      <ConditionsContext.Provider value={ conditionsContextValue }>
        {/* If the location is not fetched, or weather fetch failed, display the modal */ }
        { !weather && <Modal
          setLocation={ setLocation }
          fetch_weather={ fetch_weather }
          isLoading={ isLoading }
        /> }

        {/* If weacher is fetched successfully, display the page */ }
        <Mainlayout>
          <DaysList days={ dummy_weather.days } />
          { weather && <Today weather={ weather.currentConditions } geoData={ geoData } notLocation={ notLocation } fetch_weather={ fetch_weather } /> }
        </Mainlayout>
      </ConditionsContext.Provider>
    </PrecipContext.Provider>
  </>
}

export default App;
