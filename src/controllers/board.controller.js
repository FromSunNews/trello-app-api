import { HttpStatusCode } from '*/utilities/constants'
import { BoardService } from '*/services/board.service'

const createNew = async (req, res) => {
  try {
    const result = await BoardService.createNew(req.body)
    res.status(HttpStatusCode.OK).json(result)
  } catch (error) {
    console.log(error)
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(error)
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      errors: error.message
    })
  }
}

export const BoardController = { createNew }