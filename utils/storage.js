const version = 5;

function makeKey(v) {
    var v = v > 1 ? `-v${v}` : ""
    return `__cl_st${v}`;
}

export function useStorage() {
    for (let i = 0; i < version; i++) {
        window.localStorage.removeItem(makeKey(i))
    }

    function set(data) {
        return window.localStorage.setItem(makeKey(version), data.join(","))
    }
    function get() {
        let data = window.localStorage.getItem(makeKey(version)) || ""
        return data.split(",")
    }

    return [get, set]
}