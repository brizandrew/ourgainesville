/**
 * Creates new elements
 * @module newElement
 */
module.exports = {
    /**
    * Creates a new element based on a config file
    * @param {Object} config - Options for creating an element
    * @param {String} config.name - The name of the HTML element (i.e. tag)
    * @param {String} [config.id] - The name of a id attribute to add
    * @param {String} [config.className] - The name of a class attribute to add
    * @param {HTMLElement} [config.appendTo] - The element this element should be appended to
    * @param {Object} [config.attrs] - Options for other attributes in key:value pairs.
    * @param {String} [config.innerHTML] - The inner HTML contents of the element
    * @param {Object} [config.styles] - Inline CSS style rules in using javascript style properties in key:value pairs.
    * @param {Object[]} [config.rules] - CSS style rules in JSON format (only for making new "style" elements)
    * @param {String} config.rules[].selector - CSS selector to apply certain properties to
    * @param {Object[]} config.rules[].properties - Properties to apply to the selected elements
    * @param {String} config.rules.proerties[].prop - Name of the property
    * @param {String} config.rules.proerties[].val - Value to assign to the property
    */
    newElement: function(config){
        if(config.name === undefined){
            throw new Error('New Element: element node needs name.');
        }
        else if(typeof(config.name) != 'string'){
            throw new Error('New Element: name must be a string.');
        }
        else{
            var ele;
            if(config.name.toLowerCase() == 'svg')
                ele = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            else if(config.name.toLowerCase() == 'path')
                ele = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            else
                ele = document.createElement(config.name);

            if(config.id !== undefined){
                if(typeof(config.id) != 'string')
                    throw new Error('New Element: id must be a string.');
                else
                    ele.id = config.id;
            }

            if(config.className !== undefined){
                if(typeof(config.className) != 'string')
                    throw new Error('New Element: className must be a string.');
                else
                    ele.className = config.className;
            }

            if(config.appendTo !== undefined){
                if(!(config.appendTo instanceof HTMLElement))
                    throw new Error('New Element: appendTo must be an HTMLElement.');
                else
                    config.appendTo.appendChild(ele);
            }

            if(config.innerHTML !== undefined){
                if(typeof(config.innerHTML) != 'string')
                    throw new Error('New Element: innerHTML must be a string.');
                else
                    ele.innerHTML = config.innerHTML;
            }

            if(config.attrs !== undefined){
                if(config.name.toLowerCase() == 'svg' || config.name.toLowerCase() == 'path'){
                    for(var attrNS in config.attrs){
                        if(typeof(config.attrs[attrNS]) != 'string')
                            throw new Error('New Element: attribute values must be strings.');
                        else
                            ele.setAttributeNS(null, attrNS, config.attrs[attrNS]);
                    }
                }
                else{
                    for(var attr in config.attrs){
                        if(typeof(config.attrs[attr]) != 'string')
                            throw new Error('New Element: attribute values must be strings.');
                        else
                            ele.setAttribute(attr, config.attrs[attr]);
                    }
                }
            }

            if(config.styles !== undefined){
                for(var style in config.styles){
                    if(typeof(config.styles[style]) != 'string')
                        throw new Error('New Element: style values must be strings.');
                    else
                        ele.style[style] = config.styles[style];
                }
            }

            if(config.rules !== undefined && config.name.toLowerCase() == 'style'){
                var css = '';
                for (var i = 0; i < config.rules.length; i++) {
                    css += this._newStyleRule(config.rules[i]);
                }
                ele.innerHTML = css;
            }

            return ele;
        }
    },

    _newStyleRule: function(config){
        if(typeof(config.selector) != 'string')
            throw new Error('New Element: css selector must be a string.');
        else{
            var output = config.selector + '{';
            for (var i = 0; i < config.properties.length; i++) {
                if(typeof(config.properties[i].prop) != 'string' && typeof(config.properties[i].val) != 'string')
                    throw new Error('New Element: css properties and values must be strings. ' + config.selector + ' properites/values are invalid.');
                else{
                    output += config.properties[i].prop + ':';
                    output += config.properties[i].val + ';';
                }
            }
            output += '}';
            return output;
        }
    }
};
