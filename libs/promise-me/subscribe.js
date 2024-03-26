function resolvePromise(evSource, evOn, evOff, evResolveName) {
  const target = evSource;
  const on = evOn;
  const off = evOff;
  const resolveName = evResolveName;

  function exec(resolve, _) {
    function execResolve(...args) {
      off.call(target, resolveName, execResolve);
      resolve(args);
    }
    on.call(target, resolveName, execResolve);
  }

  return new Promise(exec);
}

function rejectPromise(evSource, evOn, evOff, evRejectName) {
  const target = evSource;
  const on = evOn;
  const off = evOff;
  const rejectName = evRejectName;

  function exec(_, reject) {
    function execReject(...args) {
      off.call(target, rejectName, execReject);
      reject(args);
    }
    on.call(target, rejectName, execReject);
  }

  return new Promise(exec);
}

function promise(evSource, evOn, evOff, evResolveName, evRejectName) {
  const target = evSource;
  const on = evOn;
  const off = evOff;
  const resolveName = evResolveName;
  const rejectName = evRejectName;

  function exec(resolve, reject) {
    function execResolve(...args) {
      off.call(target, resolveName, execResolve);
      off.call(target, rejectName, execReject);
      resolve(args);
    }
    function execReject(...args) {
      off.call(target, rejectName, execReject);
      off.call(target, resolveName, execResolve);
      reject(args);
    }
    on.call(target, resolveName, execResolve);
    on.call(target, rejectName, execReject);
  }

  return new Promise(exec);
}

export { resolvePromise, rejectPromise, promise };
