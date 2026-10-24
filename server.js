const FtpSrv = require('ftp-srv');
const path = require('path');
const fs = require('fs');

const FTP_PORT = parseInt(process.env.FTP_PORT || '21', 10);
const HOST_IP = process.env.FTP_HOST || '192.168.7.158';
const UPLOAD_DIR = path.join(__dirname, 'uploads');

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// User credentials:
// Username: camera / admin
// Password: camera123 / Rudra@8160 (accepts both)
const ftpServer = new FtpSrv({
  url: `ftp://0.0.0.0:${FTP_PORT}`,
  pasv_url: HOST_IP,
  pasv_min: 30000,
  pasv_max: 30100,
  anonymous: true
});

ftpServer.on('login', ({ connection, username, password }, resolve, reject) => {
  console.log(`[FTP] Connection attempt from ${connection.ip} with user '${username}'`);
  
  // Allow camera user, admin, or anonymous
  if (
    (username === 'camera' && password === 'camera123') ||
    (username === 'admin' && password === 'Rudra@8160') ||
    username === 'anonymous' ||
    !password // or any simple auth from camera
  ) {
    console.log(`[FTP] Login SUCCESS: ${username} (${connection.ip})`);
    return resolve({
      root: UPLOAD_DIR,
      cwd: '/'
    });
  }

  // Also accept default camera upload
  console.log(`[FTP] Authorizing user '${username}' for upload directory`);
  return resolve({
    root: UPLOAD_DIR,
    cwd: '/'
  });
});

ftpServer.on('client-error', ({ connection, context, error }) => {
  console.error(`[FTP] Client error from ${connection ? connection.ip : 'unknown'}: ${error.message}`);
});

ftpServer.listen().then(() => {
  console.log(`====================================================`);
  console.log(`🚀 FTP Server is running on ftp://${HOST_IP}:${FTP_PORT}`);
  console.log(`📁 Upload folder: ${UPLOAD_DIR}`);
  console.log(`🔑 Credentials: user='camera', pass='camera123' (or 'admin'/'Rudra@8160')`);
  console.log(`====================================================`);
}).catch((err) => {
  console.error('[FTP] Server failed to start:', err.message);
});

