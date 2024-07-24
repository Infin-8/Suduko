import styles from "../../util/styles"

const BoardGridContainer = ({ children, mini = false }) => (

    <div id={mini ? "mini" : "main-grid-container"} style={styles.boardGridContainer(mini)}>

        {children}

    </div>
)

export default BoardGridContainer