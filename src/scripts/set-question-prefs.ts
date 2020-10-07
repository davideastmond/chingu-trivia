import { QuestionType } from "../definitions/question-type";

export function setQuestionPreferences(pref: QuestionType): void {
  window.localStorage.setItem("question-type-preference", pref)
}
