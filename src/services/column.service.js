import { ColumnModel } from '*/models/column.model'
import { BoardModel } from '*/models/board.model'
import { CardModel } from '*/models/card.model'
import { ObjectID } from 'mongodb'
const createNew = async (data) => {
  try {
    //transaction mongodb
    const newColumn = await ColumnModel.createNew(data)
    newColumn.cards = []
    //Update conlumnOrder in board collection
    console.log(typeof newColumn.boardId)
    console.log(typeof newColumn.boardId.toString())
    await BoardModel.pushColumnModel(newColumn.boardId.toString(), newColumn._id.toString())

    return newColumn
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
    if (updateData.cards) delete updateData.cards

    let updatedColumn = await ColumnModel.update(id, updateData)
    if (updatedColumn) {
      //delete many cards in this column
      CardModel.deleteMany(updatedColumn.cardOrder)
    }
    return updatedColumn
  } catch (error) {
    throw new Error(error)
  }
}
export const ColumnService = {
  createNew,
  update
}