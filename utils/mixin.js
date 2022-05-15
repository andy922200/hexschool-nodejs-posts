function stringChecker(target = "") {
    return typeof target === 'string' ? target.trim() : ''
}

module.exports = {
    stringChecker
}