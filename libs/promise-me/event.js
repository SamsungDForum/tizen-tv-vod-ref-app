import * as subscribe from "./subscribe";

function resolvePromise(evSource, evName) {
  return subscribe.resolvePromise(evSource, evSource.addEventListener, evSource.removeEventListener, evName);
}

function rejectPromise(evSource, evName) {
  return subscribe.rejectPromise(evSource, evSource.addEventListener, evSource.removeEventListener, evName);
}

function promise(evSource, evResolveName, evRejectName) {
  return subscribe.promise(
    evSource,
    evSource.addEventListener,
    evSource.removeEventListener,
    evResolveName,
    evRejectName
  );
}

export { resolvePromise, rejectPromise, promise };
