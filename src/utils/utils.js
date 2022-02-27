function sortObj(obj) {
    // code from https://www.w3docs.com/snippets/javascript/how-to-sort-javascript-object-by-key.html
    return Object.keys(obj).sort().reduce(function(result, key) {
        result[key] = obj[key];
        return result;
    }, {});
}

export { sortObj }