const express = require('express');
const path = require('path');
const app = express();
const { expressjwt: jwtMiddleware } = require("express-jwt");

const  mongoose = require('mongoose');

const uri = "mongodb+srv://sweetyamnesia:SCZ9Ur2hdTbHmFPP@cluster0.7gozl.mongodb.net/authentification?retryWrites=true&w=majority&appName=Cluster0";

const userSchema = new mongoose.Schema({
    name : String,
    lastname : String,
    email : String,
    password : String,
    token : String

});

const User = mongoose.model('User', userSchema);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const SHA256 = require("crypto-js/sha256");

const jwt = require('jsonwebtoken');
const SECRET_KEY = '{849C879A-2525-4A39-9C05-5037A7FB9540}';

app.use(
    jwtMiddleware({
      secret: SECRET_KEY,
      algorithms: ["HS256"],
    }).unless({ path: ["/connexion", "/inscription", "/submit-form", "/dashboard"] })
);


app.get('/inscription', async (req, res, next) => {
    try {
        res.render('inscription');
    } catch (err) {
       next(err) 
    }
});

app.get('/connexion', async (req,res, next) => {
    try {
        res.render('connexion');
    } catch (err) {
       next(err) 
    }
});

app.post('/connexion', async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const crypto_password = SHA256(password);
        const user = await NewUser.findOne({
            email: email,
            password: crypto_password
        })

        if(!user) {
            const error = new Error;
            error.status = 401;
            error.message = 'Les identifiants sont incorrects';
            throw error
        }
        res.json({token: user.token})
    }
    catch (err) {
        next(err)
    }
});

app.post('/submit-form', async (req, res, next) => {
    try {
        const hashedPassword = SHA256(req.body.password);
        console.log(hashedPassword);

        const userName = req.body.prenom;
        const lastName = req.body.nom;
        const email = req.body.email;

        const newUser = new User({prenom: userName, nom: lastName, email: email, password: hashedPassword});

        await newUser.save();

        const payload = {id: newUser._id, email: newUser.email};

        const token = jwt.sign(payload, SECRET_KEY);
        console.log('Token généré:', token);
            
        return res.json({message: 'Formulaire reçu avec succès', data: req.body, token: token});

    } catch (error) {
        next(error)
    }
});


app.get('/dashboard', async (req, res, next) => {
    try {
        res.render('dashboard');
    } catch (error) {
        next(error)
    }
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).send({message: err.message, status: err.status});
});

app.listen(3000, async () => {
    console.log('Serveur démarré sur http://localhost:3000');
    await mongoose.connect(uri);
    console.log('Je suis connectée à la base de données');
}); 