// components/Leaderboard.jsx

import React, { useEffect, useState } from 'react';
import './Leaderboard.css'; // Import the CSS file

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/leaderboard'); // Update the URL as per your API endpoint
        const data = await response.json();

        if (data.success) {
          setLeaders(data.data.slice(0, 3)); // Get only the top 3 users
        } else {
          console.error('Failed to fetch leaderboard:', data.message);
        }
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, []);


  return (
    <>
      <div className='mt-[30%] md:mt-[10%] text-2xl text-center  md:text-3xl '>Leaderboard</div>
    <div className="leaderboard-container">
      {leaders.map((leader, index) => (
        <div className="card  rounded-lg" key={index}>
           <div className="text-yellow-500  text-[20px]  md:text-[50px] mb-2">👑</div>
          <h2 className="rank">#{index+1}</h2>
          <h3 className="name">{leader.username}</h3>
          <p className="score">{leader.email}</p>
          <p className="score">Score: {leader.referralCount}</p>
        </div>
      ))}
    </div>
    </>
  );
};

export default Leaderboard;
