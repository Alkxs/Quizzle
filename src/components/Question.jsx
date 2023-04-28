import {nanoid} from 'nanoid'

function Question(props) {
  const answers= props.el.answers

  function handleClick(answer) {
    if (props.el.checked) {
      return
    }
    props.setAnswer(props.id, answer)
  }

  const answersElement = answers.map((answer) => {
    let id = null
    if (props.el.checked){
      if (answer === props.el.correct) {
        if (answer === props.el.selected) {
          id = 'correct-chosen'
        } else {
          id = 'correct'
        }
      } else if (answer === props.el.selected) {
        id = 'incorrect'
      } else {
        id = 'not-selected'
      }
    }

    return (
      <button
        key={nanoid()}
        id={id}
        onClick={() => handleClick(answer)}
        className={answer === props.el.selected ? 'btn-selected' : 'btn'}
      >
        {answer}
      </button>
    )
    })
  return (
    <div className='question-container'>
      <h3 className='question'>{props.question}</h3>
      <div className='answers'>{answersElement}</div>
      <div className='line'></div>
    </div>
  )
}

export default Question
