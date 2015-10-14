# Path-explorer
Library (for NodeJS) used to get and set values in a Javascript object using path.

## Features
- Get value from any path
- Set and override value for any path

## Installation
To install the library, just use [npm](https://fr.wikipedia.org/wiki/Npm_%28logiciel%29):
`
npm install path-explorer
`

## Usage
The library will send back an object with two methods (get & set):
```javascript
var pathExplorer = require('path-explorer');
var value = pathExplorer.get(object, 'w.x.array[1][2][3].z');
var value = pathExplorer.set(
  {
    target: object,
    path: 'a.b.c[1][2][3].d',
    value: 'Example',
  }, function onSet(err, result) {
    // Result is your modified target but target will be modified as well
  });
```

### Get
Synchronised. Relatively straightforward, it will send any value found following the path. If the path lead to a null or undefined object in the middle or at the end of the path, it will send back null (or undefined).

For getting values in array, you can use the standard array accessing notation of JS in the path (array[index1][index2][index3]). The dimensions are not limited. An index should always be present otherwise an error will be thrown.

### Set
Asynchronized. Using the same path notation as for the getter, you can set a value in the object. Any object not existing in the path will be created, as well as arrays. Again, multi-dimension arrays are supported.

Concerning the array, if an array is specified with an empty index (`[]`) the setter will create a new element at the end of the array. If the index is larger than the array length, the element will still be created at the right index in the array, creating empty elements if necessary.
