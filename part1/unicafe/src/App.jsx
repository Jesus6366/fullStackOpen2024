import React, { useState, useEffect } from 'react';

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, all, average }) => {
  return (
    <>
      <h2>statistics</h2>
      {all > 0 ? (
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={`${(good / all * 100).toFixed(2)}%`} />
          </tbody>
        </table>
      ) : (
        <h1>No feedback given</h1>
      )}
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [average, setAverage] = useState(0);
  const [all, setAll] = useState(0);

  useEffect(() => {
    if (all > 0) {
      setAverage((good - bad) / all);
    }
  }, [good, neutral, bad, all]);

  const handleButtonClick = (feedbackType) => {
    return () => {
      if (feedbackType === 'good') {
        setGood(good + 1);
      } else if (feedbackType === 'neutral') {
        setNeutral(neutral + 1);
      } else if (feedbackType === 'bad') {
        setBad(bad + 1);
      }
      setAll(all + 1);
    };
  };

  return (
    <div>
      <h3>give feedback</h3>
      <Button handleClick={handleButtonClick('good')} text="good" />
      <Button handleClick={handleButtonClick('neutral')} text="neutral" />
      <Button handleClick={handleButtonClick('bad')} text="bad" />

      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} />
    </div>
  );
};

export default App;
