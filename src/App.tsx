import Header from "./Header";
import FavoriteFoods from "./Fields/FavoriteFoods";
import DislikedFoods from "./Fields/DislikedFoods";
import Intolerances from "./Fields/Intolerances";
import ExtraInstructions from "./Fields/ExtraInstructions";

function App() {

  return (
    <div className="w-full grid bg-amber-50">
      <div className="h-[5vh]"></div>
      <div className="min-h-[90vh] w-full grid grid-cols-20">
        <div className="col-span-1"></div>
        <div className="grid auto-rows-auto items-start grid-cols-20 rounded-2xl col-span-18 bg-stone-100">
          <div className="col-span-1"></div>
          <div className="grid col-span-18 gap-y-[5vh]">
            <div></div>
            <Header></Header>
            <FavoriteFoods></FavoriteFoods>
            <DislikedFoods></DislikedFoods>
            <Intolerances></Intolerances>
            <ExtraInstructions></ExtraInstructions>
            <div></div>
          </div>
          <div className="col-span-1"></div>
        </div>
        <div className="col-span-1"></div>
      </div>
      <div className="h-[5vh]"></div>
    </div>
  );
}

export default App
