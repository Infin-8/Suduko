import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../../store/Provider/Connect'
import { compose, getCurrentBoard, getPath } from '../../util/helpers'
import timestore from '../../util/timestore'
import actions from '../../util/actions'
import Timestamp from '../../util/timestamp'
import Request from '../../util/requests'
import axios from 'axios'
import styles from '../../util/styles'
import BoardGridContainer from './BoardGridContainer'
import Board from '../presentational/Board'
import Spinner from '../presentational/Spinner'


function BoardList() {

    const { dispatcher, getState } = useStore(),
        { boards } = getState(),
        nav = useNavigate(),
        { diff } = useParams(),
        { getTimeStamp, clearTime } = timestore


    useEffect(() => {

        axios.get(`http://localhost:8000/boards/getBoards/${diff}`)
            .then(res => compose(actions.loadBoards, dispatcher.setBoards)(res.data))
            .catch(console.error)

        // eslint-disable-next-line
    }, [])

    useEffect(() => {

        compose(actions.resetCurrent, dispatcher.setCurrent)()

        // eslint-disable-next-line
    }, [])

    useEffect(() => {

        if (Object.keys(getTimeStamp()).length) {

            const { id, time } = getTimeStamp()

            Request.updateTime(id, time)
                .then(res => compose(actions.updateTime, dispatcher.setBoards)({ id: res.data._id, time: res.data.playingSince }))
                .finally(() => clearTime())
                .catch(console.error)
        }

        // eslint-disable-next-line
    }, [])

    useEffect(() => { localStorage.clear() }, [])


    const handleCurrent = (arr, id) => {
        compose(actions.loadCurrent, dispatcher.setCurrent)(getCurrentBoard(arr, id))
        compose(getPath, nav)({ diff, id })
    }


    if (!boards.length) return <Spinner diff={diff} />
    return (

        <div style={{ ...styles.mainContainer(), display: "flex", flexDirection: "column", height: "100%", alignItems: "center" }}>

            {
                boards.map(({ _id, playing, completed, playingSince, updatedAt, mapped: { render } }, i) => (

                    <div key={`level-${i}`} style={styles.levelContainer()}>

                        <div style={styles.miniBoardContainer()}>

                            <BoardGridContainer mini>

                                {
                                    JSON.parse(render).map(({ value, color, mutable, deletable }, i) => (

                                        <Board
                                            mini
                                            key={`miniBoard-${i}`}
                                            mutable={mutable}
                                            deletable={deletable}
                                            color={color}
                                            i={i}
                                            value={value}
                                        />
                                    ))
                                }

                            </BoardGridContainer>

                        </div>

                        <div style={styles.levelCardContainer()}>

                            <h1>{`Level - ${i + 1}`}</h1>

                            <div style={styles.levelCardInfo()}>

                                <p style={styles.levelCardFont()}>
                                    {
                                        playing
                                            ? <strong style={styles.playingText()}>Playing</strong>
                                            : completed
                                                ? <strong style={{ color: "limegreen" }}>Completed</strong>
                                                : null
                                    }
                                </p>

                                <p style={styles.levelCardFont()}>
                                    {playing && new Timestamp(playingSince).toString()}
                                    {completed && new Timestamp(playingSince).toString()}
                                </p>

                            </div>

                            <div style={styles.levelCardInfo()}>

                                <p style={styles.levelCardFont()}>
                                    {playing && `Last Played`}
                                    {completed && `Last Played`}
                                </p>

                                <p style={styles.levelCardFont()}>
                                    {playing && new Date(updatedAt).toLocaleDateString()}
                                    {completed && new Date(updatedAt).toLocaleDateString()}
                                </p>

                            </div>

                        </div>

                        <div style={styles.playBtnContainer()}>

                            {
                                completed
                                    ? <i style={{ color: "#ffec80", fontSize: "85px", textShadow: "2px 2px 4px black" }} className='fas fa-check' />
                                    : <i
                                        style={{ fontSize: "70px", color: "limegreen", textShadow: "2px 2px 4px black" }}
                                        className="fas fa-arrow-circle-right"
                                        onClick={() => handleCurrent(boards, _id)}
                                    />

                            }

                        </div>

                    </div>
                ))
            }

        </div>
    )
}

export default BoardList