import Joi from 'joi'
import { ObjectID } from 'mongodb'
import { getDB } from '*/config/mongodb'
//Define board collection
const columnCollectionName = 'columns'
const columnCollectionSchema = Joi.object({
  boardId: Joi.string().required(),
  title: Joi.string().required().min(3).max(20).trim(),
  cardOrder: Joi.array().items(Joi.string()).default([]),
  createAt: Joi.date().timestamp().default(Date.now()),
  updateAt: Joi.date().timestamp().default(null),
  _destroy: Joi.boolean().default(false)
})
const validateSchema = async (data) => {
  return await columnCollectionSchema.validateAsync(data, { abortEarly: false })
}
const createNew = async (data) => {
  try {
    const value = await validateSchema(data)
    const result = await getDB().collection(columnCollectionName).insertOne(value)
    return result.ops[0]
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const result = await getDB().collection(columnCollectionName).findOneAndUpdate(
      { _id: ObjectID(id) },
      { $set: data },
      { returnOriginal: false }
    )
    console.log(result)
    return result.value
  } catch (error) {
    throw new Error(error)
  }
}
export const ColumnModel = {
  createNew,
  update
}
