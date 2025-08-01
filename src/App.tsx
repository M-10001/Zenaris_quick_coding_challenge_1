import Header from "./Header";
import FavoriteFoods from "./Fields/FavoriteFoods";
import DislikedFoods from "./Fields/DislikedFoods";
import Intolerances from "./Fields/Intolerances";
import ExtraInstructions from "./Fields/ExtraInstructions";

function App() {

  return (
    <div className="w-full; min-h-full">
      <Header></Header>
      <FavoriteFoods></FavoriteFoods>
      <DislikedFoods></DislikedFoods>
      <Intolerances></Intolerances>
      <ExtraInstructions></ExtraInstructions>
    </div>
  );
}

export default App
