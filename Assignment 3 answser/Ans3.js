//! Part1: Core Modules

//! 1. Use a readable stream to read a file in chunks and log each chunk.
// Input Example: "./big.txt"
// Output Example: log each chunk
/* import fs from 'fs'
const stream = fs.createReadStream("./text.txt", "utf-8")
stream.on("data", (chunk) => {
    console.log(chunk)
})

stream.on("error", (err) => {
    console.error(err)
})
 */
//! 2. Use readable and writable streams to copy content from one file to another.
// Input Example: "./source.txt", "./dest.txt"
// Output Example: File copied using streams

/* import fs from "fs"
const readStream = fs.createReadStream("./source.txt")
const writeStream = fs.createWriteStream("./dest.txt")
readStream.pipe(writeStream)

readStream.on("error", (err) => {
    console.error(err)
})
writeStream.on("error", (err) => {
    console.error(err)
})
writeStream.on("finish", () => {
    console.log("File copied using streams")
}) */

//! 3. Create a pipeline that reads a file, compresses it, and writes it to another file.
// Input Example: "./data.txt", "./data.txt.gz"

/* import fs from "fs";
import zlib from "zlib";
import { pipeline } from "stream";
const readStream = fs.createReadStream("./data.txt");
const gzip = zlib.createGzip();
const writeStream = fs.createWriteStream("./data.txt.gz");

pipeline(readStream, gzip, writeStream, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("File compressed successfully");
}); */

// -----------------------------Part 2----------------------------- //

//! Part2: Simple CRUD Operations Using HTTP ( 5.5 Grades):
/* For allthe following APIs, you must use the fs module to read and write data from a JSON file (e.g., users.json). 
Do not store or manage data using arrays (0.5 Grades). */
import http from 'http';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.resolve('users.json');
const PORT = 3000;

const readDataFile = () => {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (error) {
    return [];
  }
};

const writeDataFile = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

const parseRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(new Error('Invalid JSON format'));
      }
    });
  });
};

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  res.setHeader('Content-Type', 'application/json');

  //! 1. Create an API that adds a new user to your users stored in a JSON file. (ensure that the email of the new user doesn’t exist before) (1 Grade)
  // URL: POST /user 
  if (method === 'POST' && url === '/user') {
    try {
      const { name, age, email } = await parseRequestBody(req);
      const users = readDataFile(); // Dynamic sync fetch from file

      const emailExists = users.some((user) => user.email === email);
      if (emailExists) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ message: 'Email already exists.' }));
      }

      const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name,
        age,
        email,
      };

      users.push(newUser);
      writeDataFile(users); // Persisting updates straight back into files

      res.statusCode = 201;
      return res.end(JSON.stringify({ message: 'User added successfully.' }));
    } catch (err) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ message: err.message }));
    }
  }

  // Routing parsing for specific target ID mutations: /user/:id
  if (url.startsWith('/user/')) {
    const idParam = url.split('/')[2];
    const userId = parseInt(idParam, 10);

    if (isNaN(userId)) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ message: 'Invalid User ID format' }));
    }

    //! 2. Create an API that updates an existing user's name, age, or email by their ID. The user ID should be retrieved from the URL (1 Grade)
    // Note: Remember to update the corresponding values in the JSON file
    // URL: PATCH /user/id
    if (method === 'PATCH') {
      try {
        const body = await parseRequestBody(req);
        const users = readDataFile();
        const userIndex = users.findIndex((u) => u.id === userId);

        if (userIndex === -1) {
          res.statusCode = 404;
          return res.end(JSON.stringify({ message: 'User ID not found.' }));
        }

        // Apply fields dynamically as passed in input payload
        if (body.name !== undefined) users[userIndex].name = body.name;
        if (body.age !== undefined) users[userIndex].age = body.age;
        if (body.email !== undefined) users[userIndex].email = body.email;

        writeDataFile(users);
        res.statusCode = 200;

        const dynamicUpdatedField = Object.keys(body)[0] || 'details';
        return res.end(JSON.stringify({ message: `User ${dynamicUpdatedField} updated successfully.` }));
      } catch (err) {
        res.statusCode = 400;
        return res.end(JSON.stringify({ message: err.message }));
      }
    }

    //! 3. Create an API that deletes a User by ID. The user id should be retrieved from the URL (1 Grade)
    // Note: Remember to delete the user from the file
    // URL: DELETE /user/id
    if (method === 'DELETE') {
      const users = readDataFile();
      const userIndex = users.findIndex((u) => u.id === userId);

      if (userIndex === -1) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ message: 'User ID not found.' }));
      }

      users.splice(userIndex, 1);
      writeDataFile(users);

      res.statusCode = 200;
      return res.end(JSON.stringify({ message: 'User deleted successfully.' }));
    }

    //! 5. Create an API that gets User by ID. (1 Grade)
    // URL: GET /user/:id
    if (method === 'GET') {
      const users = readDataFile();
      const user = users.find((u) => u.id === userId);

      if (!user) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ message: 'User not found.' }));
      }

      res.statusCode = 200;
      return res.end(JSON.stringify(user));
    }
  }

  //! 4. Create an API that gets all users from the JSON file. (1 Grade)
  // URL: GET /user
  if (method === 'GET' && url === '/user') {
    const users = readDataFile();
    res.statusCode = 200;
    return res.end(JSON.stringify(users));
  }

  res.statusCode = 404;
  return res.end(JSON.stringify({ message: 'Route not found' }));
});

server.listen(PORT, () => {
  console.log(`Server running smoothly on http://localhost:${PORT}`);
});

// -----------------------------Part 3----------------------------- //

//! Part3: Node Internals (3 Grades):
// 1. What is the Node.js Event Loop? (0.5 Grade)
/* The Event Loop is a continuous loop that allows Node.js to perform non-blocking asynchronous operations. 
Even though JavaScript is single-threaded, the event loop handles background tasks and runs their callbacks when they are finished */

// 2. What is Libuv and What Role Does It Play in Node.js? (0.5 Grade)
/* Libuv is an open-source C library used by Node.js. 
Its main role is to provide the Event Loop and handle system tasks like reading files, handling network connections, and managing the internal thread pool. */

// 3. How Does Node.js Handle Asynchronous Operations Under the Hood? (0.5 Grade)
/* When an asynchronous operation starts, Node.js passes it to the Operating System kernel or to Libuv’s background threads.
While the task runs in the background, Node.js continues executing other code.
Once the task is done, its callback is sent to a queue to be executed. */

// 4. What is the Difference Between the Call Stack, Event Queue, and Event Loop in Node.js? (0.5 Grade)
// Call Stack: Executes synchronous JavaScript code one by one (Last-In, First-Out).  Event Queue: Holds the callbacks of completed asynchronous operations that are waiting to run (First-In, First-Out).  Event Loop: The bridge between them. It checks if the Call Stack is empty, and if it is, it moves the first callback from the Event Queue to the Call Stack. 
// Event Queue: Holds the callbacks of completed asynchronous operations that are waiting to run (First-In, First-Out).
// Event Loop: The bridge between them. It checks if the Call Stack is empty, and if it is, it moves the first callback from the Event Queue to the Call Stack.

// 5. What is the Node.js Thread Pool and How to Set the Thread Pool Si// e? (0.5 Grade)
/* The Thread Pool is a set of background workers (default is 4) provided by Libuv to handle heavy operations like file access (fs) or cryptography. */

// 6. How Does Node.js Handle Blocking and Non-Blocking Code Execution? (0.5 Grade)
// Blocking Code: Executes synchronously and stops the execution of any additional code until that operation finishes.
// Non-Blocking Code: Executes asynchronously. It runs in the background immediately, allowing Node.js to run the next lines of code without waiting
