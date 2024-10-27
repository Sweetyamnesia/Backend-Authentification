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
            if(!regex.test(mdp)) {
                errorMessage.textContent = 'Votre mot de passe ne respecte pas le format requis';
                alert("Les mots de passe ne respectent pas les critères.");
                return;
            } else if (mdp!==confirmMdp) {
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
                    nom : nom,
                    prenom: prenom,
                    email: email,
                    password: mdp,
                    confirmPassword: confirmMdp
                })
            })
            .then(response =>
                response.json())
            .then(data => {
                const token = data.token;
                if (data.token) {
                    localStorage.setItem('access_token', token);
                    console.log('Token reçu et stocké:', data.token)
                    window.location.href = '/dashboard';
                } else {
                    console.log('Aucun token reçu');
                }
            })
            .catch(error =>
                console.error('Erreur:', error)
            );
                
        });
    }
};

