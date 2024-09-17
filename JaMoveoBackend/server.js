import http from 'http'
import path from 'path'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'

import { setupSocketAPI } from './services/socket.service.js'
import { loggerService } from "./services/logger.service.js"

const app = express()
const server = http.createServer(app)

// App configuration
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
// app.use(cors(corsOptions))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3030',
            'http://localhost:3030',
            'http://127.0.0.1:5173',
            'http://localhost:5173'
        ],
        credentials: true
    }
    app.use(cors(corsOptions))
}


import { songRoutes } from './api/song/song.routes.js'
import { userRoutes } from "./api/user/user.routes.js"
import { authRoutes } from './api/auth/auth.routes.js'

// Routes
app.use('/api/song', songRoutes)
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

setupSocketAPI(server)

// fallback route
app.get('/**', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})


const port = process.env.PORT || 3030

server.listen(port, () => {
    loggerService.info('Up and running on port', port)
})