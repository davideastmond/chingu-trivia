import React, { useEffect, useState } from "react";
import { QuestionType } from "../../../definitions/question-type";
import { loadSavedQuestionPreference } from "../../../scripts/load-saved-question-prefs";
import { setQuestionPreferences } from "../../../scripts/set-question-prefs";
import "./option-menu.css"

interface IProps {
  optionMenuCloseButtonClick: () => void
}

export default function (props: IProps) {

  const [questionOption, setQuestionOption] = useState(QuestionType.All)
  const radioOptionChangeHandler = (option: QuestionType) => {
    // Write the changes to localStorage
    setQuestionPreferences(option);
    setQuestionOption(option);
  }

  useEffect(() => {
    function loadCurrentQuestionPreferences() {
      const currentPreference = loadSavedQuestionPreference() as QuestionType
      setQuestionOption(currentPreference)
    }
    loadCurrentQuestionPreferences();
  }, [])

  return (
    <div className="options-window">
      <div className="options-inner-frame">
        <div className="option-header">
          <p className="h4">Question Types</p>
        </div>
        <div className={`question-option option-all ${questionOption === QuestionType.All ? "option-selected" : ""}`} onClick={() => radioOptionChangeHandler(QuestionType.All)}>
          All
        </div>
        <div className={`question-option option-html ${questionOption === QuestionType.Html ? "option-selected" : ""}`} onClick={() => radioOptionChangeHandler(QuestionType.Html)}>
          HTML
        </div>
        <div className={`question-option option-css ${questionOption === QuestionType.Css ? "option-selected" : ""}`} onClick={() => radioOptionChangeHandler(QuestionType.Css)}>
          CSS
        </div>
        <div className={`question-option option-js ${questionOption === QuestionType.Javascript ? "option-selected" : ""}`} onClick={() => radioOptionChangeHandler(QuestionType.Javascript)}>
          Javascript
        </div>
        <div onClick={props.optionMenuCloseButtonClick} className="options-close-window">
          Close
        </div>
      </div>
    </div>
  )
}
