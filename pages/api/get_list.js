import { connectToDatabase } from '../../utils/mongodb'

export default async (req, res) => {
    let limit = req.query.limit || 5

    let { db } = await connectToDatabase();

    let lastTen = await db
        .collection("primary")
        .find({ private: { $eq: false } })
        .sort({ createdAt: -1 })
        .limit(limit)
        .toArray();

    res.status(200).json(lastTen)
}
