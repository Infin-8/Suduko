import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Requests from "../../util/requests";
import styles from "../../util/styles";
import timestore from "../../util/timestore";

const Winner = () => {
  const { getTimeStamp } = timestore,
    nav = useNavigate(),
    { _id, diff } = useParams();

  useEffect(() => {
    let interval = setInterval(() => {
      nav(`/boards/${diff}`);
    }, 3000);
    return () => clearInterval(interval);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const { time } = getTimeStamp();

    Requests.updateFinished(_id).catch(console.error);
    Requests.updateTime(_id, time).catch(console.error);

    // eslint-disable-next-line
  }, [_id]);

  return (
    <div style={styles.messageContainer()}>
      <div style={styles.messageMain()}>
        <p id="winner-text" style={styles.message()}>
          Winner Winner Chicken Dinner!
        </p>
        <i
          id="winner-check"
          style={{
            color: "#ffec80",
            fontSize: "300px",
            textShadow: "2px 2px 2px mintcream",
          }}
          className="fas fa-check"
        />
      </div>
    </div>
  );
};

export default Winner;
