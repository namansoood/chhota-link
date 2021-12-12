import { connectToDatabase } from '../../utils/mongodb'
import { make } from '../../utils/record'

export default async (req, res) => {
  let url = req.query.url
  let short = req.query.short

  let { db } = await connectToDatabase();

  if (url) {
    // read existing record of url
    let matches = await db
      .collection('primary')
      .find({ originalUrl: { $eq: url } })
      .toArray();

    let existing = matches[0]

    // make an instance of new record if doesn't exist already
    let record = existing ? existing : make(url)

    if (!existing) {
      await db.collection('primary').insertOne(record)
    }

    res.status(200).json(record)
  } else if (short) {

    // read existing record of url
    let matches = await db
      .collection('primary')
      .find({ hashed: { $eq: short } })
      .toArray();

    let existing = matches[0]

    // respond with existing record, otherwise throw 404
    if (existing) {
      res.status(200).json(existing)
    } else {
      res.status(404).json({ message: "Record not found with id '" + short + "'" })
    }
  } else {
    res.status(401).json({ message: "Missing 'url' query param" })
  }
}
