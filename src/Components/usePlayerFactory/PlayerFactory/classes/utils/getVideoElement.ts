const getVideoElement = (): HTMLVideoElement => {
  return document.getElementById("elVideo") as HTMLVideoElement;
};

export { getVideoElement };