/**
* Parses a query string
* @param {string} query - The query to parse
* @returns {Object} - An object with key:value pairs
*/
module.exports = function(query){
    query = query.substring(1);
    let query_string = {};
    const vars = query.split('&');
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split('=');
        if (typeof query_string[pair[0]] === 'undefined') {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
        } else if (typeof query_string[pair[0]] === 'string') {
            const arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
            query_string[pair[0]] = arr;
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }

    if (Object.keys(query_string).includes(''))
        return null;
    else
        return query_string;
};
