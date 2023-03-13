import React from "react";
import "../styles/gym.scss";
import GymItem from "../components/GymItem";
import { useState } from "react";
import { useContext } from "react";
import { playerContext } from "../context/playerContext";

const Gym = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const { exercises } = useContext(playerContext);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="gym_container">
      <div className="gym_header">
        <h1>Gym</h1>
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="...">...</option>
          <option value="Strength">Strength</option>
          <option value="Stamina">Stamina</option>
        </select>
      </div>
      <div className="lista">
        {exercises.map((ex) => {
          if (ex.category === selectedOption)
            return (
              <GymItem
                name={ex.name}
                reps={ex.reps}
                type={ex.type}
                category={ex.category}
                kilograms={ex.kilograms}
                duration={ex.duration}
              />
            );
        })}
      </div>
    </div>
  );
};

export default Gym;
