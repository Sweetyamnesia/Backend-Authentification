# Authentification avec Node.js et Express

## Description du projet : 
Ce projet explore les bases de l'authentification et de la sécurisation des applications web en utilisant Node.js et Express. 
L'objectif est de comprendre et d'implémenter les différentes étapes d'un système d'authentification sécurisé, 
de la création d'un serveur au stockage sécurisé des mots de passe et à l'utilisation des tokens pour la gestion des sessions.

## Objectifs principaux : 
- Comprendre et implémenter un système d'authentification basé sur JWT.
- Utiliser des pratiques de sécurité pour protéger les mots de passe et les données des utilisateurs.
- Apprendre à sécuriser et gérer les autorisations pour les routes API.

## Pile technologique : 
- **Node.js** : pour le développement backend.
- **Express** : framework minimaliste pour la création du serveur.
- **jsonwebtoken (JWT)** : pour la gestion des tokens.
- **bSHA256** : pour le chiffrement des mots de passe.
- **MongoDB** : pour le stockage des utilisateurs et des données.
- **express-jwt** : pour la gestion des autorisations partielles.

## Caractéristiques : 
Voici les étapes principales couvertes par ce projet : 
1. **Création du serveur** : initialiser un serveur Node.js avec Express.
2. **Formulaire d'inscription** : créer une interface pour enregistrer les utilisateurs.
3. **Chiffrement du mot de passe** : utiliser **SHA256** pour sécuriser les mots de passe avant de les stocker.
4. **Création d'un token** : générer un JWT pour gérer les sessions utilisateurs.
5. **Enregistrement en base de données** : sauvegarder les informations utilisateurs dans MongoDB.
6. **Gestion du localStorage** : stocker et gérer le JWT côté client.
7. **Déconnexion** : implémenter un système simple de déconnexion.
8. **Refactorisation** : déconnecter automatiquement l'utilisateur au démarrage de la page en l'absence de token valide.
9. **Middleware de gestion d'erreur** : centraliser et gérer les erreurs de façon cohérente.
10. **Autorisation partielle avec express-jwt** : restreindre l'accès à certaines routes pour des utilisateurs authentifiés.
11. **Récupération des données utilisateur** : permettre aux utilisateurs de récupérer leurs propres informations.
12. **Page de connexion** : créer une interface pour que les utilsateurs puissent se connecter.






