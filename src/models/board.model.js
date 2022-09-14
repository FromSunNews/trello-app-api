import Joi from 'joi'
import { getDB } from '*/config/mongodb'
import { ObjectId } from 'mongodb'
import { ColumnModel } from './column.model'
import { CardModel } from './card.model'
//Define board collection
const boardCollectionName = 'boards'
const boardCollectionSchema = Joi.object({
  title: Joi.string().required().min(3).max(20).trim(),
  columnOrder: Joi.array().items(Joi.string()).default([]),
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})
const validateSchema = async (data) => {
  return await boardCollectionSchema.validateAsync(data, { abortEarly: false })
}

const findOneById = async (id) => {
  try {
    const result = await getDB().collection(boardCollectionName).findOne({ _id: ObjectId(id) })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const createNew = async (data) => {
  try {
    const value = await validateSchema(data)
    const result = await getDB().collection(boardCollectionName).insertOne(value)
    return result
  } catch (error) {
    throw new Error(error)
  }
}
/**
 *
 * @param {string} boardId
 * @param {string} comlumnId
 */
const pushColumnModel = async (boardId, comlumnId) => {
  try {
    const result = await getDB().collection(boardCollectionName).findOneAndUpdate(
      { _id: ObjectId(boardId) },
      { $push: { columnOrder: comlumnId } },
      { returnOriginal: false }
    )
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}
const getFullBoard = async (boardId) => {
  try {
    const result = await getDB().collection(boardCollectionName).aggregate([
      {
        $match: {
          _id: ObjectId(boardId),
          _destroy: false
        }
      },
      {
        $lookup: {
          from: ColumnModel.columnCollectionName, //collection name
          localField: '_id',
          foreignField: 'boardId',
          as: 'columns'
        }
      },
      {
        $lookup: {
          from: CardModel.cardCollectionName, //collection name
          localField: '_id',
          foreignField: 'boardId',
          as: 'cards'
        }
      }
    ]).toArray()

    console.log(result)

    return result[0] || {}
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const updateData = { ...data }

    const result = await getDB().collection(boardCollectionName).findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    )
    console.log(result)
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}
export const BoardModel = {
  createNew,
  getFullBoard,
  pushColumnModel,
  update,
  findOneById
}
