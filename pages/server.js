function register() {
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    const data = {
        name: name,
        email: email,
        password: password
    };

    const response = fetch("http://localhost:3000/user/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                alert('user already exist')

            }
            return response.json();
        })
        .then(data => {
            console.log('Registration successful:', data);
            //window.location.href = 'http://127.0.0.1:5500/server/pages/login.html';
        })
        .catch(error => {
            console.error('Error during registration:', error);
        });

}

function login() {
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    const data = {
        email: email,
        password: password
    };
    const response = fetch("http://localhost:3000/user/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                alert('wrong email or password')

            }
            return response.json();
        })
        .then(data => {
            console.log('login successful:', data);
            //window.location.href = 'http://127.0.0.1:5500/server/pages/home.html';
        })
        .catch(error => {
            console.error('Error during login:', error);
        });


}