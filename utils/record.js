
import shortId from "shortid"

export function make(url, private_) {
    return {
        destination: url,
        hashed: shortId.generate(),
        createdAt: Date.now(),
        lastVisitedAt: null,
        clicks: [],
        private: private_,
    }
}

export function recordClick(record, userAgent, language, referrer) {
    let clicks = Array.isArray(record.clicks) ? record.clicks : []
    clicks.push({ t: Date.now(), u: userAgent, l: language, r: referrer })

    return { ...record, clicks: clicks, lastVisitedAt: Date.now() }
}

export function toAbsoluteUrl(record) {
    return window.location.origin + "/" + record.hashed
}

export function getTrend(data, range = "daily") {
    function compare(date1, date2) {
        let year = date2.getFullYear() === date1.getFullYear()
        let month = date2.getMonth() === date1.getMonth()
        let day = date2.getDay() === date1.getDay()
        let hour = date2.getHours() === date1.getHours()
        let minute = date2.getMinutes() === date1.getMinutes()
        switch (range) {
            case "per-minute":
                return year && month && day && hour && minute
            case "hourly":
                return year && month && day && hour
            case "daily":
            default:
                return year && month && day
            case "monthly":
                return year && month
        }
    }
    function makeRange() {
        let result = []
        let date = new Date()
        switch (range) {
            case "per-minute":
                for (let i = 0; i < 12; i++) {
                    result.push(date.setMinutes(date.getMinutes() - i))
                }
                break;
            case "hourly":
                for (let i = 0; i <= 24; i++) {
                    result.push(date.setHours(date.getHours() - i))
                }
                break;
            case "daily":
            default:
                for (let i = 0; i <= 31; i++) {
                    result.push(date.setDay(date.getDay() - i))
                }
                break;
            case "monthly":
                for (let i = 0; i <= 12; i++) {
                    result.push(date.setMonth(date.getMonth() - i))
                }
                break;
        }
        return result;
    }
    let daily = data.clicks.reduce((acc, value) => {
        let timestamp = value.hasOwnProperty("t") ? value.t : value
        let date = new Date(timestamp);
        let last = acc[acc.length - 1]
        if (last) {
            let date2 = new Date(last[0]);
            if (compare(date, date2)) {
                acc[acc.length - 1].push(timestamp)
            } else {
                acc.push([timestamp])
            }
        } else {
            acc.push([timestamp])
        }
        return acc;
    }, []).map(clicks => clicks.length)

    let padding = Array.from({ length: 7 - daily.length > 0 ? 7 - daily.length : 0 }, () => 0);
    let trend = padding.concat(daily);

    console.log(data.destination, "clicks: ", data.clicks)
    console.log(data.destination, "trend: ", trend)

    return trend;
}