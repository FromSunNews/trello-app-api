import Joi from 'joi'
import { getDB } from '*/config/mongodb'
import { ObjectId } from 'mongodb'
//Define card collection
const cardCollectionName = 'cards'
const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(), // also ObjectId when create new
  columnId: Joi.string().required(), // also ObjectId when create new
  title: Joi.string().required().min(3).max(30).trim(),
  cover: Joi.string().default(null),
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})
const validateSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, { abortEarly: false })
}

const findOneById = async (id) => {
  try {
    const result = await getDB().collection(cardCollectionName).findOne({ _id: ObjectId(id) })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const createNew = async (data) => {
  try {
    const validatedValue = await validateSchema(data)
    const insertValue = {
      ...validatedValue,
      boardId: ObjectId(validatedValue.boardId),
      columnId: ObjectId(validatedValue.columnId)
    }
    const result = await getDB().collection(cardCollectionName).insertOne(insertValue)

    return result
  } catch (error) {
    console.log(error)
  }
}
/**
 *
 * @param {Array of string card id} ids
 */
const deleteMany = async (ids) => {
  try {
    const transformIds = ids.map(i => ObjectId(i))
    const result = await getDB().collection(cardCollectionName).updateMany(
      { _id: { $in: transformIds } },
      { $set: { _destroy: true } }
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const updateData = { ...data }
    if (updateData.boardId) updateData.boardId = ObjectId(data.boardId)
    if (updateData.columnId) updateData.columnId = ObjectId(data.columnId)

    const result = await getDB().collection(cardCollectionName).findOneAndUpdate(
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

export const CardModel = {
  createNew,
  cardCollectionName,
  deleteMany,
  update,
  findOneById
}
