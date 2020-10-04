import { Question } from "../interfaces/question"

export function filterQuestionsByTopic(input: Question[], topic: "html" | "css" | "javascript"): Question[] {
  return input.filter((question) => {
    return question.topic === topic
  })
}
