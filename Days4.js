//Event //
//Event loop:sequence of executing functions//
// const f1=()=>{
//     console.log(f1);

// };
// const f2=()=>{
// console.log(f2);
// };
// function main(){
//     console.log("main function");
//     setTimeout(f1,1000)
//     setTimeout(f3,2000);
//     new Promise((resolve, reject) => {
//         resolve("i am promise");

//     }).then((result)=>{
//         console.log(result);
//     })
// }
// f3();
// main();

const f1 = () => {
    console.log("f1");
};

const f2 = () => {
    console.log("f2");
};

const f3 = () => {
    console.log("f3");
};

function main() {
    console.log("main function");

    setTimeout(f1, 1000);

    setTimeout(f3, 2000);

    new Promise((resolve, reject) => {
        resolve("I am promise");
    }).then((result) => {
        console.log(result);
    });
}

f2();
main();