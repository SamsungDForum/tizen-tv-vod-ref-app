function resolvePromise(evSource, evOnce, evResolveName) {
  const target = evSource;
  const once = evOnce;
  const resolveName = evResolveName;

  function exec(resolve, _) {
    function execResolve(...args) {
      resolve(args);
    }
    once.call(target, resolveName, execResolve);
  }

  return new Promise(exec);
}

function rejectPromise(evSource, evOnce, evRejectName) {
  const target = evSource;
  const once = evOnce;
  const rejectName = evRejectName;

  function exec(_, reject) {
    function execReject(...args) {
      reject(args);
    }
    once.call(target, rejectName, execReject);
  }

  return new Promise(exec);
}

function promise(evSource, evOnce, evResolveName, evRejectName) {
  const target = evSource;
  const once = evOnce;
  const resolveName = evResolveName;
  const rejectName = evRejectName;

  function exec(resolve, reject) {
    function execResolve(...args) {
      resolve(args);
    }
    function execReject(...args) {
      reject(args);
    }
    once.call(target, resolveName, execResolve);
    once.call(target, rejectName, execReject);
  }

  return new Promise(exec);
}

export { resolvePromise, rejectPromise, promise };
