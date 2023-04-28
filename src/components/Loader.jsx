const Loader = () => {
  return (
    <>
      <div className='question-container'>
        <div className='question loading-bg'>
          <div className='loading-bg-masker'></div>
        </div>
        <div className='answers'>
          <div className='loading-choices'></div>
          <div className='loading-choices'></div>
          <div className='loading-choices'></div>
          <div className='loading-choices'></div>
        </div>
        <div className='line'></div>
      </div>
    </>
  )
}
export default Loader