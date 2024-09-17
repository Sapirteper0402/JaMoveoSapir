import { loggerService } from './logger.service.js'
import { Server } from 'socket.io';

var gIo = null

// Socket.io connection
export function setupSocketAPI(http) {
    gIo = new Server(http, {
        cors: {
            origin: '*',
        }
    })

    gIo.on('connection', socket => {
        loggerService.info(`New connected socket [id: ${socket.id}]`)

        // Admin selects a song, notify all clients
        socket.on('admin-select-song', songId => {
            loggerService.info(`Admin selected song [id: ${songId}]`);
            gIo.emit('song-selected', songId);  // Broadcast to all connected clients
        })

        // Admin quits the session
        socket.on('admin-quit', () => {
            loggerService.info(`Admin quit the session [id: ${socket.id}]`);
            gIo.emit('session-ended');  // Broadcast to all connected clients
        })

    })
}
