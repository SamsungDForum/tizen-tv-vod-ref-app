import { Quality } from "../../../../utils/playAssetCurrentTypes";
import Dashjs from "../";

const changeCurrentVideoQuality = function(this: Dashjs, quality: Quality): void {
  this.player = this.player.then(player => new Promise(res => {
    if(quality.category === 'auto') {
      enableVideoABR(true, player);
    } else {
      enableVideoABR(false, player);

      const [width, height] = quality.option!
        .split('x')
        .map(measurement => parseInt(measurement));

      const activeTrack = player.getCurrentTrackFor('video');
      if(isNeededBitratePresentInTrack(width, height, quality.category, activeTrack)) {
        const qualityIndex = findBitrateIndexInTrack(width, height, activeTrack);
        player.setQualityFor('video', qualityIndex, true);
        res(player);
        return;
      }

      const allVideoTracks = player.getTracksFor('video');
      let qualityIndex = -1;
      const requiredTrack = allVideoTracks.find(track => {
        qualityIndex = findBitrateIndexInTrack(width, height, track);
        if(track.mimeType.includes(quality.category) && qualityIndex !== -1) {
          return true;
        }
      });

      if(requiredTrack != null) {
        (requiredTrack as any).requiredQualityIndex = qualityIndex;
        player.setCurrentTrack(requiredTrack);
      }
    }
    res(player);
  }));

  function isNeededBitratePresentInTrack(width, height, category, track) {
    if(!track.mimeType.includes(category)) {
      return false;
    }

    const index = findBitrateIndexInTrack(width, height, track);
      if(index === -1) {
      return false;
    } else {
      return true;
    }
  }

  function findBitrateIndexInTrack(width, height, track) {
    const { bitrateList } = track;

    for(let i = 0; i < bitrateList.length; i++) {
      if(bitrateList[i].width === width && bitrateList[i].height === height) {
        return i;
      }
    }

    return -1;
  }

  function enableVideoABR(bool, player) {
    player.updateSettings({
      streaming: {
        abr: {
          autoSwitchBitrate: { video: bool },
        },
      },
    });
  }
}

export default changeCurrentVideoQuality;