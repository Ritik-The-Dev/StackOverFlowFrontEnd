import React from 'react';

function Notification({ text, side }) {
 const styles = {
    position: "fixed",
    bottom: "10px",
    background: "white",
   padding: "10px",
    borderRadius: "5px",
    fontSize: "16px",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px",
    zIndex: "21",
    right: "10px",
    width: "3vw",
    color: "black",
    textAlign: "center",
    fontSize: "2rem"
 };

 if (side === 'left') {
    styles.left = '10px';
 } else {
    styles.right = '10px';
 }

 return <div style={styles}>{text}</div>;
}

export default Notification;