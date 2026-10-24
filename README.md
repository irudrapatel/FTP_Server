# FTP Server for IP Cameras

A lightweight, high-performance Node.js FTP server built for receiving periodic snapshots, event-triggered images, and video recording uploads from IP cameras (e.g. Novatek NT9856x, Hikvision, Dahua).

## Features
- **High Concurrency & Fast I/O:** Built on pure JavaScript asynchronous networking (`ftp-srv`).
- **Passive Mode (PASV) Support:** Built-in configurable passive port range (30000–30100) for seamless firewall traversal.
- **Dedicated Uploads Directory:** Stores snapshots cleanly under `./uploads/`.
- **PM2 Ready:** Includes process supervisor configuration for 24/7 background operation with auto-restart.

---

## Installation & Setup

1. **Clone repository:**
   ```bash
   git clone https://github.com/irudrapatel/FTP_Server.git
   cd FTP_Server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Grant port 21 binding capability (Linux non-root):**
   ```bash
   sudo setcap 'cap_net_bind_service=+ep' $(which node)
   ```

4. **Run directly:**
   ```bash
   node server.js
   ```

5. **Run in background with PM2:**
   ```bash
   pm2 start server.js --name ftp-server
   pm2 save
   ```

---

## Camera Configuration (Novatek Web UI)

Open the camera web interface and navigate to **Network > FTP**:

| Field | Value |
| :--- | :--- |
| **FTP Enable** | `ON` |
| **Server Address** | Your Server IP (e.g. `192.168.7.158`) |
| **Port** | `21` |
| **Username** | `camera` (or `admin`) |
| **Password** | `camera123` (or `Rudra@8160`) |
| **Remote Path** | `/` |
| **Interval** | `60` seconds (periodic upload) |
| **Event Upload** | `ON` (uploads snapshot on every motion/AI event) |

---

## License
MIT
