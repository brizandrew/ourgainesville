module.exports = function(element, name){
    var index = element.className.indexOf(name);
    var classNames = element.className;
    var has = index >= 0;
    if(has)
        classNames = classNames.substring(0, index) + classNames.substring(index + name.length, classNames.length);
    else
        classNames = classNames + ' ' + name;

    element.className = classNames;
};
