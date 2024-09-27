// components/InfinityLoader.jsx

import React from 'react';
import './InfinityLoader.css'; // Import CSS for styling

const InfinityLoader = () => {
  return (
    <div class="infinity-loader">
  <div class="bg">
    {/* <!--background circles--> */}
    <div class="left-bg"></div>
    <div class="right-bg"></div>
  </div>
  <div class="fg">
    {/* <!--foreground circles--> */}
    <div class="top-left-rect">
      <div></div>
    </div>
    <div class="bottom-right-rect">
      <div></div>
    </div>
    <div class="top-right-rect">
      <div></div>
    </div>
    <div class="bottom-left-rect">
      <div></div>
    </div>
  </div>
</div>
  );
};

export default InfinityLoader;
