import React from "react";

export function PrizePool() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-900 rounded-lg p-6 shadow-lg max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2">Prize Pool</h2>
      <div className="flex items-center justify-center">
        <span className="text-6xl font-extrabold text-yellow-400">₹80K</span>
      </div>
      <p className="mt-4 text-lg text-white">Win exciting prizes in our upcoming event!</p>
    </div>
  );
}
