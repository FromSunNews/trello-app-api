import express from 'express'
import cors from 'cors'
//khai báo đầy đủ .js
import { connectDB } from '*/config/mongodb'
import { env } from '*/config/environment'
import { apiV1 } from '*/routes/v1'
import { corsOptions } from '*/config/cors'
connectDB()
    .then(() => console.log('Connected sussessfully to database server'))
    .then(() => bootServer())
    .catch(error => {
        console.log(error)
        process.exit(1)
    })

const bootServer = () => {
    const app = express()

    app.use(cors(corsOptions))
    // Enable req.body data
    app.use(express.json())
    //Use Apis v1
    app.use('/v1', apiV1)

    // app.listen(env.APP_PORT, env.APP_HOST, () => {
    //     // eslint-disable-next-line no-console
    //     console.log(`Listening on ${env.APP_HOST}:${env.APP_PORT}`)
    // })

    //Suport heroku deployment
    app.listen(env.APP_PORT || process.env.PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`Listening on at port :${process.env.PORT}/`)
    })
}
