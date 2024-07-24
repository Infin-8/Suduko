const styles = {

    main: () => ({
        display: "flex",
        height: "100vh",
        width: "99vw",
        background: "linear-gradient(to bottom, white 0%, mintcream 100%)",
        justifyContent: "center"
    }),

    boardGridContainer: (mini) => ({
        display: "grid",
        gridTemplateColumns: mini ? `repeat(9, 16px)` : `repeat(9, 49px)`,
        gridTemplateRows: mini ? `repeat(9, 16px)` : `repeat(9, 49px)`,
        gap: mini ? "2px 2px" : "2px 2px",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "1px 5px 7px black",
        margin: "0 29% 0 29.5%"
    }),

    miniBoardContainer: () => ({
        width: "20%",
        display: "flex",
        justifyContent: "center",
        alignItems: 'center'
    }),

    grid: (i, color, mini, annotate, duplicates) => annotate?.render ? ({
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        gridTemplateColumns: "repeat(3, 17px)",
        gridTemplateRows: "repeat(3, 17px)",
        border: "solid .5px limegreen",
        height: "100%",
        width: "100%",
        backgroundColor: [
            3, 4, 5,
            12, 13, 14,
            21, 22, 23,
            27, 28, 29,
            35, 34, 33,
            36, 37, 38,
            43, 42, 44,
            45, 46, 47,
            51, 52, 53,
            57, 58, 59,
            66, 67, 68,
            75, 76, 77
        ]
            .includes(i) ? "#99ffcc" : 'white',
    }) : ({
        border: "1px solid limegreen",
        borderLeftColor: [3, 12, 21, 33, 42, 51, 57, 66, 75].includes(i) ? "black" : "limegreen",
        borderTopColor: [27, 28, 29, 33, 34, 35, 57, 58, 59].includes(i) ? "black" : "limegreen",
        borderRightColor: [5, 14, 23, 29, 38, 47, 59, 68, 77].includes(i) ? "black" : "limegreen",
        borderBottomColor: [21, 22, 23, 45, 46, 47, 51, 52, 53].includes(i) ? "black" : "limegreen",
        width: mini ? "18px" : "53px",
        height: mini ? "18px" : "53px",
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: [
            3, 4, 5,
            12, 13, 14,
            21, 22, 23,
            27, 28, 29,
            35, 34, 33,
            36, 37, 38,
            43, 42, 44,
            45, 46, 47,
            51, 52, 53,
            57, 58, 59,
            66, 67, 68,
            75, 76, 77
        ]
            .includes(i) ? "#99ffcc" : 'white',
        color: duplicates?.includes(i) && duplicates?.length >= 2 ? 'red' : color,
        fontWeight: "100",
        fontFamily: mini ? "Arial" : 'rubik',
        textShadow: mini ? "0 0 0 black" : "1px 1px 3px black",
        fontSize: mini ? "93%" : "30px"
    }),

    gridContainer: () => ({
        display: "flex",
        // height: "33%",
        // width: "33%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }),

    header: () => ({
        color: "white",
        fontFamily: "Arial",
        fontSize: "130px",
        fontStretch: "ultra-expanded",
        textShadow: "2px 1px 2px black,3px 2px 3px #595959, 4px 3px 4px black"
    }),

    mainContainer: () => ({
        height: "100vh",
        display: 'flex',
        flexDirection: "column",
        backgroundColor: "#ccffe6",
        background: "linear-gradient(to bottom, mintcream 0%, #80ffbf 100%)"
    }),

    toolsGridContainer: () => ({
        display: "grid",
        gridTemplateColumns: " repeat(6, 70px)",
        gridTemplateRows: "repeat(2, 70px)",
        gap: "7px 7px",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: ".5%"
    }),

    tools: (hasContext, key, dict, trash, index, annotate) => ({
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        margin: "50px 0 0 0",
        height: "65px",
        width: "70px",
        boxShadow: !hasContext ? null : key === dict || (trash && index === 11) || (annotate && index === 5) ? "1px 3px 2px red" : "2px 3px 5px black",
        backgroundColor: !hasContext ? 'rgb(0, 0, 0, .5)' : (trash && index === 11) || key === dict || (annotate && index === 5) ? "whitesmoke" : null,
        fontWeight: "100",
        fontFamily: 'rubik',
        fontSize: [5, 10, 11].includes(index) ? "45px" : "30px"
    }),

    messageContainer: () => ({
        backgroundColor: "rgba(0,0,0,0.9)",
        width: "100vw",
        height: '100vh',
        zIndex: "1",
        left: "0",
        top: "0",
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }),

    messageMain: () => ({
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        width: "85%",
        textShadow: "1px 1px 1px mintcream"
    }),

    ActionBtnMain: () => ({
        display: 'flex',
        justifyContent: "space-between"
    }),

    message: cond => ({
        color: !!cond ? 'red' : 'limegreen',
        fontSize: "45px",
        fontFamily: 'rubik',
        fontWeight: "bold"
    }),

    levelContainer: () => ({
        display: "flex",
        width: "97.4vw",
        border: "3px inset whitesmoke",
        justifyContent: "space-evenly",
        margin: "0 0% 2% 0%",
        padding: "1.5%",
        color: "white",
        textShadow: "1px 1px 1px black",
        boxShadow: "0px 3px 10px black inset",
        borderRadius: "10px",
        fontFamily: "rubik"
    }),

    levelCardContainer: () => ({
        width: "45%"
    }),

    levelCardInfo: () => ({
        display: "flex",
        justifyContent: "space-between",
        width: "80%"

    }),

    levelCardFont: () => ({
        fontSize: "large",
        fontFamily: "Arial"
    }),

    playBtnContainer: () => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "10%"
    }),

    playBtn: (complete) => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        fontSize: "large",
        backgroundColor: 'whitesmoke',
        borderRadius: "7px",
        color: complete ? "mintcream" : "limegreen",
        borderColor: "white",
        textShadow: "2px 1px 2px black",
        fontFamily: "Arial"
    }),

    startScreenBtns: (color) => ({
        height: "25%",
        width: "100%",
        color: "white",
        textShadow: "2px 1px 2px black",
        fontSize: "x-large",
        borderRadius: "10px",
        boxShadow: "4px 4px 8px black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: `linear-gradient(to bottom right, whitesmoke 0%, ${color} 60%)`
    }),

    startScreenContainer: () => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        height: "100%"
    }),

    startScreenBtnContainer: () => ({
        display: "flex",
        flexDirection: "column",
        width: "30%",
        height: "30%",
        justifyContent: "space-evenly",
        alignItems: "center"
    }),

    logoContainer: () => ({
        display: "grid",
        gridTemplateColumns: "repeat(3, 33%)",
        gridTemplateRows: "repeat(3, 33%)",
        gap: "1% 1%",
        border: "20px outset #c5ffe2",
        width: "75%",
        height: "60%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "20px",
        boxShadow: "2px 1px 7px black"
    }),

    logo: i => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: [2, 3, 7].includes(i) ? "3px inset mintcream" : "4px outset mintcream",
        height: "98%",
        width: "98%",
        fontSize: "140px",
        borderRadius: "12px",
        backgroundColor: [2, 3, 7].includes(i) ? "#e6fff2" : "#80ffbf",
        color: "white",
        textShadow: "5px 2px 5px black",
        boxShadow: [2, 3, 7].includes(i) ? "1px 1px 5px black inset" : "1px 1px 5px black",
        transform: i === 4 ? "rotate(12deg)" : null,
        position: i === 4 ? 'relative' : null,
        fontFamily: "Arial"
    }),

    playingText: () => ({
        fontWeight: "bold",
        fontSize: "large",
        color: 'gold'
    }),

    spinnerContainer: () => ({
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom, mintcream 0%, #80ffbf 100%)"
    }),

    spinner: () => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        visibility: "visible",
        border: "16px solid #f3f3f3",
        borderRadius: "50%",
        borderTop: "16px solid cornflowerblue",
        width: "120px",
        height: "120px",
        animation: "spin 2s linear infinite"
    })

}

export default styles