function handleResult(result) {
    if (result !== null) {
        return JSON.stringify(result);
    }
    return null;
}

module.exports = handleResult;
