import { BoardModel } from '*/models/board.model'

const createNew = async (data) => {
  try {
    const result = await BoardModel.createNew(data)
    return result
  } catch (error) {
    throw new Error(error)
  }
}
const getFullBoard = async (boardId) => {
  try {
    const board = await BoardModel.getFullBoard(boardId)
    //add card to each column
    board.columns.forEach(column => {
      column.cards = board.cards.filter(cards => cards.columnId.toString() === column._id.toString())
    })

    //Sort columns by colomnOrder, sort cards by cardOrder
    // this step will pass to frontend Dev :))) Ok ?

    // delete cards from board
    delete board.cards
    console.log(board)
    return board
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardService = { createNew, getFullBoard }