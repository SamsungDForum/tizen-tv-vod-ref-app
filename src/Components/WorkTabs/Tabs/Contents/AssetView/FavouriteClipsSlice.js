/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { createSlice } from "@reduxjs/toolkit";

const localStorageKey = "favClipsState";

const getSavedFavClips = () => {
  const savedState = localStorage.getItem(localStorageKey);
  return savedState ? JSON.parse(savedState) : [];
};

const saveFavClipsToLocalStorage = (clips) => {
  localStorage.setItem(localStorageKey, JSON.stringify(clips));
};

const initialState = {
  myClips: getSavedFavClips(),
  quickEdit: false,
};

const FavouriteClips = createSlice({
  name: "FavouriteClips",
  initialState,

  reducers: {
    clearFavouriteClip: (state) => {
      const updatedState = { ...state, myClips: [] };
      saveFavClipsToLocalStorage(updatedState.myClips);
      return updatedState;
    },

    setFavouriteClips: (state, action) => {
      const newFavClip = action.payload;
      const existingClip = state.myClips.find((clip) => clip.id === newFavClip.id);

      if (!existingClip) {
        const updatedState = { ...state, myClips: [...state.myClips, newFavClip] };
        saveFavClipsToLocalStorage(updatedState.myClips);
        return updatedState;
      } else {
        return state;
      }
    },

    removeFavouriteClip: (state, action) => {
      const updatedArray = state.myClips.filter((clip) => clip.id !== action.payload.id);
      const updatedState = { ...state, myClips: updatedArray };
      saveFavClipsToLocalStorage(updatedState.myClips);
      return updatedState;
    },

    loadFavouriteClips: (state, action) => {
      const updatedState = { ...state, myClips: JSON.parse(action.payload) };
      saveFavClipsToLocalStorage(updatedState.myClips);
      return updatedState;
    },

    setQuickEdit: (state, action) => {
      state.quickEdit = action.payload;
    }
  },
});

export const { setFavouriteClips, removeFavouriteClip, loadFavouriteClips, clearFavouriteClip, setQuickEdit } =
  FavouriteClips.actions;

export default FavouriteClips.reducer;
