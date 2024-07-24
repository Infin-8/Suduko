import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from "../../util/styles"


const Complete = () => {

    const nav = useNavigate(), { diff } = useParams()

    useEffect(() => {

        let interval = setInterval(() => { nav(`/boards/${diff}`) }, 2000);
        return () => clearInterval(interval)

        // eslint-disable-next-line
    }, [])


    return (

        <div style={styles.messageContainer()}>

            <div style={styles.messageMain()}>
                <p style={{ ...styles.message(), fontSize: "x-large" }}>
                    You already Completed this board...
                </p>
            </div>

        </div>
    )
}

export default Complete