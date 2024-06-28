require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const User = require('./models/User');
const { default: mongoose } = require('mongoose');
const cors = require('cors');


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.log('Error connecting to database');
    });


app.use(express.json());
app.use(cors('*'));

app.get('/', (req, res) => {
    res.send('Hello World!');
    });

app.post('/user', async (req, res) => {
    const {fname, lname, countryCode, phone, favNumber, favMammal, address, postcode, city } = req.body;

    if (!fname || !lname || !countryCode || !phone || !favNumber || !favMammal || !address || !postcode || !city) {
        res.status(400).send('Missing required fields');
        return;
    }

    if (parseInt(favNumber) < 0 || parseInt(favNumber) > 100) {
        res.status(400).send('Favourite number must be between 0 and 100');
        return;
    }

    if (typeof fname !== 'string' || typeof lname !== 'string' || typeof countryCode !== 'string' || typeof phone !== 'string' || typeof parseInt(favNumber) !== 'number' || typeof favMammal !== 'string' || typeof address !== 'string' || typeof postcode !== 'string' || typeof city !== 'string') {
        res.status(400).send('Invalid data type');
        return;
    }

    const existingUser = await User.findOne({ phone: phone });
    if (existingUser) {
        return res.status(409).send("A user with the same phone already exists");
    }

    
    const newUser = new User({
        fname: fname.trim(),
        lname: lname.trim(),
        countryCode: countryCode.trim(),
        phone: phone.trim(),
        favNumber: favNumber,
        favMammal: favMammal.trim(),
        address: address.trim(),
        postcode: postcode.trim(),
        city: city.trim(),
    });

    newUser.save()
        .then(() => {
            res.status(201).send('User saved!');
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send('Error saving user');
        });

});

app.get('/user', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
    });