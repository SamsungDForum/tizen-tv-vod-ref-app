import { useRef } from "react";
import { event } from "../promise-me";
import * as dataset from "./dataset";

const useCountKey = `${useResource.name}Count`;
const loadKey = `${useResource.name}Load`;
const failKey = `${useResource.name}Fail`;

function getByIdSelector(url) {
  return `${useResource.name}-${window.btoa(window.encodeURI(url))}`;
}

function getLoadPromise(scriptEl, onLoad, onError) {
  return event.promise(scriptEl, "load", "error").then(onLoad).catch(onError);
}

function loadSuccess(evArr) {
  dataset.clearKey(document.getElementById(evArr[0].target.id), loadKey);
  console.log(useResource.name, loadSuccess.name, evArr[0].target.id, evArr[0].target.src);
}

function loadError(evArr) {
  const assetEl = document.getElementById(evArr[0].target.id);
  dataset.clearKey(assetEl, loadKey);
  dataset.setKey(assetEl, failKey);
  console.error(useResource.name, loadError.name, assetEl.id, assetEl.src);
  throw evArr[0];
}

function load(elSelector) {
  const assetEl = document.createElement(this.type);
  if (this.args) for (const argName of Object.keys(this.args)) assetEl[argName] = this.args[argName];
  assetEl.id = elSelector;
  dataset.setValue(assetEl, useCountKey, 1);
  dataset.setKey(assetEl, loadKey);

  document.body.appendChild(assetEl);

  return getLoadPromise(assetEl, loadSuccess, loadError);
}

function reuseSuccess(evArr) {
  console.log(useResource.name, reuseSuccess.name, evArr[0].target.id, evArr[0].target.src);
}

function reuseError(evArr) {
  throw evArr[0];
}

function reuse(scriptEl) {
  dataset.increment(scriptEl, useCountKey);
  const stageKey = dataset.getKey(scriptEl, failKey) ?? dataset.getKey(scriptEl, loadKey) ?? "loaded";
  console.log(useResource.name, reuse.name, scriptEl.id, scriptEl.src, stageKey);
  return stageKey == failKey
    ? Promise.reject()
    : stageKey == loadKey
    ? getLoadPromise(scriptEl, reuseSuccess, reuseError)
    : Promise.resolve();
}

function reuseOrLoad() {
  const elSelector = getByIdSelector(this.args.src);
  const scriptEl = document.getElementById(elSelector);
  return scriptEl ? reuse(scriptEl) : load.call(this, elSelector);
}

function reuseOrLoadWait(resolve, _) {
  this.proceedWithReuseOrLoad = resolve;
}

function useResource() {
  const resource = useRef();
  if (!resource.current) resource.current = { resource: resource };
  return resource.current;
}

function defineResource(resource, type, args) {
  resource.type = type;
  resource.args = { ...args };
  resource.promise = new Promise(reuseOrLoadWait.bind(resource)).then(reuseOrLoad.bind(resource));
}

function undefinedResource(resource) {
  return resource.type == undefined;
}

function releaseResource(resource) {
  if (undefinedResource(resource)) return;

  const elSelector = getByIdSelector(resource.args.src);
  const scriptEl = document.getElementById(elSelector);
  if (scriptEl) {
    const useCount = dataset.decrement(scriptEl, useCountKey);
    if (useCount <= 0) {
      console.assert(useCount == 0, useResource.name, releaseResource.name, elSelector, "dud use count", useCount);
      document.body.removeChild(scriptEl);
      resource.resource.current = undefined;
      console.log(useResource.name, releaseResource.name, elSelector, "done");
    }
  } else {
    console.warn(useResource.name, releaseResource.name, elSelector, "not found", resource.args.src);
  }
}

function obtainResource() {
  this.proceedWithReuseOrLoad();
  return this.promise;
}

export { useResource, defineResource, undefinedResource, obtainResource, releaseResource };
