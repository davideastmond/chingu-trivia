import React from "react";
import "./next-button.css";

interface IProps {
  buttonText: string
  buttonClickHandler: () => void;
}
export default function (props: IProps) {
  return (
    <div>
      <button onClick={props.buttonClickHandler} type="button" className="btn btn-primary next-button btn-text-color">{props.buttonText}</button>
    </div>
  )
}
