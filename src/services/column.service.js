import { ColumnModel } from '*/models/column.model'
import { BoardModel } from '*/models/board.model'
import { CardModel } from '*/models/card.model'
const createNew = async (data) => {
  try {
    //transaction mongodb
    const createdColumn = await ColumnModel.createNew(data)
    const getNewColumn = await ColumnModel.findOneById(createdColumn.insertedId.toString())

    getNewColumn.cards = []
    //Update conlumnOrder in board collection
    await BoardModel.pushColumnModel(getNewColumn.boardId.toString(), getNewColumn._id.toString())

    return getNewColumn
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