function subscribe(eventName, listener) {
  document.addEventListener(eventName, listener);
}

function unsubscribe(eventName, listener) {
  document.removeEventListener(eventName, listener);
}

function publish(eventName, data) {
  const event = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(event);
}

export const EventEnum = {
  BitmovinPlayer: "bitmovinRef",
  DashJSPlayer: "dashjsRef",
  HLSJSPlayer: "hlsjsRef",
  ShakaPlayer: "shakaPlayerRef",
};

export { publish, subscribe, unsubscribe };
	