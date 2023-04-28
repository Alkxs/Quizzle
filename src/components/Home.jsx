import quiz from '../public/quiz.svg'

function Home(props) {

  return (
    <>
      <div className='home-container'>
        <h1 className='home-title'>Quizzle</h1>
        <div className='img-container'>
          <img src={quiz} alt='quiz-image' />
        </div>

        <p className='home-subtitle'>Enter a world of trivia and challenge your brain</p>

        <div className='options-container'>
          <div className='select-container'>
            <label className='custom-label' htmlFor='category'>
              Category:
            </label>

            <select name='category' id='category' className='custom-select' value={props.options.category} onChange={props.handleChange}>
              <option value=''>Any Category</option>
              <option value='9'>General Knowledge</option>
              <option value='10'>Entertainment: Books</option>
              <option value='11'>Entertainment: Film</option>
              <option value='12'>Entertainment: Music</option>
              <option value='13'>Entertainment: Musicals &amp; Theatres</option>
              <option value='14'>Entertainment: Television</option>
              <option value='15'>Entertainment: Video Games</option>
              <option value='16'>Entertainment: Board Games</option>
              <option value='17'>Science &amp; Nature</option>
              <option value='18'>Science: Computers</option>
              <option value='19'>Science: Mathematics</option>
              <option value='20'>Mythology</option>
              <option value='21'>Sports</option>
              <option value='22'>Geography</option>
              <option value='23'>History</option>
              <option value='24'>Politics</option>
              <option value='25'>Art</option>
              <option value='26'>Celebrities</option>
              <option value='27'>Animals</option>
              <option value='28'>Vehicles</option>
              <option value='29'>Entertainment: Comics</option>
              <option value='30'>Science: Gadgets</option>
              <option value='31'>Entertainment: Japanese Anime &amp; Manga</option>
              <option value='32'>Entertainment: Cartoon &amp; Animations</option>
            </select>
          </div>

          <div className='select-container'>
            <label className='custom-label' htmlFor='difficulty'>
              Difficulty:
            </label>

            <select name='difficulty' id='difficulty' className='custom-select' value={props.options.difficulty} onChange={props.handleChange}>
              <option value=''>Any Difficulty</option>
              <option value='easy'>Easy</option>
              <option value='medium'>Medium</option>
              <option value='hard'>Hard</option>
            </select>
          </div>

          <div className='select-container'>
            <label className='custom-label' htmlFor='type'>
              Type of questions:
            </label>

            <select name='type' id='type' className='custom-select' value={props.options.type} onChange={props.handleChange}>
              <option value=''>Any Type</option>
              <option value='multiple'>Multiple Choice</option>
              <option value='boolean'>True / False</option>
            </select>
          </div>

          <div className='select-container'>
            <label className='custom-label' htmlFor='number'>
              Number of questions:
            </label>
            <div className='validation-container'>
              <input
                type='number'
                name='number'
                id='number'
                min='1'
                max='25'
                className={`custom-select ${props.options.number < 1 || props.options.number > 25 ? 'invalid' : ''}`}
                value={props.options.number}
                onChange={props.handleChange}
              ></input>
              {props.options.number < 1 || props.options.number > 25 ? <small className='validation-message'>Number must be between 1 and 25</small> : null}
            </div>
          </div>
        </div>

        <button className='main-button' onClick={() => props.startGame()} disabled={props.options.number < 1 || props.options.number > 25}>
          Start quiz
        </button>

        <footer className='footer'>{new Date().getFullYear()} Alex Lauri with Open Trivia Api</footer>
      </div>
    </>
  )}

export default Home