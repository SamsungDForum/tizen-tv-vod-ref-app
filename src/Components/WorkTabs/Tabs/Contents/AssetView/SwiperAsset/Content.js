import React, { useRef, useState, useEffect } from "react";
import "swiper/css";
import "./content.scss";
import { useSelector } from "react-redux";
import ContentRow from "./ContentRow";
import AssetWarningDisplay from "../AssetWarningDisplay";

const Content = ({ child }) => {
  const arrayCheckOutput = child.every((obj) => obj.list.length === 0);
  const [pxtransform, setPxtransform] = useState(0);

  return (
    <>
      {!arrayCheckOutput ? (
        <div className="swiper-container">
          {child.map((key, index) => {
            let contentRowID = index;
            if (key.list.length > 0) {
              return (
                <ContentRow
                  key={index}
                  child={key}
                  pxtransform={pxtransform}
                  setPxtransform={setPxtransform}
                  contentRowID={contentRowID}
                />
              );
            }
          })}
        </div>
      ) : (
        <AssetWarningDisplay />
      )}
    </>
  );
};

export default Content;
