import { connectToDatabase } from '../../utils/mongodb'

export default async (req, res) => {
    let limit = req.query.limit || 5

    if (typeof limit === "string") {
        try {
            limit = Number.parseInt(limit)
        } catch (error) {
            res.setStatus(400).json({ message: "Type error: 'limit' query param must be a number" })
        }
    }

    let { db } = await connectToDatabase();

    let lastTen = await db
        .collection("primary")
        .find({ private: { $eq: false } })
        .sort({ createdAt: -1 })
        .limit(limit)
        .toArray();

    res.status(200).json(lastTen)
}
