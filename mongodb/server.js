import express from 'express';
import { json } from 'express';
import { connect, Schema, model } from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());

connect('mongodb://localhost:27017/travelPrefs');

const preferenceSchema = new Schema({
    vacationType: String,
    duration: String,
    transportation: [String],
    accommodation: String,
    destination: String
});

const Preference = model('Preference', preferenceSchema);

app.post('/submit', async (req, res) => {
    try {
        const pref = new Preference(req.body);
        await pref.save();
        res.status(200).json({ message: 'Preferences saved successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save preferences.', error });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
