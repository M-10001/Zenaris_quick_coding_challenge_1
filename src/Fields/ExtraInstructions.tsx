import { useState } from "react";
import { EditButton, SaveButton, CancelButton} from "../assets/index.tsx";
import Dropdown from "../Components/Dropdown.tsx";

export default function ExtraInstructions () {
    const [inputText, setInputText] = useState<string>("");
    const [prevInputText, setPrevInputText] = useState<string>(inputText);
    const [editing, setEditing] = useState<boolean>(false);
    
    return (
        <div className="w-full bg-stone-200 shadow-md rounded-[10px] pl-[3%] pr-[3%]">
            <Dropdown title="Extra instructions" titleSize="text-2xl">
                <div>
                    <div>
                        <div>
                            <div className="w-full grid grid-cols-40 place-items-center">
                                <div className="col-span-37 w-full"></div>
                                <div
                                    className={`col-span-2 w-6 h-6 ${editing ? "hidden" : ""}`}
                                    onClick={() => {
                                        setEditing(true);
                                    }}
                                >
                                    <img
                                        src={EditButton}
                                        alt="Edit"
                                        className="object-fill"
                                    />
                                </div>
                                <div className="col-span-1 w-full"></div>
                            </div>
                            <div className={`w-full grid grid-cols-40 place-items-center ${editing ? "" : "hidden"}`}>
                                <div className="w-full col-span-36"></div>
                                <div
                                    className="col-span-2 w-6 h-6"
                                    onClick={() => {
                                        setPrevInputText(inputText);
                                    }}
                                >
                                    <img
                                        src={SaveButton}
                                        alt="Save"
                                        className="object-fill"
                                    />
                                </div>
                                <div
                                    className="col-span-2 w-4 h-4"
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
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[1vh]"></div>
                    <div>
                        <textarea
                            id="textbox"
                            value={inputText}
                            maxLength={500}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Edit to type here"
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