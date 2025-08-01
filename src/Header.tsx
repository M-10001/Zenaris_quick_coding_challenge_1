import {ProfileImagePlaceHolder} from "./assets/index.tsx";

export default function Header () {
    return (
        <div>
            <div>
                <div className="w-12 h-12 rounded-full">
                    <img
                        src={ProfileImagePlaceHolder}
                        alt="Profile"
                        className="object-fill"
                    />
                </div>
                <div>
                    Person Name
                </div>
            </div>
            <div>
                Meal Preferences
            </div>
        </div>
    );
}