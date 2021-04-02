export function formatDate(timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + ' | ' + d.toLocaleDateString()
}

export function shuffleArray([...array]) {
    var idx = array.length,
        temp,
        newIdx
    while (0 !== idx) {
        newIdx = Math.floor(Math.random() * idx)
        idx -= 1

        temp = array[idx]
        array[idx] = array[newIdx]
        array[newIdx] = temp
    }

    return array
}
