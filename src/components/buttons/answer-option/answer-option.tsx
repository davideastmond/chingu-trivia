import React from "react";
import "./answer-option.css";

interface IProps {
  answerCaption: string
  responseId: string
  clickCallBackFunction: (responseId: string) => void
}

export default function (props: IProps) {
  return (
    <div onClick={() => props.clickCallBackFunction(props.responseId)} className="answer-caption">
      <p> {props.answerCaption} </p>
    </div>
  )
}
