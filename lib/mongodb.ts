import { MongoClient, type MongoClientOptions } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error(
    'MONGODB_URI environment variable is not set. ' +
    'Add it to .env.local before running the dev server.'
  )
}

const uri = process.env.MONGODB_URI
const options: MongoClientOptions = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  // Allow global var in development to prevent multiple connections
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (process.env.NODE_ENV === 'development') {
  // Re-use connection across hot reloads in dev
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise
