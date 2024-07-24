import styles from "../../util/styles"


const BoardPiece = ({ i, color, mini, handleUseNumber = (f) => f, handleDelete = (f) => f, options, dict, mutable, trash, deletable }) => (

    <div
        style={styles.grid(i, color, mini)}
        className="num"
        onClick={() => {
            if (options?.[dict]?.length && mutable) handleUseNumber(currentNum, i)
            else if (trash && deletable) handleDelete(i)
        }}
    >
        {value}
    </div>
)

export default BoardPiece