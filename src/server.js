import express from 'express'
//khai báo đầy đủ .js
import { connectDB } from '*/config/mongodb'
import { env } from '*/config/environment'

connectDB()
    .then(() => console.log('Connected sussessfully to database server'))
    .then(() => bootServer())
    .catch(error => {
        console.log(error)
        process.exit(1)
    })

const bootServer = () => {
    const app = express()
    app.get('/test', async (req, res) => {


        res.end('<h1>Hello worldasdas!</h1><hr/>')
    })

    app.listen(env.APP_PORT, env.APP_HOST, () => {
        // eslint-disable-next-line no-console
        console.log(`Listening on ${env.APP_HOST}:${env.APP_PORT}`)
    })
}
