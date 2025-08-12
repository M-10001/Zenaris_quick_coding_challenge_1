import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import { ArrowDown } from "../assets";

interface DropdownProps {
  title: string;
  children: ReactNode;
  titleSize: string;
}

export default function Dropdown({ title, children, titleSize }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [maxHeight, setMaxHeight] = useState<string>("0px");
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    const el = contentRef.current;
    if (!el) return;
    
    if (isOpen) {
      setMaxHeight("0px");
    } else {
      setMaxHeight(`${el.scrollHeight}px`);
    }

    setIsOpen(!isOpen);
  };
  
  const handleTransitionEnd = () => {
    const el = contentRef.current;
    if (!el) return;
    
    if (isOpen) {
      setMaxHeight("none");
    }
  };

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setMaxHeight("none");
    }
  }, []);

  return (
    <div className="w-full">
      <div 
        onClick={toggleDropdown}
        className="w-full grid grid-cols-20"
      >
        <div className={`${titleSize} col-span-19 pt-[1vh] pb-[1vh]`}>
          {title}
        </div>
        <div className="w-full grid place-items-center col-span-1">
          <div className="w-6 h-6 rounded-full">
            <img
              src={ArrowDown}
              alt="Toggle"
              className={`object-fill transform transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
            />
          </div>
        </div>
      </div>
      <div
        ref={contentRef}
        style={{ maxHeight: maxHeight }}
        className="transition-all duration-[1000ms] ease-in-out overflow-hidden"
        onTransitionEnd={handleTransitionEnd}
      >
        {children}
      </div>
    </div>
  );
}