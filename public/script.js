window.onload = function() {
    console.log('DOM chargé');
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const nom = document.getElementById('nom').value;
            const prenom = document.getElementById('prenom').value;
            const email = document.getElementById('email').value;
            const mdp = document.getElementById('password').value;
            const confirmMdp = document.getElementById('confirmpassword').value;

            const regex = new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/);
            const errorMessage = document.getElementById('error-message');
            errorMessage.textContent = '';

            if (!regex.test(mdp)) {
                errorMessage.textContent = 'Votre mot de passe ne respecte pas le format requis';
                return;
            } else if (mdp !== confirmMdp) {
                errorMessage.textContent = 'Les mots de passe ne correspondent pas';
                alert("Les mots de passe ne correspondent pas.");
                return;
            }

            fetch('/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nom: nom,
                    prenom: prenom,
                    email: email,
                    password: mdp,
                    confirmPassword : confirmMdp
                })
            })
            .then(response => 
                response.json())
            .then(data => {
                if (data.token) {
                    localStorage.setItem('access_token', data.token); // Stockez le token dans localStorage
                    window.location.href = '/dashboard'; // Redirigez vers le dashboard
                } else {
                    errorMessage.textContent = 'La connexion a échoué : aucun token reçu';
                }
            })
            .catch(error => {
                console.error('Erreur:', error);
                errorMessage.textContent = "Une erreur s'est produite lors de la soumission du formulaire. Veuillez réessayer.";
            });
        });
    }
};
