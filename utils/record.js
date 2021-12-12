
import shortId from "shortid"

export function make(url) {
    return {
        originalUrl: url,
        hashed: shortId.generate(),
        createdAt: Date.now(),
        lastVisitedAt: null,
        clicks: []
    }
}

export function count_click(record) {
    return { ...record, clicks: record.clicks.push(Date.now()), lastVisitedAt: Date.now() }
}