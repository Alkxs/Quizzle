import { useEffect, useState } from 'react'
import Home from './components/Home'
import Question from './components/Question'
import {nanoid} from 'nanoid'
import {decode} from 'html-entities'
import Loader from './components/Loader'


function App() {
  const [started, setStarted] = useState(false)
  const [questions, setQuestions] = useState([])
  const [score, setScore] = useState(0)
  const [checked, setChecked] = useState(false)
  const [loader, setLoader] = useState(false)
  const [options, setOptions] = useState({
    number: '5',
    category: '',
    difficulty: '',
    type: '',
  })
  const [error, setError] = useState(null)

  const startGame = () => {
    setStarted((prevStarted) => !prevStarted)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setOptions((prevOptions) => {
      return {
        ...prevOptions,
        [name]: value,
      }
    })
  }

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5)

  useEffect(() => {
    setLoader(true)
    setTimeout(() => {
      const getQuestions = async () => {
        try {
          const res = await fetch(
            `https://opentdb.com/api.php?amount=${options.number}&category=${options.category}&difficulty=${options.difficulty}&type=${options.type}`
          )
          const data = await res.json()

          if (data.results.length < options.number) {
            setError('Sorry, the number of questions selected exceeds the available questions. Please reload the page and try with different settings.')
          } else {
            const questions = data.results.map((question) => {
              const answers = shuffleArray([...question.incorrect_answers, question.correct_answer]).map((answer) => decode(answer, { level: 'html5' }))
              return {
                id: nanoid(),
                question: decode(question.question, { level: 'html5' }),
                answers: answers,
                correct: decode(question.correct_answer, { level: 'html5' }),
                checked: false,
                selected: null,
              }
            })
            setQuestions(questions)
            setLoader(false)
            console.log(questions)
          } 
        } catch (error) {
          console.log(error)
          setError('An error occurred while fetching questions')
        }
      }
      getQuestions()
    }, 1000);
  }, [started])

   function setAnswer(id, answer) {
    setQuestions(previousQuestion => 
    previousQuestion.map(question => 
    (question.id === id ?
     { ...question, selected: answer } : 
     question)))
    }

  function checkAnswers(){
    setChecked(true)
    setQuestions(elm=> elm.map(elms =>{
      return {...elms, checked:true}
    }))
  questions.map(question => {
      if (question.selected === question.correct) {
       return setScore((prev) => prev + 1)
      }})
  }

  function playAgain() {
    setChecked(false)
    setScore(0)
    setQuestions([])
    startGame()
  }

  const questionsElement = questions.map(el=> {

    return (
      <Question
          el={el}
          id={el.id}
          key={el.id}
          question={el.question}
          setAnswer={setAnswer}
        />
    )
  })

  const loaderElement = Array.from({ length: parseInt(options.number) }, (_, index) => (
    <Loader key={index} />
  ))
  
  return (
    <div className='global-container'>
      {!started ? (
        <Home startGame={startGame} handleChange={handleChange} options={options} />
      ) : (
        <div className='quiz-container'>
          {error ? (
            <span className='error'>{error}</span>
          ) : (
            <>
              <div className='questions-container'>{loader ? loaderElement : questionsElement}</div>
              {checked && (
                <span className='score'>
                  You scored {score}/{options.number} correct answers
                </span>
              )}
              <button className='check-button' onClick={checked ? playAgain : checkAnswers}>
                {checked ? 'Play again' : 'CheckAnswers'}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )

}

export default App


