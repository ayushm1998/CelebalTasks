var fs = require('fs');

fs.appendFile('mynewfile1.txt', 'THIS IS NODE TUTORIALL', function (err) {
  if (err) throw err;
  console.log('Saved!');
}); 