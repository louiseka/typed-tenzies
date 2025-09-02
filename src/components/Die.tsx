export default function Die(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#fff"
    }

    return (

        <button className="dice-btn" onClick={() => props.holdDice(props.id)} style={styles}> {props.value}  </button>

    )
}