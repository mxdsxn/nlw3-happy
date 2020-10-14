import express from 'express'
import path from 'path'

import './database/connection'
import { routes } from './routes'

const server = express()

server.use(express.json())
server.use(routes)
server.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

server.get('/', (req, res) => (res.json({ mensagem: 'rodando server' })))

server.listen(3333)

console.log('Rodando server')