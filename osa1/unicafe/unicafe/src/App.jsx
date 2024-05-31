import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td> 
  </tr>
)

const Average = ({good, neutral, bad}) => {
  const totalVotes = good + neutral + bad
  const average = totalVotes ? (good * 1 + neutral * 0 + bad * (-1)) /totalVotes : 0
  return(
    <StatisticLine text="average" value={average} />

  )

}
const Statistics = ({ good, neutral, bad, total }) => {
  
  const positive = total ? (good/ total) *100 : 0

  if (total === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <h2>No feedback given</h2>
      </div>
    );
  }

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="total" value={total} />
          <Average good={good} neutral={neutral} bad={bad} />
          <StatisticLine text="positive" value={positive.toFixed(2) + " %"} />
        </tbody>
      </table>
    </div>
  );
};



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGoodClick = () => {
    const updadeGood = good + 1
    setGood(updadeGood)
    setTotal(total+ 1) 
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    setTotal(total + 1);
  }
  const handleBadClick = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad)
    setTotal(total + 1)
  }
  
  
  return (
    <div>
    <h1>Give Feedback</h1>
    <button onClick={handleGoodClick}>Good</button>
    <button onClick={handleNeutralClick}>Neutral</button>
    <button onClick={handleBadClick}>Bad</button>
    
    <Statistics good={good} neutral={neutral} bad={bad} total = {total}/>
    
    
  </div>
  )
}



export default App