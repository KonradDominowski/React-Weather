import { useEffect } from "react";

import useWeather from "./hooks/useWeather";
import useLocation from './hooks/useLocation'
import { PrecipContext, precipDefaultValue } from "./context/precipContext";
import { WeatherContext } from './context/weatherContext'

import Modal from "./UI/Modal";
import Today from "./components/Today";
import Mainlayout from "./UI/MainLayout";
import DaysList from "./components/DaysList";
import { SocialMediaContext, SocialMediaDefaultValue } from "./context/socialMediaContext";

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

  return <>
    <WeatherContext.Provider value={ weatherContextValue } >
      <PrecipContext.Provider value={ precipDefaultValue }>
        <SocialMediaContext.Provider value={ SocialMediaDefaultValue }>

          {/* If the location is not fetched, or weather fetch failed, display the modal */ }
          { !weather && <Modal /> }

          {/* If weather is fetched successfully, display the page */ }
          <Mainlayout>
            { weather && <DaysList /> }
            { weather && <Today /> }
          </Mainlayout>

        </SocialMediaContext.Provider>
      </PrecipContext.Provider>
    </WeatherContext.Provider>
  </>
}

export default App;
