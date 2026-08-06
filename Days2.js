//callback function://
// function hello(n1,n2,callback){
//     console.log(n1+n2);
//     console.log("Hello World");
//     callback();
// }
// let a=10;
// let b=20;
// console.log(hello(a,b,sayHi));
// console.log(hello(a,b,sayHello()));
// console.log(hello(a,b,function Demo(){
// console.log("callback is calling")
// }));
// function sayHi(){
//     console.log("callback function");
// }

// saysHi();
// function sayHello(){
// console.log(" callback function");
// }

//promises//
// const promisesOne=new Promise((resolve,reject)=>{
// console.log("successfull data passed....");
// resolve("resolve promises");
// })
// promisesOne.then(()=>{
//     console.log(result);
// }). catch((error)=>{
//     console.log("error");

// })

new Promise(function(resolve,reject){
setTimeout(function(){
    let msg=true;
    if(!msg){
        resolve("user : ASYnch task")
    }
    else{
        reject("ERROR : UNDEFINED data...")
    }
    console.log("asynchronous task...");
    resolve();

},1000)
}).then(function(result){
    console.log("asynch task 2");
}).catch(function(error){
    console.log(error);
})