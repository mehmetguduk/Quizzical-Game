import React from "react"
import categories from "../data/Categories"
import difficulties from "../data/Difficulties"
import { nanoid } from "nanoid"


export default function Intro({ startQuiz }) {
    const [number, setNumber] = React.useState(10)
    const [category, setCategory] = React.useState(0)
    const [difficulty, setDifficulty] = React.useState("any")

    function numberSelection(event) {
        const selectedValue = event.target.value
        setNumber(selectedValue)
    }

    function categorySelection(event) {
        const selectedValue = event.target.value
        setCategory(selectedValue)
    }
    function difficultySelection(event) {
        const selectedValue = event.target.value
        setDifficulty(selectedValue)
    }

    function handleStart() {
        let apiUrl = `https://opentdb.com/api.php?amount=${number}`;
        if (category === 0 & difficulty === "any") { }
        else if (category === 0 & difficulty !== "any") { apiUrl = apiUrl + `&difficulty=${difficulty}` }
        else if (category !== 0 & difficulty === "any") { apiUrl = apiUrl + `&category=${category}` }
        else { apiUrl = apiUrl + `&category=${category}&difficulty=${difficulty}` }
        apiUrl = apiUrl + "&type=multiple"
        startQuiz(apiUrl)
    }

    const categoryOptions = categories.map(category => {
        return (<option className="category" value={category.value} key={nanoid()}>{category.name}</option>)
    })

    const difficultyOptions = difficulties.map(difficulty => {
        return (<option className="difficulty" value={difficulty.value} key={nanoid()}>{difficulty.name}</option>)
    })

    return (
        <main className="intro">
            <h1 className="intro--header">Quizzical</h1>
            <p className="intro--description">Pick your category and difficulty. Get quiz about them.</p>


            <form className="game--options">

                <div className="input--group">
                    <label className="input--label" htmlFor="number--select">Number of Questions (between 5 and 50)</label>
                    <input
                        className="option--selector"
                        id="number--select"
                        type="text" 
                        inputMode="numeric" 
                        onChange={numberSelection}
                        value={number}
                    >
                    </input>
                </div>

                <div className="input--group">
                    <label className="input--label" htmlFor="category--select">Category</label>
                    <select
                        className="option--selector"
                        id="category--select"
                        onChange={categorySelection}
                        value={category}
                    >
                        {categoryOptions}
                    </select>
                </div>


                <div className="input--group">
                    <label className="input--label" htmlFor="difficulty--select">Difficulty</label>
                    <select
                        className="option--selector"
                        id="difficulty--select"
                        onChange={difficultySelection}
                        value={difficulty}
                    >
                        {difficultyOptions}
                    </select>
                </div>

            </form>


            <button className="intro--btn" onClick={handleStart}>Start quiz</button>
        </main>
    )
}