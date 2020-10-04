import React, { useState, useEffect } from 'react';
import './App.css';
import AnswerOption from './components/buttons/answer-option/answer-option';
import Header from "./components/panes/header/header"
import QuestionPane from './components/panes/question-pane/question-pane';
import { Question } from './interfaces/question';
import { defaultQuestion } from './scripts/default-question';


import { fetchQuestions } from "./scripts/fetch-questions"

async function loadQuestions() {
  return fetchQuestions();
}

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [questions, setQuestions] = useState(defaultQuestion)

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const asyncResponse = await loadQuestions();
        setQuestions(asyncResponse as Question[])
      } catch (error) {
        console.log(error)
      }
    }
    fetchQuestions();
  }, [])

  const convertAnswerOptionsToArray = () => {
    return Object.entries(questions[currentQuestionIndex].choices) as any[]
  }

  const answerClickCallEventHandler = (responseId: string) => {
    console.log("Answer response!", responseId)
  }
  const handleNextButtonClick = (e: any) => {
    // POIJ: fix index out of range issues
    if ((currentQuestionIndex + 1) < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      console.log(`Current value ${currentQuestionIndex + 1} and question array length ${questions.length}`)
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="interaction-pane">
        <QuestionPane progressLabelCaption={`Question ${currentQuestionIndex + 1}/${questions.length}`} questionText={questions[currentQuestionIndex].question} />
        <div className="answer-pane">
          {convertAnswerOptionsToArray().map((answerOption, index) => {
            return (
              <AnswerOption key={index} responseId={answerOption[0]} answerCaption={answerOption[1]} clickCallBackFunction={answerClickCallEventHandler} />
            )
          })}
        </div>
        <div className="feedback-pane">
          <div onClick={handleNextButtonClick}>
            Next
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
