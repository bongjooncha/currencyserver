import React from "react";
import Headnav from "components/Header/index";
import UpPrice from "./index.upbit";

function Coin() {
  return (
    <div className="Home">
      <Headnav />
      <div>
        <UpPrice />
      </div>
    </div>
  );
}

export default Coin;
