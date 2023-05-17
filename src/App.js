import { useEffect, useState } from "react";

import useWeather from "./hooks/useWeather";
import useLocation from './hooks/useLocation'
import { PrecipContext, precipDefaultValue } from "./context/precipContext";
import { WeatherContext } from './context/weatherContext'


import Modal from "./UI/Modal";
import Today from "./components/Today";
import Mainlayout from "./UI/MainLayout";
import DaysList from "./components/DaysList";
import { SocialMediaContext, SocialMediaDefaultValue } from "./context/socialMediaContext";
import { UnitsContext } from "./context/unitsContext";


function App() {
  const { geoData, weather, currentWeather, setCurrentWeather, isLoading, fetch_weather, fetchedFromCurrentLocation, showModal, setShowModal } = useWeather()
  const { location, getLocation } = useLocation()
  const [metricUnits, setMetricUnits] = useState(true)

  // Get the location from the browser on first render.
  useEffect(() => {
    getLocation()
  }, [getLocation])

  // If the location is enabled, fetch weather for this location. 
  // Also, whenever location changes, for example after clicking on locate button in the Navbar.
  useEffect(() => {
    if (location) {
      fetch_weather({ location: location })
    }
  }, [fetch_weather, location])

  const weatherContextValue = {
    weather: weather,
    currentWeather: currentWeather,
    setCurrentWeather: setCurrentWeather,
    location: location,
    getLocation: getLocation,
    geoData: geoData,
    fetch_weather: fetch_weather,
    fetchedFromCurrentLocation: fetchedFromCurrentLocation,
    isLoading: isLoading,
    showModal: showModal,
    setShowModal: setShowModal
  };

  const unitsContextValue = {
    metricUnits,
    setMetricUnits,
    displayTemp: (temp) => {
      if (metricUnits) {
        return <>{ temp } <span>°C</span></>
      } else {
        return <>{ Number(((temp * 1.8) + 32).toFixed(1)) } <span> F</span></>
      }
    },
    displayWindSpeed: (speed) => {
      if (metricUnits) {
        return speed + ' km/h'
      } else {
        return Number((speed / 1.60934).toFixed(1)) + ' mph'
      }
    }
  }

  return <>
    <WeatherContext.Provider value={ weatherContextValue } >
      <PrecipContext.Provider value={ precipDefaultValue }>
        <SocialMediaContext.Provider value={ SocialMediaDefaultValue }>
          <UnitsContext.Provider value={ unitsContextValue }>


            {/* If the location is not fetched, or weather fetch failed, display the modal */ }
            { !weather && <Modal /> }

            {/* If weather is fetched successfully, display the page */ }
            <Mainlayout>
              { weather && <DaysList /> }
              { weather && <Today /> }
            </Mainlayout>

          </UnitsContext.Provider>
        </SocialMediaContext.Provider>
      </PrecipContext.Provider>
    </WeatherContext.Provider>
  </>
}

export default App;
