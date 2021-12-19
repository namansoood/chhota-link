[1639353295150, 1639353329044, 1639353332764, 1639353347939, 1639353456535, 1639353515577, 1639355964067, 1939356864067, 2939356864067]
    .reduce((acc, value) => {
        let date = new Date(value);
        if (acc[0]) {
            let date2 = new Date(acc[0][0]);
            console.log(date)
            console.log(date2)
            if (date2.getFullYear() === date.getFullYear() &&
                date2.getMonth() === date.getMonth() &&
                date2.getDay() === date.getDay()) {
                acc[0].push(value)
            } else {
                acc.push([value])
            }
        } else {
            acc.push([value])
        }
        return acc;
    }, []).map(clicks => clicks.length)