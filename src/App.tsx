import Header from "./Header";
import FavoriteFoods from "./Fields/FavoriteFoods";
import DislikedFoods from "./Fields/DislikedFoods";
import Intolerances from "./Fields/Intolerances";
import ExtraInstructions from "./Fields/ExtraInstructions";
import { Popup } from "./Components/Popup";
import { useState } from "react";
import { PopupData } from "./Components/PopupData";


function App() {
  const [popupData, setPopupData] = useState<PopupData>(new PopupData("", "Information"));

  return (
    <div className="w-full">
      <div className="w-full bg-amber-200">
        <div className="w-full py-[5%] px-[10%] bg-green-100/80">
          <div className="flex-1 flex flex-col p-[3%] rounded-2xl border border-gray-200 gap-[5vh]">
            <Header></Header>
            <FavoriteFoods setPopupData={setPopupData}></FavoriteFoods>
            <DislikedFoods setPopupData={setPopupData}></DislikedFoods>
            <Intolerances setPopupData={setPopupData}></Intolerances>
            <ExtraInstructions setPopupData={setPopupData}></ExtraInstructions>
          </div>
        </div>
      </div>
      <Popup data={popupData} setData={setPopupData}></Popup>
    </div>
  );
}

export default App
