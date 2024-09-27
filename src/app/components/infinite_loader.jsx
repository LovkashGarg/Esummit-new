// components/InfinityLoader.jsx

import React from 'react';
import './InfinityLoader.css'; // Import CSS for styling

const InfinityLoader = () => {
  return (
    <div className="infinity-loader">
  <div className="bg">
    {/* <!--background circles--> */}
    <div className="left-bg"></div>
    <div className="right-bg"></div>
  </div>
  <div className="fg">
    {/* <!--foreground circles--> */}
    <div className="top-left-rect">
      <div></div>
    </div>
    <div className="bottom-right-rect">
      <div></div>
    </div>
    <div className="top-right-rect">
      <div></div>
    </div>
    <div className="bottom-left-rect">
      <div></div>
    </div>
  </div>
</div>
  );
};

export default InfinityLoader;
