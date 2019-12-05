console.clear();
const request = require("request");
const fs = require("fs");
const readline = require("readline");

let query = {};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// let check = function () {
//     rl.question("Enter file path again", (answer) => {
//         fs.exists(`./${answer}`, exists => {
//             if(exists){
//                 console.log('File exists...please specify new name');
//                 return
//             }else{
//                 console.log('Good work');
//             }
//         })
//     });
// }
const check = function(userInputPath){
    fs.access(`${userInputPath}`, err => {
        if (err) {
            console.log("GOOD JOB!!"); //rl.close();
            myCallback();
            return 'something'
        }
        console.log("File Exists...Enter again");
        askQuestion();
        
      });
}
const askQuestion = function(){
    rl.question("Enter file path with extension ", (answer) =>{
        check(answer); 
    })
}
askQuestion();
const myCallback = function() {
  rl.question("Enter domain name ", answer => {
    query["Domain"] = answer;
    rl.question(
      "Name the file again for data to be stored with extension ",
      answer => {
        query["Path"] = answer;
        console.log(
          `Thanks, the data will be downloaded soon from ${query["Domain"]} into ${query["Path"]}.`
        );
        rl.close();
        request(`https://www.${query["Domain"]}`, (error, response, body) => {
          console.log("error:", error); // Print the error if one occurred
          console.log("statusCode:", response && response.statusCode);
          fs.writeFile(`${query["Path"]}`, body, err => {
            if (err) throw err;
            fs.stat(query["Path"], (err, stat) => {
                console.log(`Size of the downloaded file is ${stat}B.`)
            })
          });
        });
      }
    );
  });
};