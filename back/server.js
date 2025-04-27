import express from 'express'
import cors from 'cors'

import postsRoutes from './routes/possts.routes.js'
import {postLog} from './middleware/posts.middleware.js'
const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(cors())
app.use(postLog)

app.use(postsRoutes)

app.listen(PORT, console.log(`🍒 Server http://localhost:${PORT}`))