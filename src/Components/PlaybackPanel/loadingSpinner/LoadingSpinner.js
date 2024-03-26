import React, { useEffect } from "react";
import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner = ({ showLoading, setShowLoading, terminateTimeout }) => {
  useEffect(() => {
    if (showLoading) {
      const spinnerTimeout = setTimeout(() => {
        setShowLoading(false);
      }, terminateTimeout);

      return () => {
        clearTimeout(spinnerTimeout);
      };
    }
  }, [showLoading]);

  return <div className={`${styles.loadingSpinner} ${showLoading ? styles.loadingShow : styles.loadingHide}`}></div>;
};

export default LoadingSpinner;
