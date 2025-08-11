import { useState } from "react";
import { EditButton, SaveButton, CancelButton} from "../assets/index.tsx";
import Dropdown from "../Components/Dropdown.tsx";
import { PopupData } from "../Components/PopupData.ts";

type Props = {
  setPopupData: React.Dispatch<React.SetStateAction<PopupData>>;
};

export default function ExtraInstructions ({setPopupData} : Props) {
    const [inputText, setInputText] = useState<string>("");
    const [prevInputText, setPrevInputText] = useState<string>(inputText);
    const [editing, setEditing] = useState<boolean>(false);
    
    return (
        <div className="w-full bg-green-50 shadow-md rounded-[10px] pl-[3%] pr-[3%]">
            <Dropdown title="Extra instructions" titleSize="text-2xl">
                <div>
                    <div>
                        <div>
                            <div className={`w-full h-6 items-center flex ${editing ? "hidden" : ""}`}>
                            </div>
                            <div className={`w-full items-center flex ${editing ? "" : "hidden"}`}>
                                <div className="min-w-[1%]"></div>
                                <div
                                    className="w-6 h-6 rounded-[5px]"
                                    onClick={(e) => {
                                        const target = e.currentTarget;
                                        target.classList.add("bg-gray-400");
                                        setPrevInputText(inputText);
                                        setTimeout(() => {
                                        target.classList.remove("bg-gray-400");
                                        }, 200);
                                        setPopupData(new PopupData("Saved.", "Information"));
                                    }}
                                >
                                    <img
                                        src={SaveButton}
                                        alt="Save"
                                        className="object-fill"
                                    />
                                </div>
                                <div className="min-w-[1%]"></div>
                                <div
                                    className="w-4 h-4"
                                    onClick={() => {
                                        setEditing(false);
                                        setInputText(prevInputText);
                                    }}
                                >
                                    <img
                                        src={CancelButton}
                                        alt="Exit"
                                        className="object-fill"
                                    />
                                </div>
                                <div className="flex-1"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[1vh]"></div>
                    <div className="w-full border border-gray-200 bg-stone-200 rounded-[10px]">
                        <textarea
                            id="textbox"
                            value={inputText}
                            maxLength={500}
                            onClick={() => setEditing(true)}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Click here to start typing"
                            readOnly={!editing}
                            className={`rounded-[10px] px-[1%] py-[1vh] overflow-auto w-full border-none focus:outline-none text-left align-top resize-none h-[10vh] ${editing ? "bg-stone-100" : ""}`}
                        />
                    </div>
                    <div className="w-full h-[1vh]"></div>
                </div>
            </Dropdown>
        </div>
    );
}