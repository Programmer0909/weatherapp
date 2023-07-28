import React, { useEffect, useState } from "react";
import getData from "./apiFetch";
import Card from "./Card";
import Loading from "./Loading";
function App() {
  const [weather, setWeather] = useState(null);
  const [cityName, setCityName] = useState("London");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getData(cityName);
      setWeather(data);
      setLoading(false);
    };
    fetchData();
  }, [cityName]);

  const handleEnterPress = (e) => {
    if (e.keyCode === 13) {
      setCityName(e.currentTarget.value);
    }
  };


  if (loading) {
    return <Loading />; 
  } else if (weather !== null) {
    const weaDesc = weather.weather[0].description;
    const iconUrl =
      "https://openweathermap.org/img/wn/" +
      weather.weather[0].icon +
      "@2x.png";
    const temp = weather.main.feels_like;
    const humidity = weather.main.humidity;
    const pressure = weather.main.pressure;
    const tempMin = weather.main.temp_min;
    const tempMax = weather.main.temp_max;
    const wind = weather.wind.speed;
    const bgImg = weather.weather[0].main;
    let bgImageUrl = "";

    switch (bgImg) {
      case "Clouds":
        bgImageUrl =
          "url('https://upload.wikimedia.org/wikipedia/commons/5/50/Clouds_white_sky.jpg')";
        break;
      case "Clear":
        bgImageUrl = "url('https://wallpaperaccess.com/full/1862305.jpg')";
        break;
      case "Atmosphere":
        bgImageUrl = "url('https://wallpaperaccess.com/full/1862305.jpg')";
        break;
      case "Rain":
        bgImageUrl = "url('https://wallpaperaccess.com/full/164289.jpg')";
        break;
      case "Drizzle":
        bgImageUrl = "url('https://wallpaperaccess.com/full/9350990.jpg')";
        break;
      case "Thunderstorm":
        bgImageUrl =
          "url('https://images.newscientist.com/wp-content/uploads/2019/03/20115708/gettyimages-673747736.jpg')";
        break;
      case "Snow":
        bgImageUrl =
          "url('https://img.freepik.com/premium-photo/beautiful-view-snowfall-ski-slope-surrounded-by-snowy-pine-forest-winter-fairy-tale_332511-706.jpg?w=2000')";
        break;
      default:
        bgImageUrl = "url('https://wallpaperaccess.com/full/1862305.jpg')";
        break;
    }
    console.log(bgImg)
    console.log(bgImageUrl)

    const containerStyle = {
      margin: 0,
      backgroundImage: bgImageUrl,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      width: "100%",
      height: "100vh",
    };

    return (
      <div className="container" style={containerStyle}>
        <div className="main_body">
          <div className="grid_container">
            <div className="box">
              <div className="temp">
                <span style={{ fontSize: "29px", paddingRight: "20px" }}>
                  City Name :
                </span>
                <input
                  style={{ borderRadius: "10px" }}
                  type="text"
                  onKeyDown={handleEnterPress}
                  placeholder="Enter City Name"
                />
              </div>
            </div>
            <div className="middle">
              <div className="boxy">
                <h1>{cityName}</h1>
                <img src={iconUrl} className="icon" alt="Weather Icon" />
                <p className="temp">{temp} °C</p>
                <p> {weaDesc}</p>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="card1">
              <Card name="temp_max" item={tempMax} unit="°C" />
            </div>
            <div className="card2">
              <Card name="temp_min" item={tempMin} unit="°C" />
            </div>
            <div className="card3">
              <Card name="temp" item={temp} unit="°C" />
            </div>
            <div className="card4">
              <Card name="wind" item={wind} unit="m/s" />
            </div>
            <div className="card5">
              <Card name="humidity" item={humidity} unit="%" />
            </div>
            <div className="card6">
              <Card name="pressure" item={pressure} unit="hPa" />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default App;
