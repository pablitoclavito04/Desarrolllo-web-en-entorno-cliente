 let db;
        indexedDB.open("CRM", 1).onupgradeneeded = e => {
            db = e.target.result;
            db.createObjectStore('clients', {keyPath: 'id', autoIncrement: true});
        };
        
        indexedDB.open("CRM", 1).onsuccess = e => {
            db = e.target.result;
            cargar();
        };
        
        function agregar() {
            const c = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value
            };
            db.transaction(['clients'], 'readwrite').objectStore('clients').add(c).onsuccess = cargar;
        }
        
        function cargar() {
            db.transaction(['clients']).objectStore('clients').getAll().onsuccess = e => {
                document.getElementById('lista').innerHTML = e.target.result.map(c =>
                    `<tr><td>${c.id}</td><td>${c.name}</td><td>${c.email}</td><td>${c.phone}</td></tr>`
                ).join('');
            };
        }