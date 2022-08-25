import express from 'express'
//khai báo đầy đủ .js
import { mapOrder } from './utilities/sorts.js'

const app = express()
const hostname = 'localhost'

const port = 9000
app.get('/', (req, res) => {
    res.end('<h1>Hello world!</h1><hr/>')
})

app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening on ${hostname}:${port}`)
})