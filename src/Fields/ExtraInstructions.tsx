import { useState } from "react";
import { EditButton, SaveButton, CancelButton} from "../assets/index.tsx";

export default function ExtraInstructions () {
    const [inputText, setInputText] = useState<string>("");
    const [prevInputText, setPrevInputText] = useState<string>(inputText);
    const [editing, setEditing] = useState<boolean>(false);
    
    return (
        <div>
            <div>
                <div>
                    Exra Instructions
                </div>
                <div>
                    <div>
                        <div
                            className={`w-6 h-6 ${editing ? "hidden" : ""}`}
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
                    </div>
                    <div className={editing ? "" : "hidden"}>
                        <div
                            className="w-6 h-6"
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
                            className="w-6 h-6"
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
            <div>
                <input
                    id="textbox"
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Add instructions"
                    disabled={!editing}
                />
            </div>
        </div>
    );
}