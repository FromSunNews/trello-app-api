import { BoardModel } from '*/models/board.model'
import { cloneDeep } from 'lodash'
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

    if (!board || !board.columns) {
      throw new Error('Board not found')
    }
    const tranformBoard = cloneDeep(board)
    //filter destroy columns
    tranformBoard.columns = tranformBoard.columns.filter(column => !column._destroy)
    //add card to each column
    tranformBoard.columns.forEach(column => {
      column.cards = tranformBoard.cards.filter(cards => cards.columnId.toString() === column._id.toString())
    })

    //Sort columns by colomnOrder, sort cards by cardOrder
    // this step will pass to frontend Dev :))) Ok ?

    // delete cards from board
    delete tranformBoard.cards

    return tranformBoard
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const updateData = {
      ...data,
      updateAt: Date.now()
    }
    console.log('updateData')
    console.log(updateData)
    if (updateData._id) delete updateData._id
    if (updateData.columns) delete updateData.columns

    let updatedBoard = await BoardModel.update(id, updateData)

    return updatedBoard
  } catch (error) {
    throw new Error(error)
  }
}

export const BoardService = { createNew, getFullBoard, update }