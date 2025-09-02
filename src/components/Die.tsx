import type { JSX } from "react"

type DieProps = {
    value: number,
    isHeld: boolean,
    holdDice: (id: string) => void,
    id: string
}

export default function Die({ value, isHeld, holdDice, id }: DieProps): JSX.Element {

    const styles = {
        backgroundColor: isHeld ? "#59E391" : "#fff"
    }

    return (
        <button className="dice-btn" onClick={() => holdDice(id)} style={styles}> {value}  </button>
    )
}