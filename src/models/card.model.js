import Joi from 'joi'
import { getDB } from '*/config/mongodb'
import { ObjectID } from 'mongodb'
//Define card collection
const cardCollectionName = 'cards'
const cardCollectionSchema = Joi.object({
  boardId: Joi.string().required(), // also ObjectID when create new
  columnId: Joi.string().required(), // also ObjectID when create new
  title: Joi.string().required().min(3).max(30).trim(),
  cover: Joi.string().default(null),
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})
const validateSchema = async (data) => {
  return await cardCollectionSchema.validateAsync(data, { abortEarly: false })
}
const createNew = async (data) => {
  try {
    const validatedValue = await validateSchema(data)
    const insertValue = {
      ...validatedValue,
      boardId: ObjectID(validatedValue.boardId),
      columnId: ObjectID(validatedValue.columnId)
    }
    const result = await getDB().collection(cardCollectionName).insertOne(insertValue)
    return result.ops[0]
  } catch (error) {
    console.log(error)
  }
}
export const CardModel = {
  createNew,
  cardCollectionName
}
