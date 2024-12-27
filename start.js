const { spawn } = require('child_process');
const path = require('path');

// Change directory to server and start the application
process.chdir(path.join(__dirname, 'server'));
require('./server/server.js');
