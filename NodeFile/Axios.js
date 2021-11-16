const axios = require ('axios')


function getAge(){
    let name= 'Ayush';

    if(name==='Ayush'){
    axios.get(`https://api.agify.io/?name=${name}`)
    //Returns data responded by api
    .then((response)=>{
        console.log(response.data.age)
    })
    //when api fails or respone not available
    .catch((error)=>{
        console.log(error.data)
    })
    //Always runs irrespective of error or response
    .then(()=>{
        console.log("Responded")
    })
}
else 
{
    console.log("Not Available")
}
}

getAge();