import axios from "axios";
import { Question } from "../interfaces/question";
import { filterQuestionsByTopic } from "./filter-questions-by-topic";
const API = process.env.REACT_APP_API_ENDPOINT as string

export async function fetchQuestions(topic?: "html" | "css" | "javascript") {
  const questions = await getQuestionsFromAPI();

  if (topic) {
    const filteredQuestions = filterQuestionsByTopic(questions, topic)
    return shuffleQuestionArray(filteredQuestions).slice(0, 10)
  }
  return shuffleQuestionArray(questions).slice(0, 10)
}

async function getQuestionsFromAPI() {
  const result = await axios.get(API)
  return result.data
}

function shuffleQuestionArray(questions: Question[]): Question[] {
  const cloneArray = Array.from(questions);

  for (let i = cloneArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = cloneArray[i]
    cloneArray[i] = cloneArray[j]
    cloneArray[j] = temp
  }
  return cloneArray;
}

