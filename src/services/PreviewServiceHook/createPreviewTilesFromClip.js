function createPreviewTilesFromClip(clip) {
  return {
    title: clip.name,
    position: clip.id,
    subtitle: `ID: ${clip.id}`,
    image_ratio: "16by9",
    image_url: clip.poster,
    action_data: `{\"videoId\": ${clip.id}}`,
    is_playable: false
  };
}

export { createPreviewTilesFromClip };