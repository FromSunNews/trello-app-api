import express from 'express'
//khai báo đầy đủ .js
import { connectDB } from '*/config/mongodb'
import { env } from '*/config/environment'


const app = express()

connectDB().catch(console.log)
app.get('/', (req, res) => {
    res.end('<h1>Hello worldasdas!</h1><hr/>')
})

app.listen(env.PORT, env.HOST_NAME, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening on ${env.HOST_NAME}:${env.PORT}`)
})