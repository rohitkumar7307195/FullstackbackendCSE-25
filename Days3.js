// async function test(){
// await console.log("2:message");
// await console.log("3:message");
// console.log("4:message");
// }
// console.log("1: message");
// test()
// console.log("5 :message");

// const promisesOne=new Promise((resolve,reject)=>{
// console.log("assignment submitted successfully....");
// resolve("resolve promises");
// })
// promisesOne.then(()=>{
//     console.log(result);
// }). catch((failed)=>{
//     console.log("submission is failed");

// })

// const assignmentpromises=new Promise(function(resolve,reject){
//     let submitted=false;
//     if(submitted){
//         resolve("Assignment submitted successfully")
//     }
//     else{
//         reject("Assignment not submitted successfully")
//     }
// });
// assignmentpromises.then(function(result){
//     console.log(result);
// })
// .catch(function(error){
//     console.log(error)
// });

//async function that display user data//

async function userData() {

    console.log("Name: Rohit Kumar");

    const response = await fetch("./student.json");

    console.log(response.status);

    const students = await response.json();

    console.log("Email: email123@gmail.com");
    console.log("Password: 12345678");

    return students;
}

userData()
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

    //Event //
    //event loop//
    //understand//
    