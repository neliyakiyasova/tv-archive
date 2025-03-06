import React, { useState, useEffect } from "react";
import axios from "axios";
import VideoPlayer from "./VideoPlayer";

const App = () => {
  const [programs, setPrograms] = useState([]);
  const [search, setSearch] = useState("");

  
  useEffect(() => {
    axios.get("http://localhost:3001/programs")
      .then(response => {
        console.log(response.data);  
        setPrograms(response.data);
      })
      .catch(error => console.error("Ошибка загрузки программ:", error));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Verdana" }}>
      <h1 className="h1style">ТВ-Архив</h1>
      <div className="search">
        <input className="search1"
          type="text"
          placeholder="Поиск по названию..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "10px", marginBottom: "20px" }}
        />
      </div>
    
      <div className="program-list">
        {programs.map((program, index) => (
          <div key={index} className="video-card">
            <h3>{program.title}</h3>
            <p>{program.description}</p>
            

            {program.link && <VideoPlayer link={program.link} title={program.title} />}
          
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
