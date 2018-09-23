import React from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.callBack}> {props.label} </button>
  )
}

const Statistics = (props) => {
  return (
    <div>
      <h1>Statistiikka</h1>
      <table>
        <tbody>
        <Statistic label={"hyvä"} value={props.goodCount} />
        <Statistic label={"neutraali"} value={props.neutralCount} />
        <Statistic label={"huono"} value={props.badCount} />
        <Statistic label={"keskiarvo"} value={props.average.toFixed(1)} />
        <Statistic label={"positiivisia"} value={props.goodPercentage.toFixed(1) + " %"} />
        </tbody>
      </table>
    </div>
  )
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.label}</td>
      <td>{props.value}</td>
    </tr>
    
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      badCount: 0,
      neutralCount: 0,
      goodCount: 0,
      average: 0,
      goodPercentage: 0
    }
  }

  updateAverageAndGoodPercentage = () =>
  {
    const good = this.state.goodCount
    const bad = this.state.badCount
    const neut =  this.state.neutralCount
    const total = good + neut + bad
    const ave = (good*1.0 + neut*0.0 + bad*-1.0) / total
    const goodper = (good / (good+neut+bad))*100.0
    //console.log("good", good, "bad", bad, "neut", neut)
    this.setState(
      {
        average: ave,
        goodPercentage: goodper
      }
    )
  }

  updateStatistics = (stateVariableToUpdate) => {
    const handler = () => {
      this.setState( (prevState) => (
        {
          [stateVariableToUpdate]: prevState[stateVariableToUpdate]+1
        }),
        this.updateAverageAndGoodPercentage
      )
    }
    return handler
  }

  helpRenderStatistics = () =>
  {
    if (this.state.goodCount===0 && this.state.neutralCount===0 && this.badCount === 0)
    {
      return (
        <div>
        <h1>Statistiikka</h1>
        <div>Ei yhtään palautetta annettu</div>
        </div>
      )
    }
    else
    {
      return <Statistics goodCount={this.state.goodCount} 
      neutralCount={this.state.neutralCount} 
      badCount={this.state.badCount}
      average={this.state.average}
      goodPercentage={this.state.goodPercentage}/>
    }
  }

  render() {
    return (
      <div>
        <div>
          <h1>Anna palautetta </h1>
            <div>
              <Button name= {"hyva"} label = {"hyvä"} callBack={this.updateStatistics("goodCount")}/> 
              <Button name= {"neutraali"} label= {"neutraali"} callBack={this.updateStatistics("neutralCount")}/>
              <Button huono= {"huono"} label= {"huono"} callBack={this.updateStatistics("badCount")}/>
            </div>
          {this.helpRenderStatistics()}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))