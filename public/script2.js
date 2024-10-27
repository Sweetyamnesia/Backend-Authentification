function checkToken () {
    const nom = document.getElementById('nom');
    const prenom = document.getElementById('prenom');
    const email = document.getElementById('email');
    const mdp = document.getElementById('password');
    const confirmMdp = document.getElementById('confirmpassword');
    const token = localStorage.getItem('access_token');
    if (!token) {
        // Token absent, refuser la connexion
        console.log('Token absent, redirection vers la page de connexion');
        window.location.href = '/connexion';
        return;
    } else {
        if (token) {
            fetch('/submit-form', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
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
        }
    }
}

checkToken();

/*/console.log('Token présent, redirection vers la page du tableau de bord');
        window.location.href = '/dashboard';/*/


const buttonOff = document.getElementById('deconnexion');

if (buttonOff) {
    buttonOff.addEventListener('click', function () {
        const token = localStorage.getItem('access_token');
        if(token) {
        localStorage.removeItem('access_token');
        window.location.href = '/connexion';
        }
    });
}
