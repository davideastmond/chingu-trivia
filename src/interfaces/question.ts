export interface Question {
  question: string
  id: number
  topic: string
  choices: {
    [keyof: string]: string
  }
  answer: string
}
