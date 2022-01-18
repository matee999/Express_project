function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];


    fetch('http://localhost:8000/admin/profesorss', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('profLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, E-mail: ${el.email}</li>`;
            });
        });
    

    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
}
