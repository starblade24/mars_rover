import { useState } from "react";

import "./App.css";
import SearchBar from "./components/searchbar";

const API_KEY = "ZVCEMdZy6eL7Rnhyti8ACew8t5fZJ6FqbQUBb1b8";

function App() {
  const [data, setData] = useState(null);
  const [roverName, setRoverName] = useState("curiosity");
  const [roverCamera, setRoverCamera] = useState("fhaz");
  const [photoDate, setPhotoDate] = useState("2015-6-3");

  const handleRoverNameChange = (e) => {
    e.preventDefault();
    setRoverName(e.target.value);
  };

  const handleRoverCameraChange = (e) => {
    e.preventDefault();
    setRoverCamera(e.target.value);
  };

  const handlePhotoDateChange = (e) => {
    e.preventDefault();
    setPhotoDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=1000&api_key=${API_KEY}`;

    if (roverCamera) {
      apiUrl += `&camera=${roverCamera}`;
    }

    if (photoDate) {
      apiUrl += `&earth_date=${photoDate}`;
    }

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  return (
    <div>
      <div className="header">
        <h1>Mars Rovers</h1>
        <p>Welcome to our app!</p>
      </div>
      <div className="form-container">
        <SearchBar
          label={"Rover Name"}
          value={roverName}
          handleChange={handleRoverNameChange}
        />
        <p>Possible Rovers: Curiosity, Opportunity, Spirit</p>
        <SearchBar
          label={"Rover Camera"}
          value={roverCamera}
          handleChange={handleRoverCameraChange}
        />
        <p>
          Rover Cameras: FHAZ, RHAZ, MAST, CHEMCAM, MAHLI, MARDI, NAVCAM,
          PANCAM, MINITES
        </p>
        <SearchBar
          label={"Photo Date"}
          value={photoDate}
          handleChange={handlePhotoDateChange}
        />
        <p>Date must be in YYYY-MM-DD format</p>
        <div className="submit-button-container">
          <button onClick={handleSubmit} className="submit-button">
            Submit
          </button>
        </div>
      </div>

      {data && data.photos && (
        <div className="photos-container">
          <p>{data.photos.length} photos found</p>
          {data.photos.map((photo) => (
            <img
              src={photo.img_src}
              alt="Mars"
              key={photo.id}
              className="photo-image"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;