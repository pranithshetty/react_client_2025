import React, { useState } from 'react';

const accordionData = [
  {
    id: 'section1',
    title: 'What is React?',
    content: 'React is a JavaScript library for building user interfaces.',
    isOpen: true,
  },
  {
    id: 'section2',
    title: 'What is a component?',
    content: 'A component is a reusable piece of UI in a React application.',
    isOpen: false,
  },
  {
    id: 'section3',
    title: 'What is state in React?',
    content:
      'State is an object that determines how that component renders and behaves.',
    isOpen: false,
  },
];

function Accordian() {
  const [acData, setAcData] = useState(accordionData);

  function handleClick(id, isOpen) {
    setAcData((prev) => {
      return prev.map((data) => {
        if (data.id === id) {
          return { ...data, isOpen: true };
        } else {
          return { ...data, isOpen: false };;
        }
      });
    });
  }

  return (
    <div>
      {acData.map((data) => {
        const { id, title, content, isOpen } = data;
        return (
          <div id={id}>
            <h1 onClick={() => handleClick(id, isOpen)}>{title}</h1>
            {isOpen ? (
              <div>
                <li>{content}</li>
              </div>
            ) : (
              ''
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Accordian;
