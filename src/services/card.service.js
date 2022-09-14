import { CardModel } from '*/models/card.model'
import { ColumnModel } from '../models/column.model'

const createNew = async (data) => {
  try {
    const createdCard = await CardModel.createNew(data)
    const getNewCard = await CardModel.findOneById(createdCard.insertedId.toString())

    //Update cardOrder in column
    await ColumnModel.pushCardOrder(getNewCard.columnId.toString(), getNewCard._id.toString())

    return getNewCard
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
    if (updateData._id) delete updateData._id

    let updatedCard = await CardModel.update(id, updateData)

    return updatedCard
  } catch (error) {
    throw new Error(error)
  }
}


export const CardService = {
  createNew,
  update
}