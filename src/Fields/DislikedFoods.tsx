import { useState } from "react";
import {SubmitButton, EditButton, DeleteButton, SaveButton, CancelButton, MildFace, SadFace, AngryFace} from "../assets/index.tsx";
import Dropdown from "../Components/Dropdown.tsx";

const MEAL_CATEGORIES = ["Mild", "High disliked", "Absolutely no"];
const FACES = [MildFace, SadFace, AngryFace];

export default function DislikedFoods () {
    const [inputText, setInputText] = useState<string>("");
    const [editingInputText, setEditingInputText] = useState<string>("");

    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);
    const [selectedEditingCategoryIndex, setSelectedEditingCategoryIndex] = useState<number>(0);

    const [chosenFoods, setChosenFoods] = useState<Record<number, string[]>>({});
    const [editingLocation, setEditingLocation] = useState<[] | [number, number]>([]);

    const editing : boolean = editingLocation.length !== 0;

    const handleSubmit = () => {
        let trimmed : string = inputText.trim();
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

        updated[selectedCategoryIndex].push(trimmed);
        setChosenFoods(updated);
        setInputText("");
    };

    const handleEditingSubmit = (prevCategoryIndex : number, prevFoodIndex : number) => {
        let trimmed : string = editingInputText.trim();
        if (!trimmed) return;
        const updated : Record<number, string[]> = { ...chosenFoods };
        const normalizedTrimmed = trimmed.replace(/\s+/g, '').toLowerCase();
        const prevNormalizedTrimmed = updated[prevCategoryIndex][prevFoodIndex].replace(/\s+/g, '').toLowerCase();

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
        updated[categoryIndex] = updated[categoryIndex].filter((_, i) => i !== foodIndex);
        setChosenFoods(updated);
    };

    return (
        <div className="w-full bg-stone-200 shadow-md rounded-[10px] pl-[3%] pr-[3%]">
            <Dropdown title="Disliked foods" titleSize="text-2xl">
                <div>
                    <div
                        className="w-full grid place-items-center pl-[3%] pr-[3%] grid grid-cols-40 shadow rounded-[10px] bg-stone-300"
                    >
                        <input
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={handleEnterSubmit}
                            type="text"
                            maxLength={100}
                            placeholder="Type here"
                            className="w-full border-none focus:outline-none col-span-31"
                        ></input>
                        {MEAL_CATEGORIES.map((category, categoryIndex) => (
                            <div 
                                className={`col-span-2 rounded-[5px] w-6 h-6 ${selectedCategoryIndex === categoryIndex ? "bg-gray-800" : ""}`}
                                onClick={() => setSelectedCategoryIndex(categoryIndex)}
                            >
                                <img
                                    src={FACES[categoryIndex]}
                                    alt={category}
                                    className="object-fill"
                                />
                            </div>
                        ))}
                        <div className="w-full col-span-1"></div>
                        <div 
                            onClick={(e) =>
                                {
                                    const target = e.currentTarget;
                                    target.classList.add("bg-gray-400");
                                    handleSubmitButton();
                                    setTimeout(() => {
                                    target.classList.remove("bg-gray-400");
                                    }, 200);
                                }}
                            className="col-span-2 w-6 h-6 rounded-full"
                        >
                            <img
                                src={SubmitButton}
                                alt="Submit"
                                className="object-fill"
                            />
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-3 grid-rows-auto gap-x-[1vw]">
                        {MEAL_CATEGORIES.map((category, categoryIndex) => (
                            <div>
                                {(chosenFoods[categoryIndex] || []).map((food, foodIndex) => (
                                    <div>
                                        <div className="w-full h-[2vh]"></div>
                                        <div
                                            className={`w-full bg-stone-300 grid place-items-center shadow pl-[3%] grid grid-cols-20 rounded-[10px] ${(editing && editingLocation[0] === categoryIndex && editingLocation[1] === foodIndex) ? "hidden" : ""}`}
                                        >
                                            <div className="w-full col-span-14">
                                                {food}
                                            </div>
                                            <div 
                                                className="w-6 h-6 col-span-2"
                                            >
                                                <img
                                                    src={FACES[categoryIndex]}
                                                    alt={category}
                                                    className="object-fill"
                                                />
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
                                        <div className={`w-full place-items-center grid shadow bg-stone-100 pl-[3%] grid grid-cols-20 rounded-[10px] ${(editing && editingLocation[0] == categoryIndex && editingLocation[1] == foodIndex) ? "" : "hidden"}`}>
                                            <input
                                                value={editingInputText}
                                                onChange={(e) => setEditingInputText(e.target.value)}
                                                onKeyDown={(e) => handleEditingEnterSubmit(e, categoryIndex, foodIndex)}
                                                type="text"
                                                maxLength={100}
                                                placeholder="Type here"
                                                className="w-full border-none focus:outline-none col-span-10"
                                            ></input>
                                            {MEAL_CATEGORIES.map((category, categoryIndex) => (
                                                <div 
                                                    className={`w-6 h-6 col-span-2  ${selectedEditingCategoryIndex === categoryIndex ? "bg-gray-800" : ""}`}
                                                    onClick={() => setSelectedEditingCategoryIndex(categoryIndex)}
                                                >
                                                    <img
                                                        src={FACES[categoryIndex]}
                                                        alt={category}
                                                        className="object-fill"
                                                    />
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
                                                className="w-6 h-6 col-span-2"
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