import React from "react";
import "./reset-button.css";

interface IProps {
  buttonClickHandler: () => void;
}

export default function (props: IProps) {
  return (
    <div>
      <button onClick={props.buttonClickHandler} type="button" className="btn btn-primary next-button btn-text-color">RESTART QUIZ</button>
    </div>
  )
}
