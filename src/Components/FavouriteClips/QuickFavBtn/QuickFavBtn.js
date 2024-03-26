import React, { useEffect } from "react";
import StyledButton from "../../ModalPicker/StyledButton";
import { FavouriteSvgIcon } from "../../../helpers/SvgIcons";
import "./quickFavBtn.scss";
import { useSelector } from "react-redux";
import { dispatch } from "../../../reduxStore/store";
import { setQuickEdit } from "../../WorkTabs/Tabs/Contents/AssetView/FavouriteClipsSlice";
const QuickFavBtn = ({ isDisabled }) => {
  const isQuickEdit = useSelector((state) => state.FavouriteClips.quickEdit);

  useEffect(() => {
    return () => {
      dispatch(setQuickEdit(false));
    };
  }, []);

  return (
    <div className="bottom-quick-add">
      <StyledButton
        icon={<FavouriteSvgIcon />}
        buttonName={`QuickEdit Favorite`}
        label={isQuickEdit && !isDisabled ? "ON" : "OFF"}
        onClick={() => dispatch(setQuickEdit(!isQuickEdit))}
        isDisabled={isDisabled}
        className="leftBarElement"
      />
    </div>
  );
};

export default QuickFavBtn;
