import { useEffect, useState } from "react";

import useWeather from "./hooks/useWeather";
import useLocation from './hooks/useLocation'
import ConditionsContext, { conditionsContextValue, PrecipContext, precipDefaultValue } from "./context/context";
import { mainWeatherContext } from './context/mainWeatherContext'

import Modal from "./UI/Modal";
import Today from "./components/Today";
import Mainlayout from "./UI/MainLayout";
import DaysList from "./components/DaysList";

function App() {
  const { geoData, weather, currentWeather, setCurrentWeather, isLoading, fetch_weather, fetchedFromCurrentLocation, showModal, setShowModal } = useWeather()
  const { location, getLocation } = useLocation()

  // Get the location from the browser on first render.
  useEffect(() => {
    getLocation()
  }, [getLocation])

  // If the location is enabled, fetch weather for this location.
  useEffect(() => {
    if (location) {
      fetch_weather({ location: location })
    }
  }, [fetch_weather, location])

  return <>
    <mainWeatherContext.Provider value={ {
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
