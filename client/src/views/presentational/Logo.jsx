import styles from "../../util/styles"

const Logo = () => ["S", "U", "", "", "D", "O", "K", "", "U"]
    .map((letter, i) => <div key={`logo-${i}`} id={i === 4 ? "spinner" : null} style={styles.logo(i)}>{letter}</div>)

export default Logo