
import shortId from "shortid"

export function make(url) {
    return {
        destination: url,
        hashed: shortId.generate(),
        createdAt: Date.now(),
        lastVisitedAt: null,
        clicks: [],
        private: false,
    }
}

export function countClick(record) {
    let clicks = Array.isArray(record.clicks) ? record.clicks : []
    clicks.push(Date.now())

    return { ...record, clicks: clicks, lastVisitedAt: Date.now() }
}

export function toAbsoluteUrl(record) {
    return window.location.origin + "/" + record.hashed
}