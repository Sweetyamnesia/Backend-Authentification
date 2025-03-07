# Authentification avec Node.js et Express 🔐

## Description générale 🌟

Ce projet explore les bases de l'authentification et de la sécurisation des applications web avec **Node.js** et **Express**. L'objectif est de mettre en place un système d'authentification sécurisé, en utilisant des tokens JWT pour la gestion des sessions, ainsi que le chiffrement des mots de passe avec **SHA256**.

## Pile technologique 🛠️

- **Node.js** : Backend
- **Express** : Framework pour le serveur
- **jsonwebtoken (JWT)** : Gestion des tokens
- **SHA256** : Chiffrement des mots de passe
- **MongoDB** : Base de données pour stocker les utilisateurs
- **express-jwt** : Gestion des autorisations partielles

## Caractéristiques principales ✨

- **Création d'un serveur** : Mise en place d'un serveur avec **Node.js** et **Express**.
- **Formulaire d'inscription** : Enregistrement sécurisé des utilisateurs avec chiffrement du mot de passe.
- **Token d'authentification** : Création, gestion et vérification des tokens JWT pour l'authentification des utilisateurs.
- **Base de données MongoDB** : Enregistrement des utilisateurs et de leurs données dans MongoDB.
- **Système de déconnexion** : Déconnexion de l'utilisateur avec invalidation du token.
- **Déconnexion automatique** : Suppression du token au démarrage de la page si celui-ci est invalide.
- **Middleware d'erreurs** : Gestion des erreurs d'authentification et de sécurité.
- **Autorisation partielle** : Accès restreint à certaines ressources via **express-jwt**.
- **Page de connexion sécurisée** : Création d’une page de connexion avec vérification de l'utilisateur.

## Problèmes connus ⚠️

- **Problème d'authentification du token** : Le token n'est pas détecté à l'arrivée sur la page d'accueil malgré sa présence dans le **localStorage**.
- **Problèmes d'accès aux pages** : Selon les routes autorisées, des erreurs empêchent l'accès à certaines pages.
  
## 📅 En cours...

Le projet est encore en développement. Lors de la reprise, ces problèmes seront résolus et la fonctionnalité sera pleinement opérationnelle.

