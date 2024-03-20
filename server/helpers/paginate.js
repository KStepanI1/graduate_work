module.exports = function paginate(arr, limit = 1000, offset = 0) {
    return arr.slice(offset, offset + limit);
};
