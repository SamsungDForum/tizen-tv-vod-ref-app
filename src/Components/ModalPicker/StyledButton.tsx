/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { SVGProps } from "react";
import styles from "./styles/StyledButton.module.scss";

type Props = {
  isDisabled?: boolean;
  icon?: SVGProps<SVGSVGElement>;
  buttonName?: string;
  id?: string;
  label?: string;
  className?: string;
  reference?: React.RefObject<HTMLButtonElement>;
  navSection?: { [key: string]: boolean };
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onFocusCapture?: React.FocusEventHandler<HTMLButtonElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLButtonElement>;
  extraProps?: object;
};

function StyledButton({
  icon,
  buttonName,
  id,
  label = "Button",
  className = "",
  reference,
  navSection,
  onClick,
  onMouseEnter,
  onFocusCapture,
  onKeyUp,
  isDisabled,
  ...extraProps
}: Props): JSX.Element {
  return (
    <button
      id={id}
      className={`button ${className} ${styles.animatedButton} ${styles.styledButton}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onFocusCapture={onFocusCapture}
      onKeyUp={onKeyUp}
      ref={reference}
      {...navSection}
      {...extraProps}
      disabled={isDisabled}
    >
      <div className={styles.iconWithName}>
        {icon ? <span className={styles.buttonIcon}>{icon}</span> : null}
        <span className={styles.buttonName}>{buttonName}</span>
      </div>

      {label ? (
        <span
          className={`${styles.smallGrayText} ${
            label === "ON"
              ? styles.greenIndicators
              : label === "OFF"
              ? styles.redIndicators
              : null
          }`}
        >
          {label}
        </span>
      ) : null}
    </button>
  );
}

export default StyledButton;
