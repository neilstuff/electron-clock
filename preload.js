const {
    contextBridge,
    ipcRenderer
} = require("electron");

contextBridge.exposeInMainWorld(
    "api", {
        quit: () => {
            ipcRenderer.send('quit');
        },
        on: (message, callback) => {
            ipcRenderer.on(message, (event, path) => {
                callback()
            });
        },
        log: (message) => {
            console.log(message);
        }
    }

);