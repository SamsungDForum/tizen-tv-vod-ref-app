import { useRef } from "react";

function appendObject(source) {
  for (const propName of Object.keys(source)) this[propName] = source[propName];
  return this;
}

function appendRun(runAction) {
  this.contextChain = this.contextChain.then(runAction.bind(this));
  return this;
}

function appendError(errorAction) {
  this.contextChain = this.contextChain.catch(errorAction.bind(this));
  return this;
}

function unuse() {
  this.contextRef.current = undefined;
}

function init(ctxtRef) {
  const context = { contextRef: ctxtRef, contextChain: Promise.resolve() };
  context.contextAppend = appendObject.bind(context);
  context.contextRun = appendRun.bind(context);
  context.contextError = appendError.bind(context);
  context.contextUnuse = unuse.bind(context);
  return context;
}

function useRunContext() {
  const contextRef = useRef();
  if (!contextRef.current) contextRef.current = init(contextRef);
  return contextRef.current;
}

export { useRunContext };
