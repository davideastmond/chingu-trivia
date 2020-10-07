import React, { useState, useEffect } from 'react';
import './App.css';
import AnswerOption from './components/buttons/answer-option/answer-option';
import Header from "./components/panes/header/header"
import QuestionPane from './components/panes/question-pane/question-pane';
import QuestionFilterOption from './components/pop-overs/option-menu/option-menu';
import NextButton from "./components/buttons/next-button/next-button";
import FeedbackMessage from "./components/labels/feedback-message"
import { QuestionType } from './definitions/question-type';
import { Question } from './interfaces/question';
import { defaultQuestion } from './scripts/default-question';


import { fetchQuestions } from "./scripts/fetch-questions"
import { loadSavedQuestionPreference } from './scripts/load-saved-question-prefs';
import userEvent from '@testing-library/user-event';
import ResetButton from './components/buttons/reset-button/reset-button';

async function loadQuestions(questionPreference: QuestionType) {
  return fetchQuestions(questionPreference);
}

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState(defaultQuestion);
  const [optionMenuStatus, setOptionMenuStatus] = useState(false);
  const [questionType, setQuestionType] = useState(loadSavedQuestionPreference());
  const [playerScore, setPlayerScore] = useState(0);
  const [feedBackButtonsVisible, setFeedbackButtonsVisible] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [nextButtonCaption, setNextButtonQuestion] = useState("NEXT");
  const [canAnswerQuestion, setCanAnswerQuestion] = useState(true);
  const [gameOver, setGameOver] = useState(false)

  async function fetchQuestions() {
    const questionPreference = loadSavedQuestionPreference();
    try {
      const asyncResponse = await loadQuestions(questionPreference as QuestionType);
      setQuestions(asyncResponse as Question[])
      setQuestionType(questionPreference);
    } catch (error) {
      console.log(error)
    }
  }

  async function refreshQuestions() {
    const asyncResponse = await loadQuestions(questionType as QuestionType);
    setQuestions(asyncResponse as Question[])
  }

  const resetGame = () => {
    setGameOver(false)
    setCanAnswerQuestion(true)
    setFeedbackButtonsVisible(false)
    setPlayerScore(0)
    setCurrentQuestionIndex(0)
    setFeedbackMessage("")
    fetchQuestions();
  }

  useEffect(() => {
    fetchQuestions();
  }, [])

  useEffect(() => {
    refreshQuestions();
  }, [questionType])

  useEffect(() => {
    console.log(`${playerScore}| ${questions.length}`)
  }, [playerScore])

  const convertAnswerOptionsToArray = () => {
    return Object.entries(questions[currentQuestionIndex].choices) as any[]
  }

  const answerClickCallEventHandler = (responseId: string) => {
    if (canAnswerQuestion === true) {
      if (responseId === questions[currentQuestionIndex].answer) {
        // Answer is correct
        setCanAnswerQuestion(false)
        setFeedbackMessage("That's correct.")
        setPlayerScore(playerScore + 1)
        setFeedbackButtonsVisible(true)
      } else {
        // Incorrect answer.
        setCanAnswerQuestion(false)
        setFeedbackMessage("Sorry, that answer is not correct.")
        setFeedbackButtonsVisible(true)
      }
    }
  }
  const handleNextButtonClick = () => {
    // POIJ: fix index out of range issues
    setCanAnswerQuestion(true);
    setFeedbackButtonsVisible(false);
    if ((currentQuestionIndex + 1) < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setCanAnswerQuestion(false)
      setGameOver(true)
      setFeedbackMessage(`Thanks for playing. Your score is ${playerScore}/${questions.length}`);
      setFeedbackButtonsVisible(true)
    }
  }



  const questionMenuClickHandler = () => {
    setOptionMenuStatus(true);
  }

  const questionMenuCloseButtonClickHandler = () => {
    setOptionMenuStatus(false);
    // If user changes their question type, reset everything
    if (questionType !== loadSavedQuestionPreference()) {
      setQuestionType(loadSavedQuestionPreference())
      resetGame();
    }
  }

  const clearGameButtonClickHandler = () => {
    resetGame()
  }

  return (
    <div className="App">
      {optionMenuStatus === true && <QuestionFilterOption optionMenuCloseButtonClick={questionMenuCloseButtonClickHandler} />}
      <Header questionsMenuClickCallBack={questionMenuClickHandler} />
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
          {feedBackButtonsVisible === true && <FeedbackMessage messageText={feedbackMessage} />}
          {(feedBackButtonsVisible === true && gameOver === false) && <NextButton buttonText={nextButtonCaption} buttonClickHandler={handleNextButtonClick} />}
          {(feedBackButtonsVisible === true && gameOver === true) && <ResetButton buttonClickHandler={clearGameButtonClickHandler} />}
        </div>
      </div>
    </div>
  );
}

export default App;
