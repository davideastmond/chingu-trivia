import { prependOnceListener } from "process";
import React from "react";
import "./feedback-message.css"

interface IProps {
  messageText: string
  messageColor?: string
}

export default function (props: IProps) {
  return (
    <div className={`feedback-message-label ${props.messageColor}`}>
      {props.messageText}
    </div>
  )
}
