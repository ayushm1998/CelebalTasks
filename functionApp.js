'use strict';
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
 
const result = excelToJson({
    sourceFile: './Excel-2022-02-01.xlsx',
    columnToKey: {
        A: 'Name',
        B: 'Phone'
    },
    header:{
        
        rows: 1
}});

fs.writeFile ("input.json", JSON.stringify(result), function(err) {
    if (err) throw err;
    console.log('complete');
    }
);
