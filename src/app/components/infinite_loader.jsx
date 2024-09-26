// components/InfinityLoader.jsx

import React from 'react';
import './InfinityLoader.css'; // Import CSS for styling

const InfinityLoader = () => {
  return (
    <div className="infinity-loader">
      <div className="infinity-symbol"></div>
      <p>Loading...</p>
    </div>
  );
};

export default InfinityLoader;
