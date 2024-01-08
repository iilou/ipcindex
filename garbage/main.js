const spawn = require('child_process').spawn;

document.querySelector("button").addEventListener("click", () => {
    const childPython = spawn('python', ['test.py', "600505603"]); 

    childPython.stdout.on('data', (data) => {
        // document.querySelector(".result").innerHTML = data.toString();
        // console.log(`stdout: ${data}`);
    });

    childPython.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    childPython.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
});

// const childPython = spawn('python', ['test.py', "600505603"]); 

//     childPython.stdout.on('data', (data) => {
//         // document.querySelector(".result").innerHTML = data.toString();
//         // console.log(`stdout: ${data}`);
//     });

//     childPython.stderr.on('data', (data) => {
//         console.log(`stderr: ${data}`);
//     });

//     childPython.on('close', (code) => {
//         console.log(`child process exited with code ${code}`);
//     });

// module.exports = function (n) { return n * 111 }

// run();