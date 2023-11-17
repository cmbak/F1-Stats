import { useState } from 'react'
import DriverStandings from './components/DriverStandings'
import DriverComparisonCard from './components/DriverComparisonCard'

function App() {
  return (
    <>
      <DriverStandings />
      <div className='comparison-container'>
        <DriverComparisonCard/>
      </div>
    </>
  )
}

export default App
