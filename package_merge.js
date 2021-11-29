var merge = require('package-merge');
const fs = require('fs');
var dst = fs.readFileSync('package.a.json');
var src = fs.readFileSync('package.b.json');
 
// Create a new `package.json`
console.log(merge(dst, src));