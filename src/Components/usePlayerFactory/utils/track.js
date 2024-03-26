// TODO: Review
// Track is no longer used for playing stream track information but more as a
// 'modal-picker' wrapper element allowing arbitrary data to be displayed and
// selected by a modal picker.

function createTrack(id, label, data) {
  return {
    id: id,
    label: label,
    trackId: id,
    trackData: data,
  };
}

function trackEqual({ trackId: trackIdA }, { trackId: trackIdB }) {
  return trackIdA == trackIdB;
}

export default createTrack;
export { trackEqual };
