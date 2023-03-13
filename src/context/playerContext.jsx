import React, { useState } from "react";
import { createContext } from "react";

export const playerContext = createContext();

export default function PlayerContextProvider({ children }) {
  const [healthLevel, setHealthLevel] = useState(100);
  const [strengthBarLevel, setStrengthBarLevel] = useState(5);
  const [staminaBarLevel, setStaminaBarLevel] = useState(5);
  const [strengthLevel, setStrengthLevel] = useState(1);
  const [staminaLevel, setStaminaLevel] = useState(1);
  const [benchpress, setBenchPress] = useState(0);
  const [level, setLevel] = useState(1);
  const [squat, setSquat] = useState(0);
  const [deadlift, setDeadlift] = useState(0);

  const exercises = [
    {
      name: "Bench Press",
      reps: ["", 1, 2, 3, 4, 5],
      kilograms: ["", 20, 30, 40, 50],
      category: "Strength",
      type: "reps",
    },
    {
      name: "Squats",
      reps: ["", 1, 2, 3, 4, 5],
      kilograms: ["", 30, 40, 50, 60, 70, 80, 90, 100],
      category: "Strength",
      type: "reps",
    },
    {
      name: "Deadlift",
      reps: ["", 1, 2, 3, 4, 5],
      kilograms: ["", 30, 40, 50, 60, 70, 80, 90, 100],
      category: "Strength",
      type: "reps",
    },
    {
      name: "Cardio",
      duration: ["", 5, 10, 20, 30, 60],
      category: "Stamina",
      type: "min",
    },
  ];

  return (
    <playerContext.Provider
      value={{
        healthLevel,
        setHealthLevel,
        staminaBarLevel,
        setStaminaBarLevel,
        strengthBarLevel,
        setStrengthBarLevel,
        exercises,
        strengthLevel,
        setStrengthLevel,
        staminaLevel,
        setStaminaLevel,
        benchpress,
        setBenchPress,
        squat,
        setSquat,
        deadlift,
        setDeadlift,
        level,
        setLevel,
      }}
    >
      {children}
    </playerContext.Provider>
  );
}
