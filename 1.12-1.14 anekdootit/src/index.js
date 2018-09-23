import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      maxVotesIndex:-1,
      points: {
        0:0,
        1:0,
        2:0,
        3:0,
        4:0,
        5:0
      }
    }
  }

  onRandomBtnClick = () =>
  {
    const newSelected =parseInt(Math.random()*(anecdotes.length).toFixed(0),10)
        
    this.setState( (prevState) => (
      {
        selected: newSelected
      }),
    )
    console.log(newSelected)
  }

  onVoteBtnPressed = () =>
  {
    console.log("vote button click!")
    // copy
    const pointsCopy = {...this.state.points}
    pointsCopy[this.state.selected] = pointsCopy[this.state.selected]+1
    this.setState( (prevState) => (
      {
        points: pointsCopy
      }),
      this.updateStatistics
    )
  }

  updateStatistics  = () =>
  {
    let maxindex = -1
    let maxvalue = -1
    console.log("updateStatistics()")
    const pointsCopy = {...this.state.points}
    console.log(pointsCopy)
    let i;
    for (i = 0; i < 6; i++) { 
      if (pointsCopy[i]>maxvalue)
      {
        maxindex = i
        maxvalue = pointsCopy[i]
      }
    }
    this.setState( (prevState) => (
      {
        maxVotesIndex: maxindex
      })
    )
    this.forceUpdate() 
    console.log(maxindex, maxvalue)
  }

  render() {
    return (
      <div>
        {this.props.anecdotes[this.state.selected]}
        <div>
          <button onClick={this.onRandomBtnClick}> random </button>
          <button onClick={this.onVoteBtnPressed}> vote </button>
        </div>
        <p>
        <b>Anecdote with most votes:</b>
        </p>
        {this.props.anecdotes[this.state.maxVotesIndex]}

      </div>

    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)