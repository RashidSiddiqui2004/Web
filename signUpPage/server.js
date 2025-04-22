import express from 'express';
import { json } from 'express';
import cors from 'cors';
import { connect, model, Schema } from 'mongoose';

const app = express();
app.use(cors());
app.use(json());

connect('mongodb://localhost:27017/skillista');

const userSchema = new Schema({
    fullName: String,
    gender: String,
    password: String
});


const User = model("User", userSchema);

app.post('/submit', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(200).json({ message: "User created successfully!" });
    } catch (error) {
        res.status(500).json({ message: "User creation failed!", error });
    }

});

app.get('/users', async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json({ users: allUsers });
    } catch (error) {
        console.log(error);
    }
});

app.get('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        res.status(200).json({ user: user });
    } catch (error) {
        console.log(error);
    }
});

app.get('/users/males', async (req, res) => {
    const maleUsers = await User.find({ "gender": "Male" });
    res.status(200).json({ users: maleUsers });
})

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
}); 
