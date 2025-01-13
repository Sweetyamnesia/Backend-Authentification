const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const { expressjwt: jwtMiddleware } = require("express-jwt");
const SHA256 = require("crypto-js/sha256");
const jwt = require('jsonwebtoken');
const SECRET_KEY = '{849C879A-2525-4A39-9C05-5037A7FB9540}';

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

app.use(
    jwtMiddleware({
      secret: SECRET_KEY,
      algorithms: ["HS256"],
      requestProperty: "auth" 
    }).unless({ path: ["/connexion", "/inscription", "/submit-form", "/dashboard"] })
);

//page d'inscription
app.get('/inscription', async (req, res, next) => {
    try {
        res.render('inscription');
    } catch (err) {
       next(err) 
    }
});

//route qui récupère les informations
app.post('/submit-form', async (req, res, next) => {
    try {
        const { prenom, nom, email, password } = req.body;

        // Hachage du mot de passe
        const hashedPassword = SHA256(password).toString();

       /*/ const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({message : "Cet email est déjà utilisé"})
        }.*/

        //Création du token
        const token = jwt.sign({ email }, SECRET_KEY, { algorithm: "HS256" }); // Génére le token avec l'ID

        // Créer une nouvelle instance de l'utilisateur
        const newUser = new User({
            name: prenom,
            lastname: nom,
            email: email,
            password: hashedPassword,
            token: token
        });

        // Sauvegarder l'utilisateur dans la base de données
        await newUser.save();

        // Retourner une réponse positive
        res.json({ token });
    } catch (error) {
        console.error("Erreur lors de l'enregistrement de l'utilisateur:", error);
        next(error);
    }
});

//route qui affiche les donéees
app.get('/getdata', async (req, res, next) => {
    try {
        // Vérifier que le token est dans l'en-tête Authorization
        const token = req.headers.authorization.split(' ')[1];  // Récupérer le token à partir de l'en-tête

        if (!token) {
            return res.status(401).json({ message: 'Token manquant' });
        }

        const user = await User.findOne({ token : token });  // Récupérer l'utilisateur basé sur l'ID du token

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Si tout va bien, envoyer les données de l'utilisateur
        res.json({ name: user.name, lastname: user.lastname });
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        return res.status(401).json({ message: 'Token invalide ou expiré' });
    }
});


//page d'accueil
app.get('/dashboard', (req, res) => {
    /*/if (!req.user) {
        return res.status(401).json({ message: 'Token manquant ou invalide' });
    }/*/

    // L'utilisateur est authentifié, donc on peut envoyer les données à la vue
    //const { email, nom, prenom } = req.body;

    res.render('dashboard')
});



//page de connexion
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
        const crypto_password = SHA256(password).toString();

        const user = await User.findOne({
            email: email,
            password: crypto_password
        });

        if (!user) {
            return res.status(401).json({ message: "L'email est invalide" });
        }

        if (user.password !== crypto_password) {
            return res.status(401).json({ message: 'Le mot de passe est incorrect' });
        }

        // On renvoie le token de l'utilisateur
        res.json({ token: user.token });
    } catch (err) {
        next(err);
    }
});


app.use((req, res, next) => {
    console.log("En-têtes de la requête:", req.headers);  // Log des en-têtes pour vérifier si le token est là
    next();
});

app.listen(3000, async () => {
    console.log('Serveur démarré sur http://localhost:3000');
    await mongoose.connect(uri);
    console.log('Je suis connectée à la base de données');
}); 



/*/// Middleware pour récupérer les données utilisateur
async function getUserFromToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Token manquant' });
        }

        const token = authHeader.split(' ')[1]; // Récupérer le token
        const decoded = jwt.verify(token, SECRET_KEY); // Décoder le token pour récupérer userId
        const userId = decoded.userId;

        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        req.user = user; // Attacher l'utilisateur à la requête
        next(); // Passer au middleware suivant
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}/*/