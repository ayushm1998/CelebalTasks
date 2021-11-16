
function sum(a,b)
{return a+b;
}
function subtract (a,b)
{return a-b;
}
function multiply(a,b)
{return a*b;
}
function divide (a,b)
{return a/b;
}
function calculate(num1, num2, callback)
{
 
 return callback(num1,num2);
    
}

console.log(calculate(2,3,multiply));




