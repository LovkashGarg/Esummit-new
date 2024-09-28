"use client"
import React, { useState } from 'react';

const CheckboxPopupMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const checkboxes = [
    { id: 1, label: 'OTH' },
    { id: 2, label: 'Startup Survival' },
    { id: 3, label: 'Big Bull' },
    { id: 4, label: 'Breaking Convention' },
    { id: 5, label: 'Brand Brawl' },
    { id: 6, label: 'E summit Junior' },
    { id: 7, label: 'Lights Out' },
    { id: 8, label: 'Stadium Showdown' },
  ];

  const toggleCheckbox = (id) => {
    if (selectedCheckboxes.includes(id)) {
      setSelectedCheckboxes(selectedCheckboxes.filter((checkboxId) => checkboxId !== id));
    } else {
      if (selectedCheckboxes.length < 3) {
        setSelectedCheckboxes([...selectedCheckboxes, id]);
      }
    }
    console.log(selectedCheckboxes);
  };

  const handleSubmit = () => {
    alert(`Selected Checkboxes: ${selectedCheckboxes.join(', ')}`);
    setIsOpen(false); // Close the popup after submission
  };

  return (
    <div className="container">
      <h1>Main Container</h1>
      <button onClick={() => setIsOpen(true)}>Open Popup Menu</button>

      {isOpen && (
        <div className="popup text-white ">
          <div className="popup-content  overscroll-none w-[75%] md:w-[30%]">
            <h2 className='md:text-[35px]  '>Select Events (Max 3)</h2>
            <div className='flex flex-col my-[8%] gap-3 px-[20%]'>
            {checkboxes.map((checkbox) => (
              <label key={checkbox.id} className='flex gap-4'>
                <input
                  type="checkbox"
                  checked={selectedCheckboxes.includes(checkbox.id)}
                  onChange={() => toggleCheckbox(checkbox.id)}
                />
                {checkbox.label}
              </label>
            ))}
            </div>
            <div className="popup-buttons  flex justify-between">
              <button className='text-white bg-green-800 rounded-[20px] w-[100px] ' onClick={handleSubmit} disabled={selectedCheckboxes.length < 1}>
                Submit
              </button>
              <button className='text-white bg-red-800 rounded-[20px] w-[100px] ' onClick={() => setIsOpen(false)}>X Close</button>
            </div>
          </div>
          <style jsx>{`
            .popup {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: rgba(0, 0, 0, 0.5);
              display: flex;
            //   opacity:0.9;
              justify-content: center;
              align-items: center;
            }
            .popup-content {
              background: black;
              padding: 20px;
              border-radius: 8px;
             
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .popup-buttons {
              margin-top: 10px;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default CheckboxPopupMenu;
