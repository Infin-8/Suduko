import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/Provider/Connect'
import { compose } from '../../util/helpers'
import { getStartButtons } from '../../util/helpers'
import actions from '../../util/actions'
import styles from '../../util/styles'
import Logo from '../presentational/Logo'


function StartScreen() {

    const { dispatcher } = useStore(),
        nav = useNavigate()


    useEffect(() => {

        compose(actions.resetBoards, dispatcher.setBoards)()

        // eslint-disable-next-line
    }, [])


    return (

        <div style={styles.mainContainer()}>

            <div style={styles.startScreenContainer()}>

                <div id="logo-container" style={styles.logoContainer()}>

                    <Logo />

                </div>

                <div style={styles.startScreenBtnContainer()}>

                    {
                        getStartButtons()
                            .map(({ filter, color, value }, i) => (

                                <div
                                    key={`startBtn${i}`}
                                    style={styles.startScreenBtns(color)}
                                    onClick={() => nav(`/boards/${filter}`)}>
                                    {value}
                                </div>

                            ))
                    }

                </div>

            </div>

        </div>
    )
}

export default StartScreen