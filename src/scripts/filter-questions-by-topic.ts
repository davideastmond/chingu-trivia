import { QuestionType } from "../definitions/question-type"
import { Question } from "../interfaces/question"

export function filterQuestionsByTopic(input: Question[], topic: QuestionType): Question[] {
  if (topic === "all") {
    return input
  }
  return input.filter((question) => {
    return question.topic === topic
  })
}
