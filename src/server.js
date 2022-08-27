import express from 'express'
//khai báo đầy đủ .js
import { connectDB } from '*/config/mongodb'
import { env } from '*/config/environment'
import { apiV1 } from '*/routes/v1'

connectDB()
    .then(() => console.log('Connected sussessfully to database server'))
    .then(() => bootServer())
    .catch(error => {
        console.log(error)
        process.exit(1)
    })

const bootServer = () => {
    const app = express()
    // Enable req.body data
    app.use(express.json())
    //Use Apis v1
    app.use('/v1', apiV1)

    app.listen(env.APP_PORT, env.APP_HOST, () => {
        // eslint-disable-next-line no-console
        console.log(`Listening on ${env.APP_HOST}:${env.APP_PORT}`)
    })
}
