import React from "react"
import { nanoid } from "nanoid"

import Intro from "./components/Intro"
import Quiz from "./components/Quiz"
import Background from "./components/Background"
import shuffle from "./functions/Shuffle.js"

import "./styles/Style.scss"
import "./styles/Intro.scss"
import "./styles/Quiz.scss"
import "./styles/Background.scss"
import Copyright from "./components/Copyright"

export default function App() {
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [questions, setQuestions] = React.useState([])

    async function startQuiz(apiUrl) {
        setIsPlaying(true)
        setQuestions([])
        const res = await fetch(apiUrl)
        const data = await res.json()
        const questionsData = data.results.map(item => {
            const { category, type, difficulty, question, correct_answer, incorrect_answers } = item
            return {
                id: nanoid(),
                category: category,
                type: type,
                difficulty: difficulty,
                question: question,
                answers: shuffle([correct_answer, ...incorrect_answers]),
                correctAnswer: correct_answer
            }
        })
        setQuestions(questionsData)
    }

    return (
        <>
            {!isPlaying && <Intro startQuiz={startQuiz} />}
            {isPlaying && !!questions.length && <Quiz questions={questions} setIsPlaying={setIsPlaying} startQuiz={startQuiz} />}
            <Background />
            <Copyright />
        </>
    )
}