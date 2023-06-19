import { InputHTMLAttributes, Ref, forwardRef } from "react";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  icon: FontAwesomeIconProps["icon"];
  error?: string;
  onIconClick?: () => void;
}

const Field = forwardRef(
  (
    {
      title,
      icon,
      error,
      onIconClick,
      name = title,
      className = "",
      ...inputProps
    }: FieldProps,
    ref: Ref<HTMLInputElement>
  ) => {
    return (
      <div className="group w-full font-semibold text-lightGray focus-within:text-lightBlack">
        <label className="text-lightBlack" htmlFor={name}>
          {capitalize(title)}
        </label>
        <div className="relative">
          <input
            ref={ref}
            className={`${className} block w-full p-3 pr-7 border-2 ${
              error
                ? "border-red-500"
                : "border-lightGray focus:border-accentBlue"
            } rounded-md mt-1 text-sm transition-colors`}
            id={name}
            name={name}
            {...inputProps}
          />
          <button
            type="button"
            className="absolute top-0 right-0 flex justify-center items-center h-full aspect-square p-3.5"
            onClick={() => onIconClick?.()}
            onMouseDown={(e) => e.preventDefault()}
            tabIndex={-1}
          >
            <FontAwesomeIcon className="transition-colors" icon={icon} />
          </button>
        </div>
        <div
          className={`${
            error ? "visible" : "invisible"
          } pl-4 text-xs text-red-500`}
        >
          <FontAwesomeIcon icon={faCircleExclamation} />
          <span className="inline-block ml-2">{error}</span>
        </div>
      </div>
    );
  }
);

export default Field;

function capitalize(text: string): string {
  return text[0].toUpperCase() + text.slice(1).toLowerCase();
}
