# Authentification avec Node.js et Express

## Description du projet :

Ce projet explore les bases de l'authentification et de la sécurisation des applications web en utilisant Node.js et Express. L'objectif est de comprendre et d'implémenter les différentes étapes d'un système d'authentification sécurisé, de la création d'un serveur au stockage sécurisé des mots de passe et à l'utilisation des tokens pour la gestion des sessions.

## Pile technologique : 

- **Node.js** : pour le développement backend.
- **Express** : framework minimaliste pour la création du serveur.
- **jsonwebtoken (JWT)** : pour la gestion des tokens.
- **SHA256** : pour le chiffrement des mots de passe.
- **MongoDB** : pour le stockage des utilisateurs et des données.
- **express-jwt** : pour la gestion des autorisations partielles.


## Caractéristiques :

- **Création d'un serveur** : Mise en place d'un serveur Node.js et Express.
- **Formulaire d'inscription** : Création d'un formulaire d'inscription avec chiffrement du mot de passe.
- **Token d'authentification** : Création et gestion d'un token pour l'authentification.
- **Enregistrement en base de données** : Enregistrement des utilisateurs dans une base de données MongoDB.
- **Système de déconnexion** : Implémentation d'un système de déconnexion pour invalider le token utilisateur.
- **Déconnexion automatique** : Refactorisation pour déconnecter automatiquement l'utilisateur au démarrage de la page en l'absence de token valide.
- **Middleware de gestion des erreurs** : Mise en place d'un middleware pour gérer les erreurs d'authentification.
- **Autorisation partielle** : Utilisation d'express-jwt pour limiter l'accès à certaines ressources.
- **Récupération des données utilisateur** : Affichage des données de l'utilisateur authentifié.
- **Page de connexion** : Création d'une page de connexion sécurisée.

## Problèmes connus : 

- Problème d'authentification avec le token qui n'est pas détecté lorsqu'on arrive dans la page d'accueil,
et ce, malgré sa présence dans le localStorage. Impossibilité d'accéder à la page d'accueil.
- Selon que certaines routes soient autorisées ou non, génération d'erreurs/problèmes qui empêchent l'accessibilité aux pages.


