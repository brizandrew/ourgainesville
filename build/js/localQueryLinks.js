/**
 * Function called when a button is clicked or a pop state event is dispatched
 * @callback linkCallback
 * @param {number} queryString - The query string of the link
 */

/**
* Converts local links with url parameters into push state causing buttons
* @callback linkCallback
*/
module.exports = {
    parseURL: function(url){
        var parser = document.createElement('a');
        parser.href = url;
        var query_string = {};
        var query = parser.search.substring(1);
        var vars = query.split('&');
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split('=');
            if (typeof query_string[pair[0]] === 'undefined') {
                query_string[pair[0]] = decodeURIComponent(pair[1]);
            } else if (typeof query_string[pair[0]] === 'string') {
                var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
                query_string[pair[0]] = arr;
            } else {
                query_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }

        if (Object.keys(query_string).includes(''))
            query_string = null;

        return {
            'origin':parser.origin,
            'protocol':parser.protocol,
            'hostname':parser.hostname,
            'port':parser.port,
            'pathname':parser.pathname,
            'hash':parser.hash,
            'host':parser.host,
            'query': query_string
        };
    },

    reroute: function(callback){
        const queryLinkClicked = new Event('queryLinkClicked');

        const localLinks = Array.from(document.querySelectorAll('a')).filter(a => {
            const urlObj = this.parseURL(a.href);
            const isLocal =  urlObj.origin + urlObj.pathname == window.location.origin + window.location.pathname;

            if(isLocal && a.getAttribute('localQueryLink') === null)
                return true;
        });

        localLinks.forEach(a => {
            a.setAttribute('localQueryLink', '');
            a.addEventListener('click', e => {
                e.preventDefault();
                let url = window.location.origin + window.location.pathname + a.getAttribute('href');
                history.pushState(null, a.innerHTML, url );
                document.dispatchEvent(queryLinkClicked);
                if(callback !== undefined){
                    callback(this.parseURL(a.href).query);
                }
            });
        });

        if(callback !== undefined){
            window.addEventListener('popstate', () => {
                callback(this.parseURL(window.location.href).query);
            });
        }
    }
};
