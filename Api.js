import appid from "./apikey";
import axios from "axios";

const checkForSnow = async ({ coords: { latitude, longitude } }) => {
  const {
    data: {
      weather: [{ main }]
    }
  } = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
    params: { lat: latitude, lon: longitude, appid }
  });
  return main === "Snow";
};

export default checkForSnow
