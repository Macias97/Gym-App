import React from "react";
import Player from "../components/Player";
import "../styles/MyPlayer.scss";
import Gym from "./Gym";
import PlayerContextProvider from "../context/playerContext";

const MyPlayer = () => {
  return (
    <>
      <PlayerContextProvider>
        <div className="myPlayer">
          <Player />
          <Gym />
        </div>
      </PlayerContextProvider>
    </>
  );
};

export default MyPlayer;
