class A {
    constructor(num1,num2)
    {
        this.num1=num1
        this.num2=num2
        
    }

    add()
    {
        console.log(this.num1+this.num2)
    }
}


let A1= new A(1,2)


A1.add()