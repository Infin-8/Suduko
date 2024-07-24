import styles from "../../util/styles"

const Tools = ({ hasContext, propKey, dict, trash, annotate, i, value, handleTrash, handleUndo, setCurrentNum, setDict, setTrash, handlePencil = (f) => f }) => (

    <div
        style={styles.tools(hasContext, propKey, dict, trash, i, annotate)}
        className="tool"
        id="tools"
        onClick={() => {
            if (!isNaN(value) && hasContext) {
                setCurrentNum(value)
                setDict(propKey)
                setTrash(false)
            }
            else if (value === "↩") handleUndo()
            else if (value === "🗑") handleTrash()
            else if (value === "✏") handlePencil()
        }}
        title={value === "↩" ? "Undo" : value === "🗑" ? "Delete" : value === "✏" ? "Annotate" : null}>
        {value}
    </div>
)

export default Tools