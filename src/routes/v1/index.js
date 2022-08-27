import express from 'express'
import { HttpStatusCode } from '*/utilities/constants'
import { boardRoutes } from './board.route'
import { columnRoutes } from './column.route'
import { cardRoutes } from './card.route'

const router = express.Router()

//Get v1/status
router.get('/status', (req, res) => res.status(HttpStatusCode.OK).json({ status: 'OK' }))
// Board apis
router.use('/boards', boardRoutes)
// Column apis
router.use('/columns', columnRoutes)
// Card apis
router.use('/cards', cardRoutes)
export const apiV1 = router