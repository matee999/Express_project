function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://localhost:8000/admin/userss', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('usrLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, E-mail: ${el.email}</li>`;
            });
        });
    

    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });

    document.getElementById('btn_delete').addEventListener('click', e =>{

        const data = {
            userId: document.getElementById("deleteId").value
        };

        if(data.userId === ""){
            alert("POGRESAN UNOS");
            return false;
        }

        fetch('http://localhost:8000/admin/userss', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    console.log("Obirsano");
                }
            });
    })
}
