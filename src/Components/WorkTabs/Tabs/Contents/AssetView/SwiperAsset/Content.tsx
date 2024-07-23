/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, { useState } from "react";
import "swiper/css";
import "./content.scss";
import ContentRow from "./ContentRow";
import AssetWarningDisplay from "../AssetWarningDisplay";
import { Media } from "../../../../../usePlayerFactory/utils/playAssetCurrentTypes";

type Props = {
  isCustomContent: boolean;
  child: Array<{
    title: string;
    list: Array<Media>;
  }>;
};

const Content = ({ child }: Props) => {
  const isEveryArrayPopulated = child.every((obj) => obj.list.length === 0);
  const [pxtransform, setPxtransform] = useState(0);

  return (
    <>
      {!isEveryArrayPopulated ? (
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
