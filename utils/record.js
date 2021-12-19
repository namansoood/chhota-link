
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

export function getWeeklyTrend(data) {
    let daily = data.clicks.reduce((acc, value) => {
        let date = new Date(value);
        let last = acc[acc.length - 1]
        if (last) {
            let date2 = new Date(last[0]);
            if (date2.getFullYear() === date.getFullYear() &&
                date2.getMonth() === date.getMonth() &&
                date2.getDay() === date.getDay()) {
                acc[acc.length - 1].push(value)
            } else {
                acc.push([value])
            }
        } else {
            acc.push([value])
        }
        return acc;
    }, []).map(clicks => clicks.length)

    let padding = Array.from({ length: 7 - daily.length > 0 ? 7 - daily.length : 0 }, () => 0);
    let trend = padding.concat(daily);

    console.log(data.destination, "clicks: ", data.clicks)
    console.log(data.destination, "trend: ", trend)

    return trend;
}