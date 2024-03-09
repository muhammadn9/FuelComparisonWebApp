import React, { useState } from "react";

function LocationInput({ onLocationChange }) {
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLocationChange = async (event) => {
    setErrorMessage(null); // Clear any previous error message

    if (!navigator.geolocation) {
      setErrorMessage("Geolocation is not supported by your browser.");
      return;
    }

    try {
      const position = await navigator.geolocation.getCurrentPosition(
        (position) => {
          onLocationChange({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setErrorMessage(error.message);
        }
      );
    } catch (error) {
      console.error("Error getting user location:", error);
      setErrorMessage("An error occurred while fetching your location.");
    }
  };

  return (
    <div className="location-input">
      <h2>Get Gas Prices Near You</h2>
      <button onClick={handleLocationChange}>Use My Location</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default LocationInput;
