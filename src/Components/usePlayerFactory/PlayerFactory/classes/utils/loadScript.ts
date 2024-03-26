const loadScript = (url: string) => {
  return new Promise<any>(resolve => {
    let body = document.getElementsByTagName('body')[0];
    let script = document.createElement('script');
    script.crossOrigin = 'anonymous';
    script.type = 'text/javascript';
    script.onload = resolve;
    script.src = url;
    body.appendChild(script);
  });
}

export { loadScript };