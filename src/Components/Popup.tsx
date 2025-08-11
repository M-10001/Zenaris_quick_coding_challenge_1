import React, { useEffect, useState, useRef } from "react";
import { PopupData } from "./PopupData.ts";

type PopupProps = {
  data: PopupData;
  setData: React.Dispatch<React.SetStateAction<PopupData>>;
};

export function Popup({ data, setData }: PopupProps) {
  const [show, setShow] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (data.text) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setShow(true);

      timeoutRef.current = window.setTimeout(() => {
        setShow(false);
        setData(new PopupData("", data.type));
      }, 3000);
    } else {
      setShow(false);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [data, setData]);

  return (
    <div
      className={`
        fixed top-0 left-1/2 rounded-[10px] p-[2%] flex items-center text-left
        transition-opacity duration-500 ease-in-out
        ${
          data.type === "Error" ? "bg-red-200" : "bg-green-200"
        }
        ${show ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >
      {data.text}
    </div>
  );
}
