import { useState } from "react";
import {SubmitButton, EditButton, DeleteButton, SaveButton, CancelButton} from "../assets/index.tsx";
import Dropdown from "../Components/Dropdown.tsx";

const MEAL_CATEGORIES : string[] = ["Mild", "High", "Severe"];
const IRRITATION_GRADIENT : string[] = ["bg-yellow-500", "bg-orange-500", "bg-red-600"];

const COMMON_ALLERGENS : string[] = [
  "Nuts (Tree nuts)",
  "Peanuts",
  "Dairy/Lactose",
  "Gluten/Wheat",
  "Eggs",
  "Shellfish",
  "Fish",
  "Soy"
];

export default function Intolerances () {
    const [inputText, setInputText] = useState<string>("");
    const [editingInputText, setEditingInputText] = useState<string>("");

    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);
    const [selectedEditingCategoryIndex, setSelectedEditingCategoryIndex] = useState<number>(0);

    const [chosenFoods, setChosenFoods] = useState<Record<number, string[]>>({});
    const [editingLocation, setEditingLocation] = useState<[] | [number, number]>([]);

    const [availableAllergens, setAvailableAllergens] = useState<string[]>(COMMON_ALLERGENS);

    const editing : boolean = editingLocation.length !== 0;

    const handleSubmit = (text ?: string) => {
        let trimmed : string = text?.trim() || inputText.trim();
        if (!trimmed) return;

        const updated : Record<number, string[]> = { ...chosenFoods };

        if (!updated[selectedCategoryIndex]) {
            updated[selectedCategoryIndex] = [];
        }

        const normalizedTrimmed : string = trimmed.replace(/\s+/g, '').toLowerCase();

        if (
            Object.values(updated).some((subArray: string[]) =>
                subArray.some(
                    item => item.replace(/\s+/g, '').toLowerCase() === normalizedTrimmed
                )
            )
        ) return;

        setAvailableAllergens(prev =>
            prev.filter(
                allergen => allergen.replace(/\s+/g, '').toLowerCase() !== normalizedTrimmed
            )
        );

        updated[selectedCategoryIndex].push(trimmed);
        setChosenFoods(updated);
        setInputText("");
    };

    const handleEditingSubmit = (prevCategoryIndex : number, prevFoodIndex : number) => {
        let trimmed : string = editingInputText.trim();
        if (!trimmed) return;
        const updated : Record<number, string[]> = { ...chosenFoods };
        const normalizedTrimmed = trimmed.replace(/\s+/g, '').toLowerCase();
        const prevNormalizedTrimmed = updated[prevCategoryIndex][prevFoodIndex];

        if (normalizedTrimmed === prevNormalizedTrimmed && prevCategoryIndex === selectedEditingCategoryIndex) return;

        if (normalizedTrimmed === prevNormalizedTrimmed) {
            updated[prevCategoryIndex] = updated[prevCategoryIndex].filter((_, i) => i !== prevFoodIndex);

            if (!updated[selectedEditingCategoryIndex]) {
                updated[selectedEditingCategoryIndex] = [];
            }

            updated[selectedEditingCategoryIndex].push(trimmed);
            setChosenFoods(updated);
            setEditingLocation([]);
            return;
        }

        if (
            Object.entries(updated).some(([_, items]) =>
                items.some(item => item.replace(/\s+/g, '').toLowerCase() === normalizedTrimmed)
            )
        ) return;

        if (prevCategoryIndex === selectedEditingCategoryIndex) {
            updated[prevCategoryIndex][prevFoodIndex] = trimmed;
        } else {
            updated[prevCategoryIndex] = updated[prevCategoryIndex].filter((_, i) => i !== prevFoodIndex);

            if (!updated[selectedEditingCategoryIndex]) {
                updated[selectedEditingCategoryIndex] = [];
            }

            updated[selectedEditingCategoryIndex].push(trimmed);
        }

        setChosenFoods(updated);
        setEditingLocation([]);
    }

    const handleSubmitButton = () => {
        handleSubmit();
    };

    const handleEnterSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    const handleEditingSubmitButton = (categoryIndex : number, foodIndex : number) => {
        handleEditingSubmit(categoryIndex, foodIndex);
    };

    const handleEditingEnterSubmit = (e: React.KeyboardEvent<HTMLInputElement>, categoryIndex : number, foodIndex : number) => {
        if (e.key === "Enter") {
            handleEditingSubmit(categoryIndex, foodIndex);
        }
    };

    const handleDeleteButton = (categoryIndex : number, foodIndex : number) => {
        const updated = { ...chosenFoods };
        const normalizedTrimmed = updated[categoryIndex][foodIndex].replace(/\s+/g, '').toLowerCase();

        if (COMMON_ALLERGENS.map(allergen => allergen.replace(/\s+/g, '').toLowerCase()).includes(normalizedTrimmed)) {
            const updatedAvailableAllergens : string[] = [...availableAllergens];
            updatedAvailableAllergens.push(COMMON_ALLERGENS[categoryIndex][foodIndex]);
            setAvailableAllergens(updatedAvailableAllergens);
        }

        updated[categoryIndex] = updated[categoryIndex].filter((_, i) => i !== foodIndex);
        setChosenFoods(updated);
    };

    return (
        <div className="w-full bg-stone-200 shadow-md rounded-[10px] pl-[3%] pr-[3%]">
            <Dropdown title="Intolerances" titleSize="text-2xl">
                <div>
                    <div
                        className="w-full grid place-items-center pt-[2vh] pb-[2vh] pl-[3%] pr-[3%] shadow rounded-[10px] bg-stone-300"
                    >
                        <div
                            className="w-full grid place-items-center grid-cols-3 grid-rows-auto gap-x-[5vw] gap-y-[1vh]"
                        >
                            {availableAllergens.map((allergen) => (
                                <div
                                    className="w-full grid pl-[3%] col-span-1 shadow rounded-[10px]"
                                    onClick={() => handleSubmit(allergen)}
                                >
                                    {allergen}
                                </div>
                            ))}
                        </div>
                        <div className="w-full h-[2vh]"></div>
                        <div
                            className="w-full grid place-items-center pl-[3%] grid grid-cols-40 shadow rounded-[10px] bg-stone-300"
                        >
                            <input
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={handleEnterSubmit}
                                type="text"
                                maxLength={100}
                                placeholder="Type here"
                                className="w-full border-none focus:outline-none col-span-32"
                            ></input>
                            {MEAL_CATEGORIES.map((_, categoryIndex) => (
                                <div 
                                    className={`col-span-2 w-6 h-6 rounded-full ${IRRITATION_GRADIENT[categoryIndex]} ${selectedCategoryIndex === categoryIndex ? "ring-2 ring-gray-800" : ""}`}
                                    onClick={() => setSelectedCategoryIndex(categoryIndex)}
                                >
                                </div>
                            ))}
                            <div 
                                onClick={() => handleSubmitButton()}
                                className="col-span-2 w-6 h-6 "
                            >
                                <img
                                    src={SubmitButton}
                                    alt="Submit"
                                    className="object-fill"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-3 pt-[2vh] grid-rows-auto gap-x-[1vw]">
                        {MEAL_CATEGORIES.map((_, categoryIndex) => (
                            <div>
                                {(chosenFoods[categoryIndex] || []).map((food, foodIndex) => (
                                    <div>
                                        <div className="w-full h-[2vh]"></div>
                                        <div
                                            className={`w-full grid place-items-center shadow pl-[3%] grid grid-cols-20 rounded-[10px] ${(editing && editingLocation[0] === categoryIndex && editingLocation[1] === foodIndex) ? "hidden" : ""}`}
                                        >
                                            <div className="w-full col-span-14">
                                                {food}
                                            </div>
                                            <div 
                                                className={`w-6 h-6 col-span-2 rounded-full ${IRRITATION_GRADIENT[categoryIndex]}`}
                                            >
                                            </div>
                                            <div
                                                className="w-6 h-6 col-span-2"
                                                onClick={() => {
                                                    setEditingLocation([categoryIndex, foodIndex]);
                                                    setSelectedEditingCategoryIndex(categoryIndex);
                                                    setEditingInputText(food);
                                                }}
                                            >
                                                <img
                                                    src={EditButton}
                                                    alt="Edit"
                                                    className="object-fill"
                                                />
                                            </div>
                                            <div 
                                                className="w-6 h-6 col-span-2"
                                                onClick={() => (handleDeleteButton(categoryIndex, foodIndex))}
                                            >
                                                <img
                                                    src={DeleteButton}
                                                    alt="Delete"
                                                    className="object-fill"
                                                />
                                            </div>
                                        </div>
                                        <div className={`w-full place-items-center shadow grid bg-stone-100 pl-[3%] grid grid-cols-20 rounded-[10px] ${(editing && editingLocation[0] == categoryIndex && editingLocation[1] == foodIndex) ? "" : "hidden"}`}>
                                            <input
                                                value={editingInputText}
                                                onChange={(e) => setEditingInputText(e.target.value)}
                                                onKeyDown={(e) => handleEditingEnterSubmit(e, categoryIndex, foodIndex)}
                                                type="text"
                                                maxLength={100}
                                                placeholder="Add intolerance"
                                                className="className=w-full border-none focus:outline-none col-span-10"
                                            ></input>
                                            {MEAL_CATEGORIES.map((_, categoryIndex) => (
                                                <div 
                                                    className={`w-6 h-6 rounded-full col-span-2 ${IRRITATION_GRADIENT[categoryIndex]} ${selectedEditingCategoryIndex === categoryIndex ? "ring-2 ring-gray-800" : ""}`}
                                                    onClick={() => {
                                                        setSelectedEditingCategoryIndex(categoryIndex);
                                                        console.log("here");
                                                    }}
                                                >
                                                </div>
                                            ))}
                                            <div 
                                                onClick={() => {
                                                    handleEditingSubmitButton(categoryIndex, foodIndex);
                                                }}
                                                className="w-6 h-6 col-span-2"
                                            >
                                                <img
                                                    src={SaveButton}
                                                    alt="Submit"
                                                    className="object-fill"
                                                />
                                            </div>
                                            <div 
                                                onClick={() => {
                                                    setEditingLocation([]);
                                                }}
                                                className="w-4 h-4 col-span-2"
                                            >
                                                <img
                                                    src={CancelButton}
                                                    alt="Submit"
                                                    className="object-fill"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="w-full h-[2vh]"></div>
                </div>
            </Dropdown>
        </div>
    );
}