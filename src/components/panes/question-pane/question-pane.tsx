import React from "react"
import "./question-pane.css"

interface IProps {
  progressLabelCaption: string
  questionText: string
}
export default function (props: IProps) {
  return (
    <div className="question-pane">
      <div className="progress-label-container">
        <div className="progress-label">
          <p>{props.progressLabelCaption}</p>
        </div>
      </div>
      <div className="question-text-label">
        <p>{props.questionText}</p>
      </div>
    </div>
  )
}
