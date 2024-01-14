import { useState } from 'react'

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [maxVotes, setMaxVotes] = useState(0)

  const handleRandom = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNumber);

  }

  const handleVote = () => {
    setVotes((previousVotes) => {
      const updatedVotes = [...previousVotes];
      updatedVotes[selected] += 1;
      if (updatedVotes[selected] > updatedVotes[maxVotes]) {
        setMaxVotes(selected);
      }

      return updatedVotes;
    });
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>Votes: {votes[selected]}</p>
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleRandom}>Next Anecdote </button>

      <h2>Anecdote with the most votes</h2>
      <p>{anecdotes[maxVotes]}</p>
      <p>Votes: {votes[maxVotes]}</p>
    </div>
  )
}

export default App