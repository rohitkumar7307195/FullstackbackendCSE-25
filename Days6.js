//file module:fs //
// const fs=require('fs');
// fs.writeFile("myfile.txt","Hello world",(err)=>{
//     if(err) throw err;
//     console.log("file created successfully");
// });


//read file
const fs=require('fs');
fs.readFile("myfile.txt","utf-8",(err,data)=>{
    if(err) throw err;
    console.log( data);
});