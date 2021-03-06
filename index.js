
module.exports = function (array, callback) {

    if (typeof callback !== 'function') {
        throw new Error('Callback function required');
        return;
    }

    if (typeof array !== 'object') {
        callback( new Error('The first parameter must be an array') );
        return;
    }

    var pushChunk = function (start, end) {
        if (start == end){
            encodingArray.push(array[start]);
        } else {
            encodingArray.push(array[start] + "-" + array[end]);
        }
    };

    var encodingArray = [], start = 0, length = array.length;

    for (var i = 1; i < length; i++) {

        if ((array[i] - array[i-1]) > 1) {

            pushChunk(start, i-1);
            start = i;
        }
    }

    pushChunk(start, i-1);

    callback(null, encodingArray.join(','));
};
