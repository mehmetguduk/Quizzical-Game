/*
    THIS FILE WAS DEVELOPED BY MEHMET GUDUK
    © 2022 COPYRIGHT, LICENSED WITH GPL-3.0 LICENSE, AUTHOR IS MEHMET GUDUK
    https://github.com/mehmetguduk
*/

import React from "react"
import { nanoid } from "nanoid"

export default function Question({ questionData, handleClick, response, quizResult, isChecked }) {

    function fixText(text) {
        return { __html: text };
    }

    const answersEl = questionData.answers.map(answer => {
        const isSelected = response && response.answer === answer
        function getClassName() {
            if (isSelected && !isChecked) {
                return "selected"
            }
            if (isChecked && answer === questionData.correctAnswer) {
                return "correct"
            }
            if (isSelected && isChecked && !quizResult) {
                return "incorrect"
            } if (!isSelected && isChecked && !(answer === questionData.correctAnswer)) {
                return "off"
            }
        }
        return (
            <span
                key={nanoid()}
                className={`question--answer ${getClassName()}`}
                onClick={() => {
                    if (!isChecked) {
                        handleClick(answer, questionData.id)
                    }
                }}
                dangerouslySetInnerHTML={fixText(answer)}
            >
            </span>
        )
    })

    return (
        <div className="question">

            <div className="question--info">
                <h5 className={`question--difficulty ${questionData.difficulty}`}> </h5>
                <h5 className="question--category">{questionData.category}</h5>
            </div>

            <h3 className="question--question" dangerouslySetInnerHTML={fixText(questionData.question)}></h3>
            <div className="question--answers">
                {answersEl}
            </div>
        </div>
    )
}