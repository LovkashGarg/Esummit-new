import React from 'react'
import Leaderboard from '../components/LeaderBoard'
import { ExpandableCardDemo } from './Expandable_Card_Demo'
import Navbar from '../components/Navbar'
const page = () => {
  return (
    <>
    <Navbar/>
<Leaderboard/>
<ExpandableCardDemo/>
    </>
  )
}

export default page