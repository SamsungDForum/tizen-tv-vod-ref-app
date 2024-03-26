import React from "react";
import { dispatch } from "../../reduxStore/store";
import { setColorsMode } from "./ColorsModeSlice";
import ModalPicker from "../ModalPicker";
import { useSelector } from "react-redux";
import { ColorPaletteSvgIcon } from "../../helpers/SvgIcons";
import { colors } from "./ColorsChanger";

const ThemePicker = () => {
  const ColorsMode = useSelector((state) => state.ColorsMode.value);

  const colorModePicker = (color) => {
    dispatch(setColorsMode(color));
  };

  return (
    <ModalPicker
      icon={<ColorPaletteSvgIcon />}
      label="Theme"
      navSectionName="theme-option-list"
      onSelectCallback={({ category }) => colorModePicker(category)}
      initialLabel={ColorsMode}
      data={Object.values(colors)}
    />
  );
};

export default ThemePicker;
