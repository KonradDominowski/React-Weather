import { useEffect, useState } from "react";

import useWeather from "./hooks/useWeather";
import ConditionsContext, { conditionsContextValue, PrecipContext, precipDefaultValue } from "./context/context";
import { mainWeatherContext } from './context/mainWeatherContext'

import Modal from "./UI/Modal";
import Today from "./components/WeatherDetails";
import Mainlayout from "./UI/MainLayout";
import DaysList from "./components/DaysList";

function App() {
  const { geoData, weather, currentWeather, setCurrentWeather, isLoading, fetch_weather } = useWeather()
  const [location, setLocation] = useState(null)

  // Get the location from the browser on first render.
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
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
    <mainWeatherContext.Provider value={ {
      currentWeather: currentWeather,
      setCurrentWeather: setCurrentWeather,
      setLocation: setLocation,
      fetch_weather: fetch_weather,
      isLoading: isLoading,
      weather: weather,
      geoData: geoData,
    } } >
      <PrecipContext.Provider value={ precipDefaultValue }>
        <ConditionsContext.Provider value={ conditionsContextValue }>
          {/* If the location is not fetched, or weather fetch failed, display the modal */ }
          { !weather && <Modal /> }

          {/* If weather is fetched successfully, display the page */ }
          <Mainlayout>
            { weather && <DaysList /> }
            { weather && <Today /> }
          </Mainlayout>
        </ConditionsContext.Provider>
      </PrecipContext.Provider>
    </mainWeatherContext.Provider>
  </>
}

export default App;
