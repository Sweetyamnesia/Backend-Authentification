window.onload = function() {
    const form = document.querySelector('form');

        form.addEventListener('submit', async function(event) {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const mdp = document.getElementById("password").value;
            // Validation 
            if (!email || !mdp) {
                alert("Email ou mot de passe incorrect.");
                return;
            }

            // Envoi de la requête de connexion avec `fetch` et utilisation de `async/await`
            try {
                const response = await fetch('/connexion', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: email, password: mdp })
                });

                const data = await response.json();
                // Gestion des réponses du serveur
                if (data.token) {
                    // Stockage sécurisé du token dans `localStorage`
                    localStorage.setItem('access_token', data.token);
                    window.location.href = '/dashboard';
                } else {
                    alert('Connexion échouée : ' + data.message);
                }
            } catch (error) {
                console.error("Erreur:", error);
                alert("Une erreur s'est produite. Veuillez réessayer.");
            }
        });
    };