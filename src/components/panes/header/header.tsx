import React from "react";
import "./header.css";

interface IProps {
  questionsMenuClickCallBack: (e: any) => void
}
export default function (props: IProps) {

  return (
    <div className="app-header">
      <div className="app-name">
        <p>CHINGU TRIVIA</p>
      </div>
      <div className="header-home">
        <p> Home </p>
      </div>
      <div className="header-questions" onClick={props.questionsMenuClickCallBack}>
        <p> Questions </p>
      </div>
    </div>
  )
}
