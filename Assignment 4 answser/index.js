import express from 'express'
import fs from 'fs'
import path from 'path'

const app = express()
const PORT = 3000
const DATA_FILE = path.resolve('users.json')

app.use(express.json())

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

app.get("/", (req, res) => {
    return res.status(200).json({ message: "Hello from Express" });
});

//! Part1: Simple CRUD Operations Using Express.js:
//* For all the following tasks, you must use the fs module to read and write data from a JSON file (e.g.,users.json). Do not store or manage data using arrays. (2 Grades)

//! 1. Create an API that adds a new user to your users stored in a JSON file. (ensure that the email of the new user doesn’t exist before)
// URL: POST /user
app.post("/user", (req, res) => {
    const { name, email, age } = req.body

    try {
        const users = readDataFile();
        // check if email exits
        const emailExists = users.some((user) => user.email === email);
        if (emailExists) {
            return res.status(400).json({ message: "Email already exists." }); // مطابق لمخرجات السؤال
        }
        // create new user
        const newUser = {
            id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
            name,
            age: parseInt(age, 10),
            email
        };
        users.push(newUser);
        writeDataFile(users);

        return res.status(201).json({ message: "User added successfully." });
    } catch (err) {
        return res.status(500).json({ message: "error fetching user data", error: err.message });
    }
});

//! 2. Create an API that updates an existing user's name, age, or email by their ID. The user ID should be retrieved from the params.
//* Note: Remember to update the corresponding values in the JSON file
// URL: PATCH /user/:id
app.patch("/user/:id", (req, res) => {
    const { id } = req.params
    const { name, email, age } = req.body

    try {
        const users = readDataFile();
        const userIndex = users.findIndex((u) => u.id === parseInt(id, 10));

        // check if user id exits
        if (userIndex === -1) {
            return res.status(404).json({ message: "User ID not found." });
        }
        // selecting (مش فاهمها اوي بس)
        let updatedField = "details";
        if (name !== undefined) { users[userIndex].name = name; updatedField = "name"; }
        if (age !== undefined) { users[userIndex].age = parseInt(age, 10); updatedField = "age"; }
        if (email !== undefined) { users[userIndex].email = email; updatedField = "email"; }

        writeDataFile(users);

        return res.status(200).json({ message: `User ${updatedField} updated successfully.` }); // مطابق لمخرجات السؤال
    } catch (err) {
        return res.status(500).json({ message: "error fetching user data", error: err.message });
    }
});

//! 3. Create an API that deletes a User by ID. The user id should be retrieved from either the request body or optional params.
//* Note: Remember to delete the user from the file
// URL: DELETE /user/{:id}
app.delete("/user{/:id}", (req, res) => {
    const idInput = req.params.id || req.body.id;
    const userId = parseInt(idInput, 10);

    try {
        // check if valid
        if (isNaN(userId)) {
            return res.status(400).json({ message: "Valid User ID is required." });
        }

        const users = readDataFile();
        const userIndex = users.findIndex((u) => u.id === userId);
        // check if exits
        if (userIndex === -1) {
            return res.status(404).json({ message: "User ID not found." }); // مطابق لمخرجات السؤال
        }

        // deleting
        users.splice(userIndex, 1);
        writeDataFile(users);

        return res.status(200).json({ message: "User deleted successfully." }); // مطابق لمخرجات السؤال
    } catch (err) {
        return res.status(500).json({ message: "error deleting the user", error: err.message });
    }
});

//! 4. Create an API that gets a user by their name. The name will be provided as a query parameter.
// URL: GET /user/getByName
app.get("/user/getByName", (req, res) => {
    const { name } = req.query;

    try {
        const users = readDataFile();
        // searching
        const user = users.find((u) => u.name?.toLowerCase() === name?.toLowerCase());

        if (!user) {
            return res.status(404).json({ message: "User name not found." });
        }

        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching user data", error: err.message });
    }
});

//! 5. Create an API that gets all users from the JSON file.
// URL: GET /user
app.get("/user", (req, res) => {
    try {
        const users = readDataFile();
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ message: "error fetching user data", error: err.message });
    }
});

//! 6. Create an API that filters users by minimum age.
// URL: GET /user/filter
app.get("/user/filter", (req, res) => {
    const minAge = parseInt(req.query.minAge, 10);
    try {
        if (isNaN(minAge)) {
            return res.status(400).json({ message: "Invalid minAge parameter" });
        }

        const users = readDataFile();
        const filteredUsers = users.filter((u) => u.age >= minAge);
        // if no users
        if (filteredUsers.length === 0) {
            return res.status(404).json({ message: "no user found" });
        }

        return res.status(200).json(filteredUsers);
    } catch (err) {
        return res.status(500).json({ message: "Error filtering users", error: err.message });
    }
});

//! 7. Create an API that gets User by ID. (1 Grade)
// URL: GET /user/:id
app.get("/user/:id", (req, res) => {
    const userId = parseInt(req.params.id, 10);
    try {
        const users = readDataFile();
        const user = users.find((u) => u.id === userId);
        // check if user exits
        if (!user) {
            return res.status(404).json({ message: "User not found." }); 
        }

        return res.status(200).json(user); 
    } catch (err) {
        return res.status(500).json({ message: "error fetching user data", error: err.message });
    }
});

app.listen(PORT, (err) => {
    if (err) console.log("Error in server setup")
    console.log(`Server listening on Port ${PORT}`);
});