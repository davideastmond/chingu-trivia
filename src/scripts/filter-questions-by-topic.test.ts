import { filterQuestionsByTopic } from "./filter-questions-by-topic"
import { MOCK_DATA } from "./mock-api-response"

test("filters questions by topic correctly", () => {
  const functionOutput = filterQuestionsByTopic(MOCK_DATA, "html")
  expect(functionOutput.every((question) => {
    return question.topic === "html"
  }))
})
