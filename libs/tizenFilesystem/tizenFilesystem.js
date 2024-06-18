/* Copyright
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

function isTizenPlatform() {
  return typeof tizen !== 'undefined';
}

function getTizenVersion() {
  return tizen.systeminfo.getCapability("http://tizen.org/feature/platform.version");
}

async function existsAsync(path) {
  if (getTizenVersion() >= 5) {
    return tizen.filesystem.pathExists(path);
  } else {
    return new Promise(res => {
      tizen.filesystem.resolve(path, () => { res(true); }, () => { res(false); }, "r");
    });
  }
}

async function getFilesAsync(path) {
    if (getTizenVersion() >= 5) {
      return new Promise(res => {
        tizen.filesystem.listDirectory(path, list => { res(list); });
      });
    } else {
       return new Promise(res => {
        tizen.filesystem.resolve(path, 
          dir => { 
            dir.listFiles(list => {
              const names = list.map(file => file.name);
              res(names);
            }); });
          }, null, "r");
        }
}

async function readFileAsync(path) {
  if (getTizenVersion() >= 5) {
    let file = null;
    try {
      file = tizen.filesystem.openFile(path, "r");
    } catch(e) { }

    let text = null;
    if(file !== null) {
      text = file.readString();
      file.close();
    }

    return text;
  } else {
    return new Promise(res => {
      tizen.filesystem.resolve( path, 
        file => { 
          file.readAsText(text => { 
            res(text); 
          }); 
        }, null, "r");
    })
  }
}

async function writeToFileAsync(path, data) {
  if (getTizenVersion() >= 5) {
    const handle = tizen.filesystem.openFile(path, "w");
    handle.writeString(data);
    tizen.filesystem.flush && tizen.filesystem.flush();
    tizen.filesystem.sync && tizen.filesystem.sync();
    handle.close();
  } else {
    return new Promise(res => {
      tizen.filesystem.resolve(path, 
      file => {
        file.openStream("w", stream =>  { 
          stream.write(data);
          stream.close();
        });
        res();
      },
      e => {
        if(e.code === 8) {
          const dirPath = path.substring(0, path.lastIndexOf('/'));
          const fileName = path.substring(path.lastIndexOf('/') + 1);
          tizen.filesystem.resolve(dirPath,
          dir => {
            const file = dir.createFile(fileName);
            file.openStream("w", stream =>  { 
              stream.write(data);
              stream.close();
            });
            res();
          });
        }
      }, 'w');
    });
  }
}

async function readFileFromSomeUSBRoot(fileName) {
  const usbs = await getFilesAsync("/media/");

  if (usbs.length === 0) {
    throw new Error("There is no USB");
  }

  for (const usb of usbs) {
    let path = `/media/${usb}/${fileName}`;
    if (await existsAsync(path)) {
      console.log(`${usb} has ${fileName}`);
      const text = await readFileAsync(path);
      return { usbName: usb, message: text};
    }
  }

  throw new Error(`${fileName} is missing`);
}

export { isTizenPlatform, getTizenVersion, existsAsync, getFilesAsync, readFileAsync, writeToFileAsync, readFileFromSomeUSBRoot };

