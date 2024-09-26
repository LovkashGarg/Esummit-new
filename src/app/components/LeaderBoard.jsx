// components/Leaderboard.jsx

import React from 'react';
import './Leaderboard.css'; // Import the CSS file

const Leaderboard = () => {
  const leaders = [
    {position:1, name: 'Rahul', score: 15 },
    {position:2,  name: 'Shyam', score: 12 },
    {position:3, name: 'Arjun', score: 10 },
  ];

  return (
    <>
      <div className='mt-[30%] md:mt-[10%] text-2xl text-center  md:text-3xl '>Leaderboard</div>
    <div className="leaderboard-container">
      {leaders.map((leader, index) => (
        <div className="card  rounded-lg" key={index}>
           <div className="text-yellow-500  text-[20px]  md:text-[50px] mb-2">👑</div>
          <h2 className="rank">#{leader.position}</h2>
          <h3 className="name">{leader.name}</h3>
          <p className="score">Score: {leader.score}</p>
        </div>
      ))}
    </div>
    </>
  );
};

export default Leaderboard;
