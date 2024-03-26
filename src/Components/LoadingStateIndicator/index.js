import React, { useState, useEffect, useRef, Fragment } from "react";
import "./styles.scss";

const states = {
  success: 'success',
  failure: 'failure',
  loading: 'loading',
  hidden: 'hidden'
}

export default function LoadingStateIndicator({ text, state, ...extraProps }) {
  const getDiv = () => {
    switch (state) {
      case states.success:
        return <div className="checkmark" />;
      case states.failure:
        return <div className="crossmark" />;
      default: 
        return null;
    }
  };

  return (
    <div
      className={`parent-loader 
      ${state == states.loading ? '' : 'disappear'}
      ${state == states.hidden ? 'hide' : ''}`}
    >
      <div
        className={`loader ${
          state === states.success
            ? states.success
            : state === states.failure
            ? states.failure
            : states.loading
        }`}
        {...extraProps}
      >
        {getDiv()}
      </div>
      <p>{text}</p>
    </div>
  );
}