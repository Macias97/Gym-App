import React, { useContext, useEffect, useState } from "react";
import "../styles/gymItem.scss";
import { playerContext } from "../context/playerContext";
import Modal from "./Modal";

const GymItem = ({ name, reps, type, category, kilograms, duration }) => {
  const [openModal, setOpenModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [data, setData] = useState(null);
  const [timer, setTimer] = useState(null);
  const [workoutKg, setWorkoutKg] = useState("");
  const [warning, setWarning] = useState(false);
  const [workoutReps, setWorkoutReps] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const { strengthLevel, staminaLevel, setStaminaLevel, setStrengthLevel } =
    useContext(playerContext);
  const { healthLevel, setHealthLevel } = useContext(playerContext);
  const {
    setStaminaBarLevel,
    setStrengthBarLevel,
    strengthBarLevel,
    staminaBarLevel,
    setDeadlift,
    setSquat,
    setBenchPress,
    deadlift,
    setLevel,
  } = useContext(playerContext);

  const beginner = 0.2 * workoutKg * workoutReps;
  const medium = 0.1 * workoutKg * workoutReps;

  useEffect(() => {
    if (openModal && data !== null && data > 0) {
      const newTimer = setTimeout(() => {
        setData((prevData) => prevData - 1);
      }, 1000);
      setTimer(newTimer);
      return () => clearTimeout(newTimer);
    } else if (openModal && data !== null && data === 0) {
      setOpenModal(false);
      setData(null);
      if (category === "Strength") {
        if (strengthBarLevel < 99) {
          setStrengthBarLevel(
            (prevStrengthLevel) =>
              prevStrengthLevel + (strengthLevel <= 2 ? beginner : medium)
          );
          setHealthLevel(
            (prevHealthLevel) =>
              prevHealthLevel - (strengthLevel <= 2 ? beginner : medium)
          );
          if (name === "Bench Press")
            setBenchPress((prev) => (prev > workoutKg ? prev : workoutKg));

          if (name === "Squats")
            setSquat((prev) => (prev > workoutKg ? prev : workoutKg));
          if (name === "Deadlift")
            setDeadlift((prev) => (prev > workoutKg ? prev : workoutKg));
        }
      }

      if (category === "Stamina") {
        if (staminaBarLevel < 99) {
          setStaminaBarLevel(
            (prevStaminaLevel) => prevStaminaLevel + selectedDuration
          );
          setHealthLevel(
            (prevHealthLevel) => prevHealthLevel - selectedDuration
          );
        }
      }
    }

    if (strengthBarLevel > 95 && strengthLevel === 1) {
      setStrengthBarLevel(5);
      setStrengthLevel(2);
    } else if (staminaBarLevel > 95 && staminaLevel === 1) {
      setStaminaBarLevel(5);
      setStaminaLevel(2);
    } else if (strengthBarLevel > 95 && strengthLevel === 2) {
      setStrengthBarLevel(5);
      setStrengthLevel(3);
    } else if (staminaLevel > 95 && staminaLevel === 2) {
      setStaminaBarLevel(5);
      setStaminaLevel(3);
    }

    if (staminaLevel === 2 && strengthLevel === 2) {
      setLevel(2);
    } else if (staminaLevel === 3 && strengthLevel === 3) {
      setLevel(3);
    }
  }, [
    openModal,
    data,
    beginner,
    reps,
    category,
    setStrengthBarLevel,
    setStaminaBarLevel,
    setHealthLevel,
    workoutKg,
    workoutReps,
    selectedDuration,
    staminaLevel,
    strengthLevel,
    strengthBarLevel,
    staminaBarLevel,
  ]);

  const startTimer = () => {
    if (
      (name === "Bench Press" && strengthLevel < 2 && workoutKg === 50) ||
      (name === "Squats" && workoutKg >= 70 && strengthLevel < 2) ||
      (name === "Deadlift" && workoutKg >= 80 && strengthLevel < 2)
    ) {
      setWarning(true);
      return;
    }
    if (category === "Strength" && healthLevel > beginner) {
      setData(workoutReps);
      setOpenModal(true);
    } else if (category === "Stamina" && healthLevel > selectedDuration) {
      setData(selectedDuration);
      setOpenModal(true);
    } else {
      setErrorModal(true);
      return;
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    clearTimeout(timer);
    setData(null);
  };

  const handleKgSelect = (event) => {
    setWorkoutKg(+event.target.value);
  };
  const handleRepsSelect = (event) => {
    setWorkoutReps(+event.target.value);
  };

  const handleDuration = (event) => {
    setSelectedDuration(+event.target.value);
  };

  return (
    <div className="gymItem">
      <div className="name">{name}</div>
      <div>
        {kilograms ? (
          <>
            <div className="options">
              <select value={workoutKg} onChange={handleKgSelect}>
                {kilograms.map((kg) => (
                  <option value={kg}>{kg}kg</option>
                ))}
              </select>
              <select value={workoutReps} onChange={handleRepsSelect}>
                {reps.map((rep) => (
                  <option value={rep}>{rep}reps</option>
                ))}
              </select>
            </div>{" "}
          </>
        ) : (
          <>
            <div className="options">
              <select onChange={handleDuration} value={selectedDuration}>
                {duration.map((min) => {
                  return <option value={min}>{min}min</option>;
                })}
              </select>
            </div>
          </>
        )}
      </div>
      <Modal open={openModal} onClose={closeModal}>
        <span>Working out... </span>
        <span>{data}</span>
      </Modal>
      <Modal open={errorModal} onClose={() => setErrorModal(false)}>
        <span>I need some rest :( </span>
      </Modal>
      <Modal open={warning} onClose={() => setWarning(false)}>
        <span>Too heavy for now :( </span>
      </Modal>
      <div className="start">
        <button onClick={startTimer}>Start</button>
      </div>
    </div>
  );
};

export default GymItem;
