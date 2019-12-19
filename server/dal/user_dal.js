const bcrypt = require('bcryptjs'); // Used for hashing passwords!

class UserDAL {
    constructor(mongoose) {
        this.mongoose = mongoose;
        const userSchema = new mongoose.Schema({
            username: String,
            hash: String
        });
        this.userModel = mongoose.model('user', userSchema);
    }

    async createUser(user) {
        let newUser = new this.userModel(user);
        return newUser.save();
    }

    async getUser(username) {
        try {
            return await this.userModel.findOne({ "username": username});
        } catch (error) {
            console.error("getUser:", error.message);
            return {};
        }
    }

    async getUsers() {
        try {
            return await this.userModel.find({});
        } catch (error) {
            console.error("getUsers:", error.message);
            return {};
        }
    }

    async bootstrapTestusers() {
        let l = (await this.getUsers()).length;
        console.log("Users in system:", l);

        if (l !== 0) return;

        const users = [
            // These are just some test users with passwords.
            // The passwords are in clear text for testing purposes. (don't do this in production)
            { username: "alex", password: '123'},
            { username: "alexAdmin", password: '123'},
            { username: "alexUser", password: '123'},
        ];

        let promises = [];
        users.forEach(user => {
            bcrypt.hash(user.password, 10, (err, hash) => {
                user.hash = hash; // The hash has been made, and is stored on the user object.
                delete user.password; // The clear text password is no longer needed

                let newUser = new this.userModel(user);
                promises.push(newUser.save());
            });
        });

        return Promise.all(promises);
    }
}

module.exports = (mongoose) => new UserDAL(mongoose);