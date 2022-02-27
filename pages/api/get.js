import { connectToDatabase } from '../../utils/mongodb'
import { make, recordClick } from '../../utils/record'

export default async (req, res) => {
  let url = req.query.url
  let private_ = (req.query.private === "true") || false
  let short = req.query.short
  let visit = req.query.visit;
  let userAgent = req.query.ua;
  let language = req.query.lang;
  let referrer = req.query.ref

  let { db } = await connectToDatabase();

  if (typeof private_ !== "boolean") {
    res.status(400).json({ message: "Type error: 'private' query param must be a boolean" })
    return;
  }


  if (url) {
    // validate passed url
    try {
      new URL(url);
    } catch (_) {
      res.status(400).json({ message: "Invalid URL passed." })
      return false;
    }

    // validate url length, smaller than 30 is already short!
    if (url.length >= 30) {

      // read existing record of url
      let matches = await db
        .collection('primary')
        .find({ destination: { $eq: url } })
        .toArray();

      let existing = matches[0]

      // make an instance of new record if doesn't exist already
      let record = existing ? existing : make(url, private_)

      if (!existing) {
        await db.collection('primary').insertOne(record)
      }

      res.status(200).json(record)
    } else {
      res.status(400).json({ message: "Given URL is not long enough." })
    }
  } else if (short) {

    // read existing record of url
    let matches = await db
      .collection('primary')
      .find({ hashed: { $eq: short } })
      .toArray();

    let existing = matches[0]

    // respond with existing record, otherwise throw 404
    if (existing) {
      if (visit === "true") {
        await db.collection('primary')
          .updateOne({ hashed: { $eq: short } }, { $set: recordClick(existing, userAgent, language, referrer) });
      }

      res.status(200).json({ ...make("", private_), ...existing })

    } else {
      res.status(404).json({ message: "Record not found with id '" + short + "'" })
    }
  } else {
    res.status(400).json({ message: "Missing 'url' query param" })
  }
}
