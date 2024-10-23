import React, { useMemo, useState, useEffect } from "react";
import useNavListener from "../../util/backlistener";
import { useParams } from "react-router-dom";
import { useStore } from "../../store/Provider/Connect";
import {
  compose,
  chooseNumber,
  getTools,
  getNumbers,
  checkDuplicates,
  parseData,
} from "../../util/helpers";
import timestore from "../../util/timestore";
import isValid from "../../util/isValid";
import styles from "../../util/styles";
import actions from "../../util/actions";
import Request from "../../util/requests";
import Header from "../presentational/Header";
import Winner from "../presentational/Winner";
import BoardGridContainer from "./BoardGridContainer";
import Board from "../presentational/Board";
import Tools from "../presentational/Tools";
import Spinner from "../presentational/Spinner";

function BoardContainer() {
  const { getState, dispatcher } = useStore(),
    { current } = getState?.(),
    {
      current: {
        mapped: { render, selected, history: previous },
        complete,
        playing,
        completed,
        matrix,
      },
    } = getState?.(),
    { _id, diff } = useParams(),
    memoID = useMemo(() => _id, [_id]);

  useNavListener();

  const isFinished = useMemo(
      () =>
        render
          .map(({ value }) => value)
          .filter((item) => !!item)
          .map((item) => item.toString())
          .join(""),
      [render]
    ),
    isCompleted = useMemo(() => complete, [complete]);

  const [options, setOptions] = useState({
    one: getNumbers(selected, 1),
    two: getNumbers(selected, 2),
    three: getNumbers(selected, 3),
    four: getNumbers(selected, 4),
    five: getNumbers(selected, 5),
    six: getNumbers(selected, 6),
    seven: getNumbers(selected, 7),
    eight: getNumbers(selected, 8),
    nine: getNumbers(selected, 9),
  });

  const [duplicates, setDuplicates] = useState([]);
  const [currentNum, setCurrentNum] = useState(0);
  const [dict, setDict] = useState(null);
  const [history, setHistory] = useState(previous);
  const [trash, setTrash] = useState(false);
  const [pencil, setPencil] = useState({ annotate: false, index: null });
  const [winner, setWinner] = useState(false);

  const { initializeTimeStamp, updateTime, getTimeStamp } = timestore;

  // this is for persisting the board after refresh.. on load save current board in local storage
  // then if reload get the board and update state
  useEffect(() => {
    let saved = localStorage.getItem("board");

    if (!saved) localStorage.setItem("board", JSON.stringify(current));
    else {
      compose(actions.loadSaved, dispatcher.setCurrent)(saved);
      setHistory(JSON.parse(saved).mapped.history);
    }

    // eslint-disable-next-line
  }, []);

  // this is used with effect from above.. if page refresh need to also load in selected values
  // on toolbar
  useEffect(() => {
    setOptions({
      one: getNumbers(selected, 1),
      two: getNumbers(selected, 2),
      three: getNumbers(selected, 3),
      four: getNumbers(selected, 4),
      five: getNumbers(selected, 5),
      six: getNumbers(selected, 6),
      seven: getNumbers(selected, 7),
      eight: getNumbers(selected, 8),
      nine: getNumbers(selected, 9),
    });

    // eslint-disable-next-line
  }, [current]);

  useEffect(() => {
    if (!Object.keys(getTimeStamp()).length) initializeTimeStamp(memoID);

    let interval = setInterval(updateTime, 2000);

    return () => clearInterval(interval);
  }, [memoID, updateTime, initializeTimeStamp, getTimeStamp]);

  useEffect(() => {
    if (
      new RegExp(`^${isFinished}$`).test(isCompleted) ||
      isValid(
        render
          .map(({ value }) => (value ? parseInt(value) : 0))
          .every((n) => n > 0)
          ? render.map(({ value }) => value)
          : []
      )
    )
      setWinner(true);

  }, [isFinished, isCompleted, render]);

  useEffect(() => {
    Request.updateBoard(_id, render, selected, history)
      .then((res) => parseData(res.data))
      .then((parsed) => localStorage.setItem("board", JSON.stringify(parsed)))
      .catch(console.error);

    // eslint-disable-next-line
  }, [render]);

  useEffect(() => {
    if (!playing && !completed)
      Request.updatePlaying(memoID).catch(console.error);
  }, [memoID, playing, completed]);

  const handleUseNumber = (num, index) => {
    compose(actions.setCurrent, dispatcher.setCurrent)({ num, index });
    chooseNumber(num, setOptions);
    setHistory((prev) => [...prev, { num, dict, index }]);
    compose(actions.shiftSelected, dispatcher.setCurrent)(num);
  };

  const handleUndo = () => {
    const { num, dict: key, index } = history?.[history.length - 1];

    setOptions((prev) => ({ ...prev, [key]: [...prev[key], num] }));
    setHistory((prev) => [...prev].filter((_, i, arr) => i < arr.length - 1));
    setDuplicates((prev) => [...prev].filter((item) => item === index));
    compose(actions.pushSelected, dispatcher.setCurrent)(num);
    compose(actions.setCurrent, dispatcher.setCurrent)({ num: "", index });
  };

  const handleTrash = () => {
    setTrash((prev) => !prev);
    setDict(null);
  };

  const handleDelete = (i) => {
    if (pencil.annotate) {
      compose(actions.deleteAnnotation, dispatcher.setCurrent)({ index: i });
    } else {
      const { num, dict, index } = history.find(({ index }) => index === i);

      setOptions((prev) => ({ ...prev, [dict]: [...prev[dict], num] }));
      setHistory((prev) => [...prev].filter(({ index }) => index !== i));
      setDuplicates((prev) => [...prev].filter((item) => item === i));
      compose(actions.pushSelected, dispatcher.setCurrent)(num);
      compose(actions.setCurrent, dispatcher.setCurrent)({ num: "", index });
    }
  };

  const handleAnnotate = (index) =>
    compose(
      actions.annotate,
      dispatcher.setCurrent
    )({
      index,
      annotate: { render: pencil.annotate, number: currentNum },
    });

  const handlePencil = () =>
    setPencil((prev) => ({
      ...prev,
      annotate: !prev.annotate,
    }));

  if (!matrix.length) return <Spinner diff={diff} />;
  return (
    <>
      {winner && <Winner />}

      <div style={styles.mainContainer()}>
        <div style={styles.gridContainer()}>
          <Header />

          <BoardGridContainer>
            {render.map(({ value, color, mutable, deletable, annotate }, i) => (
              <Board
                key={`ogBoard-${i}`}
                options={options}
                dict={dict}
                mutable={mutable}
                trash={trash}
                deletable={deletable}
                pencil={pencil}
                color={color}
                currentNum={currentNum}
                i={i}
                value={value}
                handleUseNumber={handleUseNumber}
                handleDelete={handleDelete}
                handleAnnotate={handleAnnotate}
                checkDuplicates={checkDuplicates}
                annotate={annotate}
                _id={_id}
                board={getState().current.mapped.render}
                setDuplicates={setDuplicates}
                duplicates={duplicates}
              />
            ))}
          </BoardGridContainer>

          <div id="tools-container" style={styles.toolsGridContainer()}>
            {getTools(options).map(({ value, hasContext, key: propKey }, i) => (
              <Tools
                key={`tools-${i}`}
                hasContext={hasContext}
                propKey={propKey}
                dict={dict}
                trash={trash}
                value={value}
                annotate={pencil.annotate}
                i={i}
                handleTrash={handleTrash}
                handleUndo={handleUndo}
                setCurrentNum={setCurrentNum}
                setDict={setDict}
                setTrash={setTrash}
                handlePencil={handlePencil}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default BoardContainer;
