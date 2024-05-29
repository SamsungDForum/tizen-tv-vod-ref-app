import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

/** @typedef {(state: {current: EventHookEventState}, event: Event|CustomEvent)=>void} EventHookEventHandler */
/** @typedef {(state: {current: EventHookEventState})=>Event|CustomEvent|undefined} EventHookLastEvent */
/** @typedef {(state: {current: EventHookEventState})=>(state: {current: EventHookEventState})=>void} EventHookMountHandler */

/**
 * @typedef EventHookEventState
 * @property {string} hookName
 * @property {EventHookMountHandler} onMount
 * @property {EventTarget} eventTarget
 * @property {string} eventType
 * @property {EventHookEventHandler} eventHandler
 * @property {AddEventListenerOptions} eventOptions
 * @property {Event|CustomEvent|undefined} [recvEvent]
 * @property {EventHookLastEvent} [lastEvent]
 * @property {React.Dispatch<React.SetStateAction<Event|CustomEvent>>} [setState]
 */

/** @type {EventHookLastEvent} */
function lastEvent({ current }) {
  return current.recvEvent;
}

/** @type {EventHookEventHandler} */
function useStateEventOnEvent({ current }, event) {
  let evClone = new event.constructor(event.type, event);
  current.setState(() => evClone);
}

/** @type {EventHookEventHandler} */
function useEventOnEvent({ current }, event) {
  current.recvEvent = new event.constructor(event.type, event);
}

/**
 * @param {{current: EventHookEventState}} state
 */
function onUnmount(state) {
  console.log(state.current.hookName, onUnmount.name);

  state.current.eventTarget.removeEventListener(
    state.current.eventType,
    state.current.eventHandler,
    state.current.eventOptions
  );

  state.current = null;
}

/** @type {EventHookMountHandler} */
function onMount(state) {
  console.log(state.current.hookName, onMount.name);
  state.current.eventTarget.addEventListener(
    state.current.eventType,
    state.current.eventHandler,
    state.current.eventOptions
  );

  return onUnmount.bind(undefined, state);
}

/**
 * Event hook mimicking useState behaviour. Unlike useState, setter function is not returned
 * @param {EventTarget} eventTarget EventTarget instance to subscribe to
 * @param {string} eventType event name
 * @param {AddEventListenerOptions} [options] event subscription options
 * @returns {[Event|CustomEvent]}
 */
function useStateEvent(eventTarget, eventType, options) {
  const [evValue, setEvValue] = useState([]);

  /** @type {React.MutableRefObject<EventHookEventState>} */
  const evState = useRef();
  !evState.current &&
    (evState.current = {
      hookName: useStateEvent.name,
      onMount: onMount.bind(undefined, evState),
      eventTarget: eventTarget,
      eventType: eventType,
      eventOptions: (options && { ...options }) ?? null,
      setState: setEvValue,
      eventHandler: useStateEventOnEvent.bind(undefined, evState),
    });

  useEffect(evState.current.onMount, []);
  return [evValue];
}

/**
 * useEvent hook. Returns last received event and last received event getter.
 * @param {EventTarget} eventTarget EventTarget instance to subscribe to
 * @param {string} eventType event name
 * @param {AddEventListenerOptions} [options] event subscription options
 * @returns {[Event|CustomEvent, ()=>Event|CustomEvent]}
 */
function useEvent(eventTarget, eventType, options) {
  const evState = useRef();
  !evState.current &&
    (evState.useEvent = {
      hookName: useStateEvent.name,
      onMount: onMount.bind(undefined, evState),
      eventTarget: eventTarget,
      eventType: eventType,
      eventOptions: (options && { ...options }) ?? null,
      recvEvent: [],
      lastEvent: lastEvent.bind(undefined, evState),
      eventHandler: useEventOnEvent.bind(undefined, evState),
    });

  useEffect(evState.current.mount, []);
  return [evState.current.evData, evState.current.evLast];
}

export { useEvent, useStateEvent };
