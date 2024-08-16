import React, { useEffect, useRef } from "react";
import { ArrowDown, ArrowUp } from "../../helpers/SvgIcons";
import styles from "./ValuePicker.module.scss";

type Props = {
  name: string;
  value: number;
  jumpVal: number;
  isLeftBarOpen: boolean;
  maxVal: number;
  setter: React.Dispatch<React.SetStateAction<number>>;
  label?: string;
  unit?: string;
};
function ValuePicker({ name, value, jumpVal, isLeftBarOpen, setter, label, unit, maxVal }: Props): JSX.Element {
  const intervalRef = useRef<null | NodeJS.Timeout>(null);

  const handleDecreaseThreshold = () => setter((prevValue) => (prevValue > 0 ? prevValue - jumpVal : 0));
  const handleIncreaseThreshold = () => setter((prevVal) => (prevVal < maxVal ? prevVal + jumpVal : maxVal));

  const stopHolding = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return stopHolding();
  }, []);

  return (
    <div className={styles.valuePickerContainer}>
      {label && isLeftBarOpen && <p className={styles.label}>{label.toUpperCase()}</p>}
      <div
        className={`${styles.inputContainer} ${isLeftBarOpen ? styles.inputShowLeftBar : styles.inputHiddenLeftBar}`}
      >
        <button
          className={`button leftBarElement ${styles.arrowIconButton}`}
          onClick={handleDecreaseThreshold}
          onKeyDown={(e) => {
            if (e.key === "Enter") intervalRef.current = setInterval(handleDecreaseThreshold, 200);
          }}
          onKeyUp={stopHolding}
          id={"decrease-threshold-value"}
        >
          <ArrowDown />
        </button>
        {isLeftBarOpen && (
          <>
            <div className={styles.textValue}>
              {name}: {value} <p style={{ fontSize: "12px" }}>{unit}</p>
            </div>
            <button
              className={`button leftBarElement ${styles.arrowIconButton}`}
              onClick={handleIncreaseThreshold}
              onKeyDown={(e) => {
                if (e.key === "Enter") intervalRef.current = setInterval(handleIncreaseThreshold, 200);
              }}
              onKeyUp={stopHolding}
              id={"increase-threshold-value"}
            >
              <ArrowUp />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ValuePicker;
