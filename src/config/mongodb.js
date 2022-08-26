import { MongoClient } from 'mongodb'
import { env } from '*/config/environment'
//phuongtu590
//4mbYHcrZ4zU5oCAD
const uri = env.MONGODB_URI

export const connectDB = async () => {
  const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  try {
    //Connect the client to server
    await client.connect()
    console.log('Connected succeessfully to server!!!')

    //list databases
    await listDatabases(client)
  }
  catch (e) {
    console.log(e)
  } finally {
    //Close the client
    await client.close()
    console.log('Close the client')
  }
}

const listDatabases = async (client) => {
  const databasesList = await client.db().admin().listDatabases()
  console.log(databasesList)
  databasesList.databases.forEach(db => console.log(` - ${db.name}`))
}
