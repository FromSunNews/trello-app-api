import { ColumnModel } from '*/models/column.model'
import { BoardModel } from '*/models/board.model'

const createNew = async (data) => {
  try {
    //transaction mongodb
    const newColumn = await ColumnModel.createNew(data)
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

    const result = await ColumnModel.update(id, updateData)
    return result
  } catch (error) {
    throw new Error(error)
  }
}
export const ColumnService = {
  createNew,
  update
}