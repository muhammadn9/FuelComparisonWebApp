import React, { useState, useEffect } from "react";
import LocationInput from "./LocationInput";
import GasMap from "./GasMap";
import axios from "axios";

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [gasStations, setGasStations] = useState([]);

  useEffect(() => {
    if (userLocation) {
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
      const gasStationSearchUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=<span class="math-inline">\{userLocation\.lat\},</span>{userLocation.lng}&radius=5000&type=gas_station&key=${apiKey}`;

      axios
        .get(gasStationSearchUrl)
        .then((response) => {
          const stations = response.data.results.map((station) => ({
            id: station.id,
            name: station.name,
            vicinity: station.vicinity,
            location: {
              lat: station.geometry.location.lat,
              lng: station.geometry.location.lng,
            },
            // Placeholder for gas price (replace with actual API call)
            price: Math.random() * (5.0 - 3.0) + 3.0, // Generate random price between $3.00 and $5.00
          }));
          setGasStations(stations);
        })
        .catch((error) => {
          console.error("Error fetching gas stations:", error);
        });
    }
  }, [userLocation]);

  return (
    <div className="App">
      <LocationInput onLocationChange={setUserLocation} />
      {userLocation && (
        <GasMap userLocation={userLocation} gasStations={gasStations} />
      )}
    </div>
  );
}

export default App;
