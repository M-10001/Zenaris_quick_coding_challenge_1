import {ProfileImagePlaceHolder} from "./assets/index.tsx";

export default function Header () {
    return (
        <div className="pl-[1vh]">
            <div>
                <div className="bg-gray-300 w-16 h-16 rounded-full shadow-2xl">
                    <img
                        src={ProfileImagePlaceHolder}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                    />
                </div>
                <div className="h-[1vh]"></div>
                <div>
                    Person Name
                </div>
            </div>
            <div className="h-[1vh]"></div>
            <div className="text-4xl">
                Meal Preferences
            </div>
        </div>
    );
}