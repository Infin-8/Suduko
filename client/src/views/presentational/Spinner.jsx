import React, { useState, useEffect } from 'react'
import styles from '../../util/styles'

const Spinner = ({ diff }) => {

    const [loading, setloading] = useState(true)

    useEffect(() => {

        let timeout = setTimeout(() => { setloading(false) }, 20000)
        return () => clearTimeout(timeout)

    }, [])


    return (

        <div style={styles.spinnerContainer()}>
            <div style={styles.spinner()}>
                <div className='center marg' id='anime' style={{ marginBottom: "1%" }}>
                    {loading ? <div className="loader center" /> : <p>{`We couldn't find any ${diff} boards`}</p>}
                </div>
            </div>
        </div>
    )
}

export default Spinner