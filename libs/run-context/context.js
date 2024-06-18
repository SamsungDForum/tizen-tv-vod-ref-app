/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

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
