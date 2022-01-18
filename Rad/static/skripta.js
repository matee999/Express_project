function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];


    fetch('http://localhost:8000/admin/messages', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('msgLst');

            data.forEach( el => {
                lst.innerHTML += `<li class="list-group-item">ID:${el.id}   User: ${el.user.id}   Body: ${el.body}   ID: ${el.id}</li>`;
            });
        });

    document.getElementById('msgBtn').addEventListener('click', e => {
        e.preventDefault();

        
        const data = {
            body: document.getElementById('body').value
        };

        if(data.body === ""){
            alert("POGRESAN UNOS");
            return false;
        }

        document.getElementById('body').value = '';

        fetch('http://localhost:8000/admin/messages', {
            method: 'POST',
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
                    document.getElementById('msgLst').innerHTML += `<li><b>ID:</b> ${el.id}, <b>Napisao korisnik:</b> ${el.userId}, <b>Predmet:</b>${el.subjectId} <b>Tekst:</b> ${el.body}</li>`;
                }
            });
    });

    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });

    document.getElementById('btn_delete').addEventListener('click', e =>{
        let d = document.getElementById("deleteId").value;
        if(d === ""){
            alert("POGRESAN UNOS");
            return false;
        }
        const data = {
            messageId: d
        };

        fetch('http://localhost:8000/admin/messages', {
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