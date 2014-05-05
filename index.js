exports.isEmpty       = isEmpty;
exports.isNotEmpty    = isNotEmpty;
exports.isPlainObject = isPlainObject;
exports.trim          = trim;
exports.filter        = filter;
exports.merge         = merge;
exports.mergeArray    = mergeArray;
exports.clone         = clone;
exports.cloneArray    = cloneArray;
exports.humanSize     = humanSize;



function trim (v) {
  
  if ( typeof v == 'string') {
      return v.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  } else {
      return v;
  }

}

function isPlainObject (v) {
  return  typeof v === 'object' && toString.call(v) === '[object Object]';
}

function isEmpty (v) {

  if (v === undefined || v === null || v === '') {
    return true;
  }

  if (Array.isArray(v)) {
    return v.length === 0;  
  }

  if (isPlainObject(v)) {
    return Object.keys(v).length === 0 ;
  }

  return false;
}


function isNotEmpty(v) {
  return ! isEmpty(v);
}

/**
 * merge keys of the default object info the target object
 * ...
 * @author bibig@me.com
 * @update [2014-05-05 11:50:11]
 * @param  {object} targetObj
 * @param  {object} defaultObj
 * @return {object}
 *
 * @usage:  
 *    a = merge(a, b);
 *    do not use like this: 
 *    merge(a, b) // unless you sure a is an object.
 *    when a is null or undefined, a should not be given values. merge will return a new object.
 * 
 */
function merge (targetObj, defaultObj) {

  if (! targetObj) { targetObj = {};}

  if (! defaultObj || typeof defaultObj !== 'object') { return targetObj; }

  if (typeof targetObj !== 'object') { targetObj = {}; }
  
  Object.keys(defaultObj).forEach(function (key) {

    if (targetObj[key] === undefined) {
      targetObj[key] = defaultObj[key];
    }

  });

  return targetObj;            
}

/**
 * filter target object by given keys
 * the difference between `filter` and `clone` is that filter copyed by referecne, but clone duplicated
 * @author bibig@me.com
 * @update [2014-05-05 11:52:26]
 * @param  {object} target
 * @param  {array or string} keys
 * @return {object}
 * @usage:
 *   filter(target, ['k1', 'k2']);
 *   filter(target, 'k1, k2');
 */
function filter (target, keys) {
  var safe = {};
  
  if (typeof keys === 'string') {
    keys = keys.split(',');
  }

  if ( ! keys || ! Array.isArray(keys) ) {
    return safe;
  }

  keys.forEach(function (key) {
    key = trim(key);

    if (target[key] !== undefined && target[key] !== null && target[key] !== '') {
      safe[key] = target[key];
    }

  });
  
  return safe;
}

function cloneArray (target) {
  var copycat = [];

  target.forEach(function (ele) {

    if (Array.isArray(ele)) {
      copycat.push(cloneArray(ele));
    } else if (typeof ele == 'object') {
      copycat.push(clone(ele));
    } else {
      copycat.push(ele);
    }

  });

  return copycat;
}

/**
 * clone target object.
 * ...
 * @author bibig@me.com
 * @update [2014-05-05 11:50:05]
 * @param  {object} target
 * @param  {array or string} keys
 * @return {object}
 * @usage: 
 *  clone(target, ['k1', 'k2']);
 *  clone(target, 'k1, k2');
 */
function clone (target, keys) {
  var copycat;
  
  if (target === null || target === undefined || target === '') {
    return target;
  }

  if (Array.isArray(target)) {
    return cloneArray(target);
  } 
    
  if (typeof target === 'object') {
    copycat = {};

    if ( typeof keys === 'string') {
      keys = keys.split(',');
    }

    if ( ! keys && ! Array.isArray(keys) ) {
      keys = Object.keys(target);  
    }

    if ( keys.length > 0 ) {
      keys.forEach(function (key) {
        key = trim(key);
        copycat[key] = clone(target[key]);
      });
    }

    return copycat;
  }

  return target;
}

function mergeArray (a, b) {
  var c = [].concat(a);
  
  b.forEach(function (key) {
    
    if (c.indexOf(key) == -1) {
      c.push(key);
    }

  });
  
  return c;
}

function humanSize (size) {
  
  if (size < 1048576) { // 1m
    return parseInt(size * 10 / 1024) / 10  + 'k';
  } else {
    return parseInt(size * 10 / 1048576 ) / 10  + 'm';
  }

}

