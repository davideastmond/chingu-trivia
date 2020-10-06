import { QuestionType } from "../definitions/question-type";

export function setQuestionPreferences(pref: QuestionType): void {
  console.log(`Preference ${pref} saved to localStorage`)
  window.localStorage.setItem("question-type-preference", pref)
}
