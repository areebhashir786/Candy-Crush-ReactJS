import { useState } from "react";
import App from "./App";
import candyCrush from "./assets/bk4.jpeg";

const Home = () => {
  const [isOpeningScreenVisible, setOpeningScreenVisible] =
    useState<boolean>(true);
  setTimeout(() => {
    setOpeningScreenVisible(false);
  }, 2000);
  return (
    <div>
      {isOpeningScreenVisible && (
        <img src={candyCrush} className="h-[580px] w-[100%]" alt="" />
      )}
      {!isOpeningScreenVisible && <App />}
    </div>
  );
};

export default Home;
