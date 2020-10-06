export function loadSavedQuestionPreference(): string {
  /**
   * read session
   */
  const result = window.localStorage.getItem("question-type-preference")
  if (result === null || result === "null") {
    console.log("No preferences for question type found: creating")
    window.localStorage.setItem("question-type-preference", "all")
    return "all"
  }
  console.log("Found question preference", result)
  return result
}
