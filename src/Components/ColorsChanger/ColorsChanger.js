import React, { useEffect, ReactNode, useRef } from "react";
import { useSelector } from "react-redux";
import { dispatch } from "../../reduxStore/store";
import { setColorsMode } from "./ColorsModeSlice";
import { reqTizenVersion } from "../../helpers/reqTizenVersion";

export const colors = {
  dark: "Dark",
  light: "Light",
  oled: "OLED",
};

const ColorsChanger = ({ children }) => {
  const ColorsMode = useSelector((state) => state.ColorsMode.value);
  const allowFloating = reqTizenVersion(4);
  const themeTimeout = useRef(null);

  useEffect(() => {
    if (!allowFloating) {
      document.body.setAttribute("data-theme", `NoFloat`);
    }
  }, [allowFloating]);

  useEffect(() => {
    let darkThemeRecoveryMinutes = 30;
    const keydownHandler = (allowFloating) => {
      if (allowFloating) {
        if (ColorsMode === colors.light) {
          clearTimeout(themeTimeout.current);
          themeTimeout.current = setTimeout(() => {
            dispatch(setColorsMode(colors.dark));
          }, darkThemeRecoveryMinutes * 60 * 1000);
        } else {
          clearTimeout(themeTimeout.current);
        }
      }
    };

    keydownHandler(allowFloating);
    window.addEventListener("keydown", () => {
      keydownHandler(allowFloating);
    });

    if (allowFloating) {
      switch (ColorsMode) {
        case "Dark":
          return document.body.setAttribute("data-theme", colors.dark);
        case "Light":
          return document.body.setAttribute("data-theme", colors.light);
        case "OLED":
          return document.body.setAttribute("data-theme", colors.oled);
        case "NoFloat":
          return document.body.setAttribute("data-theme", `NoFloat`);
      }
    }

    return () => {
      document.body.removeAttribute("data-theme");
      window.removeEventListener("keydown", keydownHandler(allowFloating));
      clearTimeout(themeTimeout.current);
    };
  }, [ColorsMode, allowFloating]);

  return <>{children}</>;
};

export default ColorsChanger;
