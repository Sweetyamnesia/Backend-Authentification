window.onload = function() {
const token = localStorage.getItem('access_token');

    if (!token) {
        console.log('Token absent, redirection vers la page de connexion');
        window.location.href = '/connexion';
        return;
    }
      fetch('/getdata', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Envoie le token dans l'en-tête Authorization
          'Accept': 'application/json'
        }
      })
      .then(response => {
        console.log('Réponse reçue:', response)
        if (!response.ok) {
          throw new Error('Token invalide ou expiré');
        }
        return response.json();
      })
      .then(data => {
          if (data.name && data.lastname) {
            document.getElementById('welcome').textContent = `Bienvenue, ${name} ${lastname}`;
          }
        }) 
      .catch(error => {
        console.error('Erreur:', error);
        localStorage.removeItem('access_token'); // Supprime le token en cas d'erreur
        window.location.href = '/connexion';
      });
    };
               
const buttonOff = document.getElementById('deconnexion');
    buttonOff.addEventListener('click', function () {
        console.log('bouton enclenché')
        localStorage.removeItem('access_token');
        window.location.href = '/connexion';
    });
