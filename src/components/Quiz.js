import React from "react"
import Question from "./Question"

export default function Quiz({ questions, setIsPlaying, startQuiz }) {
    const [responses, setResponses] = React.useState(questions.map(question => {
        return { id: question.id, answer: "" }
    }))
    const [quizResults, setQuizResults] = React.useState(new Array(questions.length).fill(false))
    const [isChecked, setIsChecked] = React.useState(false)

    React.useEffect(() => {
        setResponses(questions.map(question => {
            return { id: question.id, answer: "" }
        }))
    }, [questions])

    function handleClick(answer, id) {

        setResponses(prevResponses => prevResponses.map(response => {

            if (response.id === id) {
                if (response.answer) {
                    if (response.answer === answer) {
                        return { id, answer: "" }
                    } else {
                        return { id, answer }
                    }
                } else {
                    return { id, answer }
                }
            } else {
                return response
            }
        }))
    }

    function handleSubmit() {
        const quizResultsArray = responses.map((response, index) => {
            return response.answer === questions[index].correctAnswer
        })
        setQuizResults(quizResultsArray)
        setIsChecked(true)
    }

    function backToMenu() {
        setIsPlaying(false)
        setIsChecked(false)
    }

    const questionsEl = questions.map((question, index) => {
        return (
            <Question
                key={question.id}
                questionData={question}
                handleClick={handleClick}
                response={responses.find(response => response.id === question.id)}
                quizResult={quizResults[index]}
                isChecked={isChecked}
            />
        )
    })

    function getScore() {
        const correctAnsNum = quizResults.filter(result => result).length
        return `${correctAnsNum}/${quizResults.length}`
    }

    return (
        <main className="quiz">
            {questionsEl}
            <div className="quiz--result">
                {isChecked && <p className="quiz--score">You scored {getScore()} correct answers</p>}
                <div className="buttons--container">
                    <button className="quiz--btn check--answers" onClick={handleSubmit} >
                        Check answers
                    </button>
                    {
                        isChecked &&
                        <div className="logo--buttons">
                            <a className="quiz--btn twitter" rel="noreferrer" target="_blank" href={`https://twitter.com/intent/tweet?text=I%20scored%20${getScore()}%20on%20Quizzical!%0Ahttps%3A//quizzical-mg.netlify.app/`}>
                                <i className="fa fa-twitter" aria-hidden="true"></i>
                            </a>
                            <button className="quiz--btn play--again" onClick={backToMenu}><i className="fa fa-undo" aria-hidden="true"></i></button>
                        </div>
                    }

                </div>
            </div>
        </main>
    )
}