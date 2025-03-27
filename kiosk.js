const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');

let mainWindow;

app.whenReady().then(() => {
  // Start the Express server
  exec('node server.js', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error starting server: ${stderr}`);
      return;
    }
    console.log(stdout);
  });

  // Create a fullscreen kiosk window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    kiosk: true,  // Enables kiosk mode (fullscreen, no exit options)
    webPreferences: {
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL('http://localhost:3000');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});