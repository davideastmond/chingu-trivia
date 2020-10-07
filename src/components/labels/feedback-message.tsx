import React from "react";
import "./feedback-message.css"

interface IProps {
  messageText: string
}

export default function (props: IProps) {
  return (
    <div className="feedback-message-label">
      <p>{props.messageText} </p>
    </div>
  )
}
