function async(fn, callback) {
    setTimeout(function () {
        fn();
        if (callback)
            callback();
    }, 0);
};
function RandomLetters(len) { return Math.random().toString(36).substring(len); }

var Encode = function() {
	var encodeDiv = $('<div />');
	return function(str) {
		return encodeDiv.text(str).html();
	}
}();
function EncodeWithQuota(str) {
    return Encode(str).replaceAll('"', '&quot;');
}
var isFunction = function (obj) { return (typeof obj === "function"); }
var isObject = function (obj) { return (typeof obj === "object"); }

if (!IsStringNullOrEmpty)
    function IsStringNullOrEmpty(str) { return (!str || !str.trim()); }
if (!IsNotNullAndHasAny)
    function IsNotNullAndHasAny(f) { return f != null && f.length > 0; };
if (!Not)
    function Not(bln) { return !bln; };
if (!Sum)
    function Sum(num1, num2) { return num1 + num2; };
if (!Multiply)
    function Multiply(num1, num2) { return num1 * num2; };
if (!GetRange)
    function GetRange(from, to) {
        var rang = [];
        for (var i = from; i <= to; i++)
            rang.push(i);
        return rang;
    };

if (!DeepClone)
    function DeepClone(obj) {
        return jQuery.extend(true, {}, obj);
    }
if (!DeepCloneArray)
    function DeepCloneArray(obj) {
        return jQuery.extend(true, [], obj);
    }
if (!('find' in Array.prototype)) {
    Array.prototype.find = function (find, that /*opt*/) {
        var v;
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this && find.call(that, v = this[i], i, this))
                return v;
        return null;
    };
}
// Add ECMA262-5 Array methods if not supported natively
//
if (!('indexOf' in Array.prototype)) {
    Array.prototype.indexOf = function (find, i /*opt*/) {
        if (i === undefined) i = 0;
        if (i < 0) i += this.length;
        if (i < 0) i = 0;
        for (var n = this.length; i < n; i++)
            if (i in this && this[i] === find)
                return i;
        return -1;
    };
}
if (!('lastIndexOf' in Array.prototype)) {
    Array.prototype.lastIndexOf = function (find, i /*opt*/) {
        if (i === undefined) i = this.length - 1;
        if (i < 0) i += this.length;
        if (i > this.length - 1) i = this.length - 1;
        for (i++; i-- > 0;) /* i++ because from-argument is sadly inclusive */
            if (i in this && this[i] === find)
                return i;
        return -1;
    };
}
if (!('forEach' in Array.prototype)) {
    Array.prototype.forEach = function (action, that /*opt*/) {
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this)
                action.call(that, this[i], i, this);
    };
}
if (!('map' in Array.prototype)) {
    Array.prototype.map = function (mapper, that /*opt*/) {
        var other = new Array(this.length);
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this)
                other[i] = mapper.call(that, this[i], i, this);
        return other;
    };
}
if (!('filter' in Array.prototype)) {
    Array.prototype.filter = function (filter, that /*opt*/) {
        var other = [], v;
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this && filter.call(that, v = this[i], i, this))
                other.push(v);
        return other;
    };
}
if (!('every' in Array.prototype)) {
    Array.prototype.every = function (tester, that /*opt*/) {
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this && !tester.call(that, this[i], i, this))
                return false;
        return true;
    };
}
if (!('some' in Array.prototype)) {
    Array.prototype.some = function (tester, that /*opt*/) {
        for (var i = 0, n = this.length; i < n; i++)
            if (i in this && tester.call(that, this[i], i, this))
                return true;
        return false;
    };
}
if (!Array.prototype.findby) {
    Array.prototype.findby = function (prop, value) {
        if (prop == null)
            return this.find(function (f) { return f == value; });
        else
            return this.find(function (f) { return f[prop] == value; });
    }
}
if (!Array.prototype.filterby) {
    Array.prototype.filterby = function (prop, value) {
        if (prop == null)
            return this.filter(function (f) { return f == value; });
        else
            return this.filter(function (f) { return f[prop] == value; });
    }
}
if (!Array.prototype.sortby) {
    Array.prototype.sortby = function (prop, sortfnc) {
        if (sortfnc == null)
            sortfnc = function (f, g) { return f > g; };
        var propfnc = prop;
        var propfnc = (isFunction(prop) ? prop : function(f) { return f[prop]; });

        var retdata = this.map(function (f) { return f; });
        for (var i = 0; i < retdata.length - 1; i++)
            for (var j = i + 1; j < retdata.length; j++)
                if (sortfnc(propfnc(retdata[i]), propfnc(retdata[j]))) {
                    var temp = retdata[i];
                    retdata[i] = retdata[j];
                    retdata[j] = temp;
                };
        return retdata;
    }
}
if (!Array.prototype.remove) {
    Array.prototype.remove = function (dat) {
        var ind = this.indexOf(dat);
        this.splice(ind, 1);
        return this;
    }
}
if (!Array.prototype.last) {
    Array.prototype.last = function (prop) {
        return this[this.length - 1];
    }
}
if (!Array.prototype.distinct) {
    Array.prototype.distinct = function () {
        return this.filter(function (value, index, self) { return self.indexOf(value) === index; });
    };
}
if (!Array.prototype.mapmany)
    Array.prototype.mapmany = function (mapper) {
        return this.reduce(function (prev, curr, i) {
            return prev.concat(mapper(curr));
        }, []);
    };
if (!Array.prototype.max)
    Array.prototype.max = function (property) {
        var mapped = (property == null) ? this.map(function(f) { return f; }) : this.map(function(f) { return f[property]; });
        return mapped.sort().last();
    };
if (!Array.prototype.first)
    Array.prototype.first = function () {
        return this[0];
    };
if (!Array.prototype.firstOrDefault)
    Array.prototype.firstOrDefault = function () {
        return this.length == 0 ? null : this.first();
    };
if (!Array.prototype.last)
    Array.prototype.last = function () {
        return this[this.length - 1];
    };
if (!Array.prototype.lastOrDefault)
    Array.prototype.lastOrDefault = function () {
        return this.length == 0 ? null : this.last();
    };
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (f) {
        if (this == null || this.length === 0 || this.length < f.length)
            return false;

        for (var i = 0; i < f.length; i++)
            if (this.charAt(i) !== f.charAt(i))
                return false;

        return true;
    }
}
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (f) {
        if (this == null || this.length === 0 || this.length < f.length)
            return false;

        for (var i = f.length - 1; i >= 0; i--)
            if (this.charAt(i) !== f.charAt(i))
                return false;

        return true;
    }
}
if (!Array.prototype.groupBy)
Array.prototype.groupBy = function (propFnc) {
return this .reduce( function (groups, item) {
var val = propFnc(item);
groups[val] = groups[val] || [];
groups[val].push(item);
return groups;
}, []);
};
if (!Array.prototype.unique)
Array.prototype.unique = function (propFnc) {
return this .groupBy(propFnc)
.filter( function (f) { return f != null })
.map( function (f) { return f.first(); });
};
if (!String.prototype.trim) {
    String.prototype.trim = function () { return $.trim(this); }
}
String.prototype.replaceAll = String.prototype.replaceAll ||
    function (fromString, toString) {
        return this.replace(new RegExp(escapeRegExp(fromString), 'g'), toString);
    };
String.prototype.replaceWords = String.prototype.replaceWords ||
    function (fromString, toString) {
        return this.replace(new RegExp('\\b' + escapeRegExp(fromString) + '\\b', 'g'), toString);
    };
function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
String.prototype.toggle = String.prototype.toggle ||
    function (word, bln) {
        var reg = new RegExp('\\b' + escapeRegExp(word) + '\\b', 'g');
        if (bln == null)
            bln = !(reg.test(this));
 
        if (bln)
            return reg.test(this) ? this : this.trim() + ' ' + word;
        else
            return this.replaceWords(word, '').split(' ').filter(function (f) { return !IsStringNullOrEmpty(f); }).join(' ');
    };
String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
    function() {
        "use strict";
        var str = this.toString();
        if (arguments.length) {
            var t = typeof arguments[0];
            var key;
            var args = ("string" === t || "number" === t) ?
                Array.prototype.slice.call(arguments)
                : arguments[0];

            for (key in args) {
                str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
            }
        }

        return str;
    };
if (!HashCode)
    function HashCode(obj) {
        var str = (typeof obj === 'object') ? JSON.stringify(obj) : obj;
        var hash = 0;
        if (str.length == 0) return hash;
        for (var i = 0; i < str.length; i++) {
            char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
Number.prototype.RangeTo = function (intTo) {
    var intFrom = parseInt(this);
    var step = intFrom <= intTo ? 1 : -1;
    var ret = [];
    do {
        ret.push(intFrom);
        if (intFrom == intTo)
            break;
        intFrom += step;
    } while (true);
    return ret;
}
equilibrium = this['equilibrium'] == null ? new Object() : this['equilibrium'];
equilibrium.DataSubject = function () {
    var observers = [];

    this.AddObserver = function (observer) {
        observers.push(observer);
        observer.Parent = this;
        observer.Subject = this;
    }
    this.RemoveObserver = function (observer) {
        var index = observers.indexOf(observer);
        observers.splice(index, 1);
    }
    this.GetAllObservers = function () { return observers; }
    this.Notify = function () {
        var subject = this;
        observers.forEach(function (f) { f.Update(subject); });
    };
	this.Bind = function(element) {
		equilibrium.Bind(this, $(element));
		return this;
	};
}
equilibrium.SimpleObserver = function(fn) {
    var fn = fn;
    this.Update = function (data) {
        fn();
    }
}

equilibrium.Node = function () {
    var self = this;
    this.children = [];
    this.AddChild = function (child) {
        child.GetParent = function () { return self; };
        this.children.push(child);
    }
    this.GetNodeLevel = function () {
        return this.GetParent == null ? 0 : this.GetParent().GetNodeLevel() + 1;
    }
    this.GetTopParent = function () {
        if (self.GetParent == null)
            return self;
        return self.GetParent().GetTopParent();
    }
    this.RemoveParent = function () {
        self.GetParent = null;
        return self;
    }
}
equilibrium.Node.ToArray = function (node) {
    if (arr == null)
        var arr = [];
    arr.push(node);
    if (node.children != null)
        node.children.forEach(function (f) { return equilibrium.Node.ToArray(f).forEach(function (g) { arr.push(g); }); });
    return arr;
}
equilibrium.Node.FromArray = function (arr, findParentFnc) {
    arr.forEach(function (f) { f.children = []; });
    arr = DeepCloneArray(arr).map(function (f) { return equilibrium.CopyAllProperties(f, new equilibrium.Node()); });
    arr.forEach(function (f) {
        var parent = findParentFnc(f, arr);
        if (parent != null)
            parent.AddChild(f);
    });
    return arr.filter(function (f) { return f.GetParent == null; });
}
equilibrium.Node.map = function (node) {
    return function(fnc) {
        var ret = equilibrium.CopyAllProperties(fnc(node), new equilibrium.Node());
        ret.children = [];
        if (node.children)
            node.children.forEach(function (g) {
                ret.AddChild(equilibrium.Node.map(g)(fnc));
            });
        return ret;
    }
}
equilibrium.Node.filter = function (node) {
    return function(fnc) {
        if (!fnc(node)) return null;
        var ret = equilibrium.CopyAllProperties(DeepClone(node), new equilibrium.Node());
        ret.children = [];
        if (node.children)
            node.children.forEach(function (g) {
                var ch = equilibrium.Node.filter(g)(fnc);
                if (ch) ret.AddChild(ch);
            });
        return ret;
    }
}
equilibrium.Node.filterAny = function(node) {
    return function(fnc) {
        var ret = equilibrium.CopyAllProperties(DeepClone(node), new equilibrium.Node());
        ret.children = [];
        if (node.children)
            node.children.forEach(function(g) {
                var ch = equilibrium.Node.filterAny(g)(fnc);
                if (ch) ret.AddChild(ch);
            });
        if (IsNotNullAndHasAny(ret.children) || fnc(node)) return ret;
    }
}
equilibrium.Node.sortby = function(node) {
    return function(prop, sortFnc) {
        var ret = equilibrium.CopyAllProperties(DeepClone(node), new equilibrium.Node());
        ret.children = [];
        if (node.children)
            node.children.sortby(prop).forEach(function (g) {
                var clonedNode = equilibrium.Node.sortby(g)(prop, sortFnc);
                ret.AddChild(clonedNode);
            });
        return ret;
    }
}
equilibrium.Node.find = function (node) {
    return function(fnc) {
        if (fnc(node)) return node;
        if (node.children)
            for (var i = 0; i < node.children.length; i++) {
                var find = equilibrium.Node.find(node.children[i])(fnc);
                if (find != null)
                    return find;
            }
    }
}
equilibrium.Node.forEach = function(node) {
    return function(fnc) {
        fnc(node);
        if (node.children)
            node.children.forEach(function (g) { equilibrium.Node.forEach(g)(fnc); });
        return this;
    }
}
equilibrium.Node.prototype.map = function (fnc) { return equilibrium.Node.map(this)(fnc); };
equilibrium.Node.prototype.filter = function (fnc) { return equilibrium.Node.filter(this)(fnc); };
equilibrium.Node.prototype.filterAny = function (fnc) { return equilibrium.Node.filterAny(this)(fnc); };
equilibrium.Node.prototype.sortby = function (prop, sortFnc) { return equilibrium.Node.sortby(this)(prop, sortFnc); };
equilibrium.Node.prototype.find = function (fnc) { return equilibrium.Node.find(this)(fnc);};
equilibrium.Node.prototype.forEach = function (fnc) { return equilibrium.Node.forEach(this)(fnc); };
equilibrium.Node.prototype.ToArray = function () { return equilibrium.Node.ToArray(this); };

equilibrium.Tree = function (treeDiv, drawingFnc) {
    var self = this;
    var _data = null;

    this.DrawingFnc = drawingFnc ? drawingFnc : function (f) { return f.text; };
    this.GetData = function () {
        return _data;
    }
    this.Redraw = function (dat) {
        _data = dat;
        var isOpened = function (nod) { return IsNotNullAndHasAny(nod.children) && getState(nod.id).opened; };
        var getClass = function (nod) { return IsNotNullAndHasAny(nod.children) ? (isOpened(nod) ? 'jstree-open' : 'jstree-closed') : 'jstree-leaf' }
        var ulFnc = function () {
            var ulTemp = document.createElement('ul');
            ulTemp.className = 'jstree-children';
            return function () { return ulTemp.cloneNode(true) }
        }();
        var liFnc = function () {
            var liTemp = document.createElement('ul');
            liTemp.className = 'jstree-node';
            var iTemp = document.createElement('i');
            iTemp.className = 'jstree-icon jstree-ocl';
            return function (nod) {
                var liEl = liTemp.cloneNode(true);
                liEl.id = nod.id;
                liEl.classList.add(getClass(nod));
                var iEl = iTemp.cloneNode(true);
                iEl.onclick = function () { self.OnNodeOpenClick(nod); };
                liEl.append(iEl);

                ForEachObjOrArr(self.DrawingFnc(nod), function (f) { liEl.append(f); });

                if (isOpened(nod)) {
                    var childHtml = nod.children.map(liFnc);
                    childHtml.last().classList.add('jstree-last');
                    childHtml.forEach(function (f) { liEl.append(f); });
                }
                return liEl;
            }
        }();
        var mappingFnc = function (f) {
            var ulEl = ulFnc();
            ulEl.append(liFnc(f));
            return { html: ulEl };
        };
        var mapped = mappingFnc(dat).html;
        mapped.className = 'jstree-container-ul';
        mapped.firstElementChild.className += ' jstree-last';
        equilibrium.ToArray(treeDiv.children).forEach(function (f) { f.parentNode.removeChild(f); })
        treeDiv.append(mapped);
    };

    this.ClearAllStates = function () {
        drawedData = new Object();
        return self;
    };
    this.IsNodeOpened = function (node) {
        return getState(node.id).opened;
    };
    this.OpenNode = function (node) {
        if (IsNotNullAndHasAny(node.children))
            getState(node.id).opened = true;
        if (node.GetParent != null)
            this.OpenNode(node.GetParent());
        return self;
    };
    this.CloseNode = function (node) {
        getState(node.id).opened = false;
        return self;
    };
    this.GetContainer = function () { return treeDiv };

    this.OnNodeOpenClick = function(nod) {
        if (IsNotNullAndHasAny(nod.children)) {
            getState(nod.id).opened = !getState(nod.id).opened;
            self.Redraw(_data);
        }
    };

    var drawedData = new Object();
    var getState = function (id) {
        if (drawedData[id] == null)
            drawedData[id] = { opened: false };
        return drawedData[id];
    };
}

equilibrium.TreeObserver = function (tree, prop) {
    var self = this;
    var _tree = tree;
    this.FilterFunctions = [];
    var _data = null;

    this.Update = function (data) {
        _data = data;
        _tree.Redraw(self.GetFilteredData());
    }
    this.GetAllData = function () { return _data ? _data[prop] : null; }
    this.GetFilteredData = function () {
        var filtered = _data[prop];
        self.FilterFunctions.forEach(function (fnc) { filtered = fnc(filtered); });
        return filtered;
    }
    this.AddFilter = function (filter) { self.FilterFunctions.push(filter); }
    this.GetTree = function () { return _tree; }
}

equilibrium.CopyValuesFromObject = function (fromObject, toObject) {
    for (var k in toObject) {
        if (fromObject[k] != null)
            toObject[k] = fromObject[k];
    }
    return toObject;
}
equilibrium.CopyAllProperties = function (fromObject, toObject) {
    if (toObject == null)
        toObject = new Object();
    for (var k in fromObject) toObject[k] = fromObject[k];
    return toObject;
}
equilibrium.CopyJustProperties = function (fromObject, toObject) {
    if (toObject == null)
        toObject = new Object();
    for (var k in fromObject)
        if (typeof fromObject[k] !== "function")
            toObject[k] = fromObject[k];
    return toObject;
}
equilibrium.DeleteJustProperties = function (fromObject) {
    for (var k in fromObject)
        if (typeof fromObject[k] !== "function")
            delete fromObject[k];
    return fromObject;
}
equilibrium.CopyJustFunctions = function (fromObject, toObject) {
    if (toObject == null)
        toObject = new Object();
    for (var k in fromObject)
        if (typeof fromObject[k] === "function")
            toObject[k] = fromObject[k];
    return toObject;
}
equilibrium.PropertiesToArray = function (fromObject) {
    var arr = [];
    for (var k in fromObject) arr.push(fromObject[k]);
    return arr;
}
equilibrium.ToArray = function (fromObject) {
    return fromObject.length == 0 ? [] : (0).RangeTo(fromObject.length - 1).map(function (f) { return fromObject[f]; });
};


function EmptyFunction() { }

function ForEachObjOrArr(obj, fn) {
    if (Array.isArray(obj))
        obj.forEach(fn);
    else fn(obj);
}