import Die from "./components/Die"
import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

import type { JSX } from "react"

type DieType = {
  value: number,
  isHeld: boolean,
  id: string
}

export default function App() {

  //Generate a single die
  function generateNewDie(): DieType {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid()
    }
  }

  //Creating 10 random numbers between 1-6 and pushing to diceArray
  function allNewDice(): DieType[] {
    const diceArray = []
    for (let i = 0; i < 10; i++) {
      diceArray.push(generateNewDie())
    }
    return diceArray
  }

  const [dice, setDice] = useState<DieType[]>(allNewDice)
  const [tenzies, setTenzies] = useState<boolean>(false)

  useEffect(() => {
    const allHeld: boolean = dice.every(die => die.isHeld)
    const firstValue: number = dice[0].value
    const allSameValue: boolean = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }

  }

  function holdDice(id: string) {
    const result = dice.map(die => {
      if (die.id === id) {
        return {
          ...die,
          isHeld: !die.isHeld
        }
      } else {
        return die
      }
    })
    setDice(result)
  }

  const diceElements: JSX.Element[] = dice.map(die => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={holdDice}
        id={die.id} />
    )
  })

  return (
    <main>

      <div className="inner-main">
        {tenzies && <Confetti />}
        <h1>Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

        <div className="dice-container">
          {diceElements}
        </div>

        <button className="roll-btn" onClick={rollDice}> {tenzies ? "New Game" : "Roll"} </button>
      </div>

    </main>
  )

}