module.exports = (dal, secret) => {
    let express = require('express');
    let router = express.Router();

    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcryptjs');

    router.post('/create', async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            let msg = "Username or password missing!";
            console.error(msg);
            res.status(401).json({msg: msg});
            return;
        }

        const user = { "username": username, "password": password};
        bcrypt.hash(user.password, 10, async (err, hash) => {
            user.hash = hash; // The hash has been made, and is stored on the user object.
            delete user.password; // The clear text password is no longer needed
            const newUser = await dal.createUser(user);
            res.json({msg: "New user created!", username: newUser.username});
        });
    });

    router.put('/', (req, res) => {
        // TODO: Implement user update (change password, etc).
        res.status(501).json({msg: "PUT update user not implemented"});
    });

    // This route takes a username and a password and create an auth token
    router.post('/authenticate', async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            let msg = "Username or password missing!";
            console.error(msg);
            res.status(401).json({msg: msg});
            return;
        }

        //const user = users.find((user) => user.username === username);
        const user = await dal.getUser(username);
        if (user) { // If the user is found
            bcrypt.compare(password, user.hash, (err, result) => {
                if (result) { // If the password matched
                    const payload = { username: username };
                    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

                    res.json({
                        msg: `User '${username}' authenticated successfully`,
                        token: token
                    });
                }
                else {
                    console.error(err);
                    res.status(401).json({msg: "Password mismatch!"})
                }
            });
        } else {
            res.status(404).json({msg: "User not found!"});
        }
    });

    return router;
};