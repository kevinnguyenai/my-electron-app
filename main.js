const {app, BrowserWindow, mainWindow} = require('electron')
const url = require('url')
const path = require('path')
const {ipcMain} = require('electron')

let win

function createWindow() {
   win = new BrowserWindow({
       width: 800, 
       height: 600,
       webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
      }
    })
   win.loadURL(url.format ({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
   }))
}


ipcMain.on('openFile', (event, path) => { 
   const {dialog} = require('electron') 
   const fs = require('fs')
   console.log('openFile Event')
   dialog.showOpenDialog(mainWindow, {
      properties: ['openFile', 'multiSelections']
    }).then(result => {
      console.log(result.canceled)
      console.log(result.filePaths)
      readFile(result.filePaths[0])
    }).catch(err => {
      console.log(err)
    })

   function readFile(filepath) { 
      fs.readFile(filepath, 'utf-8', (err, data) => { 
         
         if(err){ 
            alert("An error ocurred reading the file :" + err.message) 
            return 
         } 
         
         // handle the file content
         event.sender.send('fileData', data) 
         console.log("Send Data File")
      }) 
   } 
}) 

app.on('ready', createWindow)

