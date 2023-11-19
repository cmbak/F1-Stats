import { useState } from 'react'
import DriverStandings from './components/DriverStandings'
import PodiumDriverCard from './components/PodiumDriverCard'
import PodiumCards from './components/PodiumCards'

function App() {
  return (
    <>
      <DriverStandings />
      <PodiumCards />
    </>
  )
}

export default App
