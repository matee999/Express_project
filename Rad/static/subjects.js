function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];


    fetch('http://localhost:8000/admin/subjectss', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('usrLst');

            data.forEach( el => {
                lst.innerHTML += `<li>Naziv: ${el.name}, ESPB: ${el.espb}, Godina: ${el.year}</li>`;
            });
        });
    

    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
}
