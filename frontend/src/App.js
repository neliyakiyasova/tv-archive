import React, { useState, useEffect } from "react";
import axios from "axios";
import VideoPlayer from "./VideoPlayer";
import { FaSearch } from "react-icons/fa";

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

  useEffect(() => {
    if (search.trim() === "") {
      axios.get("http://localhost:3001/programs")  
        .then(response => setPrograms(response.data))
        .catch(error => console.error("Ошибка загрузки программ:", error));
      return;
    }
  
    axios.get(`http://localhost:4000/vector-search?query=${encodeURIComponent(search)}`)
      .then(response => {
        setPrograms(response.data);  
      })
      .catch(err => console.error("Ошибка векторного поиска", err));
  }, [search]);

  const toggleTheme = () => {
    document.body.classList.toggle("dark");
  };
  

  return (
    <div>
      <div className="h1block">
        <h1 className="h1style"><b>TV</b>Поиск<FaSearch /></h1>
        <h2 className="h2style">Лучший сервис для поиска ТВ передач</h2>
      </div>
      
      <div className="search">
        <input className="search1"
          type="text"
          placeholder="Поиск по названию..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
         
        />
        <button className="changeThemeButton" onClick={toggleTheme}>
  🌗      Сменить тему
        </button>
      </div>
      
      <div className="program-list">
        {programs.map((program, index) => (
          <div className="block1video">
            <div key={index} className="video-card">
            <div className="card-left">
              <p><strong>Канал:</strong> {program.channel}</p>
              <p>{program.description}</p>
            </div>
            <div className="card-right">
              <h3>{program.title}</h3>
              {program.link && (
                <>
                  <VideoPlayer link={program.link} title={program.title} />
                  <a
                    href={program.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="watch-button"
                  >
                    ▶ Смотреть
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default App;
