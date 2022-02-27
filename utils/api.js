const dev = process.env.NODE_ENV !== 'production';
const origin = dev ? 'http://localhost:3001' : 'https://chhotal.ink';

export function getByUrl(url, private_ = false) {
    return fetch(`${origin}/api/get?url=${url}&private=${private_ ? "true" : "false"}`)
}

export function getByShort(short, visit = false, headers = {}) {
    return fetch(`${origin}/api/get?short=${short}${visit ? "&visit=true" : ""}&lang=${headers["accept-language"]}&ua=${headers["user-agent"]}&ref=${headers["referer"]}`)
}

export function getList(limit = 10) {
    return fetch(`${origin}/api/get_list?limit=${limit}`)
}