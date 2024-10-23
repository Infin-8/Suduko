import styles from "../../util/styles"

const Board = ({
    mini = false,
    value,
    options = null,
    dict = null,
    mutable = null,
    trash = null,
    pencil = null,
    deletable = null,
    color,
    currentNum = null,
    i,
    annotate,
    board,
    duplicates,
    handleUseNumber = (f) => f,
    handleDelete = (f) => f,
    handleAnnotate = (f) => f,
    checkDuplicates = (f) => f,
    setDuplicates = (f) => f

}) => (

    <div
        style={styles.grid(i, color, mini, annotate, duplicates)}
        className={mini ? null : "num"}
        id={`grid-piece-${i}`}
        onClick={() => {
            if (options?.[dict]?.length && mutable && !pencil.annotate) {
                handleUseNumber(currentNum, i)
                setDuplicates(checkDuplicates({ index: i, board, currentNum }))
            }
            else if (trash && deletable && value) handleDelete(i)
            else if (pencil.annotate && mutable) handleAnnotate(i)
        }}
    >
        {
            annotate?.render ? annotate.values.map((num, i) => num.shouldRender
                ? <div key={`pencil-${i}`} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{num.value}</div>
                : <div key={`nopencil-${i}`} style={{ display: "flex", justifyContent: "center", alignItems: "center" }} />)
                : value
        }

    </div>
)

export default Board