import React from "react";
import "./feedback-message.css"

interface IProps {
  messageOptions: {
    messageText: string,
    cssClass: string
  }
}

export default function (props: IProps) {
  return (
    <div className={`feedback-message-label ${props.messageOptions.cssClass}`}>
      <p>{props.messageOptions.messageText} </p>
    </div>
  )
}
