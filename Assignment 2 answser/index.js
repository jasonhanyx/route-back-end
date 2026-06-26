//! 1. Write a function that logs the current file path and directory.
// Output Example:{File:“/home/user/project/index.js”, Dir:“/home/user/project”}
const filePath = () => {
    console.log('file:', __filename)
    console.log('dir:', __dirname)
}
filePath()

//! 2. Write a function that takes a file path and returns its file name.
// Input Example: /user/files/report.pdf
// Output Example:"report.pdf"
import path from 'path'
const x = 'user/files/report.pdf';
const fileName = (x) => {
    console.log(path.basename(x))
}
fileName(x)

//! 3. Write a function that builds a path from an object
// Input Example: { dir: "/folder", name: "app", ext: ".js"}
// Output Example: “/folder/app.js”
import path from "path"
const obj = {
    dir: "/folder",
    name: "app", 
    ext: ".js" 
}
const nameJoin = () => {
    return path.join(obj.dir,obj.name,obj.ext)
}
console.log(nameJoin());

//! 4. Write a function that returns the file extension from a given file path. 
// Input Example: /docs/readme.md"
// Output Example: “.md”
import path from "path"
const filePath = '/docs/readme.md'
const fileExt = () => {
    return path.extname(filePath)
}
console.log(fileExt())

//! 5. Write a function that parses a given path and returns its name and ext. 
// Input Example: /home/app/main.js 
// Output Example: { Name: “main”, Ext: “.js” } 
import path from "path"

const filePath = '/home/app/main.js'
const fileParse = () => {
    return path.parse(filePath)
}
console.log(fileParse(filePath))
//or
const fileParse = (filePath) => {
    return console.log({Name: path.basename(filePath), Ext: path.extname(filePath)})
}
fileParse(filePath)

//! 6. Write a function that checks whether a given path is absolute. 
// Input Example: /home/user/file.txt 
// Output Example: true
/* import path from "path"
filePath = "/home/user/file.txt"

const abscheck = (filePath) => {
    return path.isAbsolute(filePath)
}
console.log(abscheck(filePath)) */

//! 7. Write a function that joins multiple segments
// Input:"src","components", "App.js"
// Output Example: src/components/App.js
import path from "path"
var segments
const joinSegments = (...segments) => {
    return path.join(...segments)
}
console.log(joinSegments("src","components","App.js"))

//! 8. Write a function that resolves a relative path to an absolute one. 
// Input Example: ./index.js 
// Output Example: /home/user/project/src/index.js 
import path from "path"
const aPath = "./Ans2.js"

const resolver = (relPath) => {
    return path.resolve(relPath)
}
console.log(resolver(aPath))
console.log(resolver("./Ans2.js"))

//! 9. Write a function that joins two paths. 
// Input Example: /folder1, folder2/file.txt 
// Output Example: /folder1/folder2/file.txt 
import path from "path"

const joinPath = (x,y) => {
    return path.join(x,y)
}
console.log(joinPath("/folder1","folder2/file.txt"))


//! 10. Write a function that deletes a file asynchronously. 
// Input Example: /path/to/file.txt 
// Output Example: The file.txt is deleted. 
const fs = require('fs')
import path from "path"

const fileDeleter = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error("Error:", err.message)
            return
        }
        const fileName = path.basename(filePath);
        console.log(`The ${fileName} is deleted`);

    });
}
fileDeleter('./file.txt')

//! 11. Write a function that creates a folder synchronously. (1 Grade)
// Output Example: “Success
const fs = require('fs')
const folderCreater = (folderPath) => {
    try {
        fs.mkdirSync(folderPath)
        console.log("success")
    } catch (err) {
        console.log("Error", err.message)
    }
}
folderCreater("./newfolder")

//! 12. Create an event emitter that listens for a "start" event and logs a welcome message.
// Output Example: Welcome event triggered!
const EventEmitter = require('events')
const emitter = new EventEmitter()

emitter.on('start', () =>{
    console.log('Welcome event triggered!')
})

emitter.emit('start')

//! 13. Emit a custom "login" event with a username parameter.
// Input Example:"Ahmed"
// Output Example: “User logged in: Ahmed”

const EventEmitter = require('events')
emitter = new EventEmitter
emitter.on('login', (username) => {
    console.log(`User logged in: ${username}`)
})
emitter.emit('login', 'ahmed')

//! 14. Read a file synchronously and log its contents. (1 Grade)
// Input Example:"./notes.txt"
// Output Example: the file content => “This is a note.”
const fs = require('fs')
const filePath = "./text.txt";
const data = fs.readFileSync(filePath, 'utf-8')
console.log(`the file contect => ${data}`)

//! 15. Write asynchronously to a file. (1 Grade)
// Input: path:"./async.txt", content:"Async save"
const fs = require('fs')
const filePath = "./text.txt";
fs.writeFile(filePath, "Async Save", (err) => {
    //if error
    if (err) {
        console.error("Error writing file:", err);
        return;
    }
})

//! 16. Check if a directory exists.
// Input Example: "./notes.txt"
// Output Example: true

const fs = require('fs')
const dirPath = "./text.txt"

const exists = fs.existsSync(dirPath)
console.log(exists)


//! 17. Write a function that returns the OS platform and CPU architecture.
// Output Example: {Platform: “win32”, Arch: “x64”}
import os from "os"
function getSystemInfo() {
    return {
        Platform: os.platform(),
        Arch: os.arch()
    };
}
console.log(getSystemInfo());
//  بس احنا لسة مخدنهاش 

//! C. Bonus (3 Grades):
// 1- Solve the problem link(kth-missing-positive-number) on LeetCode
//! https://leetcode.com/problems/kth-missing-positive-number/description/
// 2- Inside your assignment folder, create a SEPARATE FILE and name it “bonus.js”
// 3- Copy the code that you have submitted on the website inside ”bonus.js” file

