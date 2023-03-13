import React, { useEffect, useState, useContext } from "react";
import "../styles/player.scss";
import ProgressBar from "react-bootstrap/ProgressBar";
import { GiWeightLiftingUp, GiHealthNormal } from "react-icons/gi";
import { AiFillInfoCircle } from "react-icons/ai";
import { BiRun } from "react-icons/bi";
import Modal from "../components/Modal";
import Bench from "../assets/bench.png";
import Lift from "../assets/lift.png";
import Squats from "../assets/squats.png";
import { playerContext } from "../context/playerContext";
import level1 from "../assets/level1.jpg";
import level2 from "../assets/level2.jpg";
import level3 from "../assets/level3.jpg";

const Player = () => {
  const [health, setHealth] = useState("");
  const [restTime, setRestTime] = useState(10);
  const [isOpenStrength, setIsOpenStrength] = useState(false);
  const [isOpenStamina, setIsOpenStamina] = useState(false);
  const [isOpenHealth, setIsOpenHealth] = useState(false);
  const [timer, setTimer] = useState("");
  const [dupa, setDupa] = useState(null);
  const [isOpenBtn, setIsOpenBtn] = useState(true);
  const [timeOut, setTimeOut] = useState(true);
  const [isOpenRest, setIsOpenRest] = useState(false);
  const {
    healthLevel,
    staminaBarLevel,
    strengthBarLevel,
    strengthLevel,
    staminaLevel,
    setHealthLevel,
    deadlift,
    squat,
    benchpress,
    level,
  } = useContext(playerContext);

  useEffect(() => {
    if (healthLevel < 25) {
      setHealth("danger");
    } else if (healthLevel < 75) {
      setHealth("warning");
    } else {
      setHealth("success");
    }
  });
  useEffect(() => {
    if (!isOpenBtn && restTime > 0 && isOpenRest) {
      const timeOut = setTimeout(() => {
        setRestTime((prev) => prev - 1);
      }, 1000);
      setTimeOut(timeOut);
      return () => clearTimeout(timeOut);
    } else if (restTime === 0 && !isOpenBtn && isOpenRest) {
      setIsOpenRest(false);
      setIsOpenBtn(true);
      setHealthLevel((prev) => prev + 30);
    }
  }, [restTime, isOpenBtn, isOpenRest]);

  const klikanie = () => {
    if (healthLevel >= 100) {
      return;
    } else {
      setIsOpenBtn(false);
      setTimer(restTime);
      setRestTime(10);
    }
  };

  return (
    <>
      <div className="all">
        <div className="player_box">
          <div className="img">
            {level === 1 && <img src={level1} />}
            {level === 2 && <img src={level2} />}
            {level === 3 && <img src={level3} />}
          </div>
          <div className="stats">
            <h1>Level {level}</h1>
            <ul>
              <li>
                <span>
                  <span>
                    Strength
                    <AiFillInfoCircle
                      className="icon"
                      onClick={() => setIsOpenStrength(true)}
                    />
                    <Modal
                      open={isOpenStrength}
                      onClose={() => {
                        setIsOpenStrength(false);
                      }}
                    >
                      {
                        "Strength is building by doing exercises in the gym, the higher your level, the more weight you can lift. "
                      }
                    </Modal>
                  </span>
                  <span>Lvl. {strengthLevel}</span>
                  <span>
                    <GiWeightLiftingUp />
                  </span>
                </span>{" "}
                <ProgressBar now={strengthBarLevel} />
              </li>
              <li>
                <span>
                  <span>
                    Stamina
                    <AiFillInfoCircle
                      className="icon"
                      onClick={() => setIsOpenStamina(true)}
                    />
                    <Modal
                      open={isOpenStamina}
                      onClose={() => {
                        setIsOpenStamina(false);
                      }}
                    >
                      {"Stamina increases by running in the gym"}
                    </Modal>
                  </span>
                  <span>Lvl. {staminaLevel}</span>
                  <span>
                    <BiRun />
                  </span>
                </span>{" "}
                <ProgressBar now={staminaBarLevel} />
              </li>
              <li>
                <span>
                  <span>
                    Health{" "}
                    <AiFillInfoCircle
                      className="icon"
                      onClick={() => setIsOpenHealth(true)}
                    />
                    <Modal
                      open={isOpenHealth}
                      onClose={() => {
                        setIsOpenHealth(false);
                      }}
                    >
                      <div className="health">
                        <p>
                          Too much exercises causes damage on your health, you
                          can't exercise if your health is low. If you need some
                          rest click the
                          <span>
                            <GiHealthNormal />
                          </span>
                          button.
                        </p>
                      </div>
                    </Modal>
                  </span>
                  <span>
                    <GiHealthNormal
                      className="icon"
                      onClick={() => {
                        setIsOpenRest(true);
                      }}
                    />
                    <Modal
                      open={isOpenRest}
                      onClose={() => {
                        setIsOpenRest(false);
                      }}
                    >
                      <div className="rest">
                        {isOpenBtn ? (
                          <>
                            <div className="btn">
                              <button onClick={klikanie}>Rest</button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>{restTime}</div>
                          </>
                        )}
                      </div>
                    </Modal>
                  </span>
                </span>{" "}
                <ProgressBar id="health" variant={health} now={healthLevel} />{" "}
              </li>
            </ul>
          </div>
        </div>
        <div className="personal_bests">
          <div className="title">
            <span>
              <h2>Personal Bests</h2>
            </span>
          </div>
          <div className="records">
            <div className="bench content">
              <img src={Bench}></img>
              <span>{benchpress}kg</span>
            </div>
            <div className="squats content">
              <img src={Squats}></img>
              <span>{squat}kg</span>
            </div>
            <div className="deadlift content">
              <img src={Lift}></img>
              <span>{deadlift}kg</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Player;
