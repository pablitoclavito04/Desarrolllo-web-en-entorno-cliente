// ============================================
//             VARIABLES GLOBALES
// ============================================

let db; // Referencia a la base de datos IndexedDB
let clienteEditando = null; // ID del cliente en edición (null si es nuevo)
let clienteAEliminar = null; // ID del cliente a eliminar
let todosLosClientes = []; // Cache de todos los clientes para búsqueda
      
/**
* Abre la base de datos y crea el object store si no existe
*/
const dbRequest = indexedDB.open("CRM", 1);

    dbRequest.onupgradeneeded = (evento) => {
        db = evento.target.result;
            
    // Crear object store si no existe
    if (!db.objectStoreNames.contains('clients')) {
        db.createObjectStore('clients', {
                keyPath: 'id',
                autoIncrement: true
            });
            console.log('✓ Object store "clients" creado');
        }
    };

    dbRequest.onsuccess = (evento) => {
        db = evento.target.result;
        console.log('✓ Base de datos abierta correctamente');
        cargarClientes(); // Cargar clientes al iniciar
    };

    dbRequest.onerror = (evento) => {
        console.error('✗ Error al abrir la base de datos:', evento.target.error);
        mostrarNotificacion('Error al abrir la base de datos', 'error');
    };


// ============================================
//                VALIDACIONES
// ============================================

/**
* Expresiones regulares para validación
*/
    const REGEX = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

        // Acepta: 612345678 o +34612345678
        phone: /^(\+34)?[6-9]\d{8}$/
    };

    /**
    * Valida un campo individual
    * @param {HTMLElement} input - Campo a validar
    * @returns {boolean} - true si es válido
    */

    function validarCampo(input) {
        const valor = input.value.trim();
        const id = input.id;
        const errorElement = document.getElementById(`${id}Error`);
        let esValido = true;

        // Validación según el tipo de campo
        switch(id) {
            case 'name':
                esValido = valor.length >= 3;
                break;
            case 'email':
                esValido = REGEX.email.test(valor);
                break;
        case 'phone':
            esValido = REGEX.phone.test(valor);
            break;
        }

        // Actualizar UI según validación
        if (esValido) {
            input.classList.remove('invalid');
            input.classList.add('valid');
            errorElement.classList.remove('show');
        } else {
            input.classList.remove('valid');
            input.classList.add('invalid');
            errorElement.classList.add('show');
        }

        return esValido;
    }

        /**
         * Valida todo el formulario
         * @returns {boolean} - true si todo es válido
         */
        function validarFormulario() {
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');

            const nombreValido = validarCampo(name);
            const emailValido = validarCampo(email);
            const telefonoValido = validarCampo(phone);

            return nombreValido && emailValido && telefonoValido;
        }

        // ============================================
        // GESTIÓN DE CLIENTES (CRUD)
        // ============================================

        /**
         * Agrega o actualiza un cliente
         */
        function agregarOActualizarCliente() {
            // Validar antes de proceder
            if (!validarFormulario()) {
                mostrarNotificacion('Por favor, corrige los errores del formulario', 'error');
                return;
            }

            const cliente = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim()
            };

            const transaction = db.transaction(['clients'], 'readwrite');
            const objectStore = transaction.objectStore('clients');

            let request;

            if (clienteEditando) {
                // ACTUALIZAR cliente existente
                cliente.id = clienteEditando;
                request = objectStore.put(cliente);
            } else {
                // AGREGAR nuevo cliente
                request = objectStore.add(cliente);
            }

            request.onsuccess = () => {
                const mensaje = clienteEditando ? 
                    '✓ Cliente actualizado correctamente' : 
                    '✓ Cliente agregado correctamente';
                
                mostrarNotificacion(mensaje, 'success');
                limpiarFormulario();
                cargarClientes();
            };

            request.onerror = () => {
                mostrarNotificacion('✗ Error al guardar el cliente', 'error');
            };
        }

        /**
         * Carga todos los clientes de la base de datos
         */
        function cargarClientes() {
            const transaction = db.transaction(['clients'], 'readonly');
            const objectStore = transaction.objectStore('clients');
            const request = objectStore.getAll();

            request.onsuccess = (evento) => {
                todosLosClientes = evento.target.result;
                renderizarClientes(todosLosClientes);
            };

            request.onerror = () => {
                mostrarNotificacion('✗ Error al cargar los clientes', 'error');
            };
        }

        /**
         * Renderiza los clientes en la tabla
         * @param {Array} clientes - Array de clientes a mostrar
         */
        function renderizarClientes(clientes) {
            const lista = document.getElementById('lista');
            const searchInput = document.getElementById('searchInput').value.toLowerCase();

            if (clientes.length === 0) {
                lista.innerHTML = `
                    <tr>
                        <td colspan="5" class="empty-state">
                            <div class="empty-state-icon">📭</div>
                            <h3>No hay clientes registrados</h3>
                            <p>Agrega tu primer cliente usando el formulario</p>
                        </td>
                    </tr>
                `;
                actualizarInfoBusqueda(0, 0);
                return;
            }

            lista.innerHTML = clientes.map(cliente => {
                // Resaltar coincidencias de búsqueda
                const nombre = resaltarTexto(cliente.name, searchInput);
                const email = resaltarTexto(cliente.email, searchInput);
                const telefono = resaltarTexto(cliente.phone, searchInput);

                return `
                    <tr>
                        <td>${cliente.id}</td>
                        <td>${nombre}</td>
                        <td>${email}</td>
                        <td>${telefono}</td>
                        <td class="actions">
                            <button class="btn btn-edit" onclick="editarCliente(${cliente.id})">
                                ✏️ Editar
                            </button>
                            <button class="btn btn-delete" onclick="confirmarEliminacion(${cliente.id})">
                                🗑️ Eliminar
                            </button>
                        </td>
                    </tr>
                `;
            }).join('');

            actualizarInfoBusqueda(clientes.length, todosLosClientes.length);
        }

        /**
         * Prepara el formulario para editar un cliente
         * @param {number} id - ID del cliente a editar
         */
        function editarCliente(id) {
            const transaction = db.transaction(['clients'], 'readonly');
            const objectStore = transaction.objectStore('clients');
            const request = objectStore.get(id);

            request.onsuccess = (evento) => {
                const cliente = evento.target.result;
                
                if (cliente) {
                    // Rellenar el formulario
                    document.getElementById('name').value = cliente.name;
                    document.getElementById('email').value = cliente.email;
                    document.getElementById('phone').value = cliente.phone;

                    // Cambiar modo a edición
                    clienteEditando = id;
                    document.getElementById('formTitle').textContent = '✏️ Editar Cliente';
                    document.getElementById('btnText').textContent = '✓ Guardar Cambios';
                    document.getElementById('cancelBtn').style.display = 'inline-block';

                    // Scroll al formulario
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            };
        }

        /**
         * Muestra modal de confirmación para eliminar
         * @param {number} id - ID del cliente a eliminar
         */
        function confirmarEliminacion(id) {
            clienteAEliminar = id;
            document.getElementById('deleteModal').classList.add('show');
        }

        /**
         * Elimina el cliente confirmado
         */
        function eliminarCliente() {
            if (!clienteAEliminar) return;

            const transaction = db.transaction(['clients'], 'readwrite');
            const objectStore = transaction.objectStore('clients');
            const request = objectStore.delete(clienteAEliminar);

            request.onsuccess = () => {
                mostrarNotificacion('✓ Cliente eliminado correctamente', 'success');
                cargarClientes();
                cerrarModal();
            };

            request.onerror = () => {
                mostrarNotificacion('✗ Error al eliminar el cliente', 'error');
            };
        }

        /**
         * Limpia el formulario y resetea el modo
         */
        function limpiarFormulario() {
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('phone').value = '';

            // Remover clases de validación
            ['name', 'email', 'phone'].forEach(id => {
                const input = document.getElementById(id);
                input.classList.remove('valid', 'invalid');
                document.getElementById(`${id}Error`).classList.remove('show');
            });

            // Resetear modo
            clienteEditando = null;
            document.getElementById('formTitle').textContent = '➕ Agregar Nuevo Cliente';
            document.getElementById('btnText').textContent = '✓ Agregar Cliente';
            document.getElementById('cancelBtn').style.display = 'none';
        }

        // ============================================
        // BÚSQUEDA EN TIEMPO REAL
        // ============================================

        /**
         * Filtra clientes según el término de búsqueda
         * @param {string} termino - Término a buscar
         */
        function buscarClientes(termino) {
            termino = termino.toLowerCase().trim();

            if (!termino) {
                renderizarClientes(todosLosClientes);
                return;
            }

            const resultados = todosLosClientes.filter(cliente => 
                cliente.name.toLowerCase().includes(termino) ||
                cliente.email.toLowerCase().includes(termino) ||
                cliente.phone.toLowerCase().includes(termino)
            );

            renderizarClientes(resultados);
        }

        /**
         * Resalta el texto que coincide con la búsqueda
         * @param {string} texto - Texto original
         * @param {string} busqueda - Término a resaltar
         * @returns {string} - HTML con resaltado
         */
        function resaltarTexto(texto, busqueda) {
            if (!busqueda) return texto;

            const regex = new RegExp(`(${busqueda})`, 'gi');
            return texto.replace(regex, '<span class="highlight">$1</span>');
        }

        /**
         * Actualiza la información de búsqueda
         * @param {number} encontrados - Número de resultados
         * @param {number} total - Total de clientes
         */
        function actualizarInfoBusqueda(encontrados, total) {
            const searchInfo = document.getElementById('searchInfo');
            
            if (encontrados === total) {
                searchInfo.textContent = `Mostrando ${total} cliente${total !== 1 ? 's' : ''}`;
            } else {
                searchInfo.textContent = `Mostrando ${encontrados} de ${total} cliente${total !== 1 ? 's' : ''}`;
            }
        }

        // ============================================
        // UTILIDADES UI
        // ============================================

        /**
         * Muestra una notificación toast
         * @param {string} mensaje - Mensaje a mostrar
         * @param {string} tipo - 'success', 'error' o 'warning'
         */
        function mostrarNotificacion(mensaje, tipo = 'success') {
            const toast = document.createElement('div');
            toast.className = `toast ${tipo}`;
            
            const icono = tipo === 'success' ? '✓' : 
                         tipo === 'error' ? '✗' : '⚠';
            
            toast.innerHTML = `
                <span style="font-size: 24px;">${icono}</span>
                <span>${mensaje}</span>
            `;

            document.body.appendChild(toast);

            // Eliminar después de 3 segundos
            setTimeout(() => {
                toast.style.animation = 'slideInRight 0.3s ease reverse';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }

        /**
         * Cierra el modal de confirmación
         */
        function cerrarModal() {
            document.getElementById('deleteModal').classList.remove('show');
            clienteAEliminar = null;
        }

        // ============================================
        // EVENT LISTENERS
        // ============================================

        // Validación en tiempo real
        ['name', 'email', 'phone'].forEach(id => {
            document.getElementById(id).addEventListener('blur', function() {
                validarCampo(this);
            });
        });

        // Botón de submit
        document.getElementById('submitBtn').addEventListener('click', agregarOActualizarCliente);

        // Botón de cancelar edición
        document.getElementById('cancelBtn').addEventListener('click', limpiarFormulario);

        // Búsqueda en tiempo real
        document.getElementById('searchInput').addEventListener('input', function() {
            buscarClientes(this.value);
        });

        // Modal - Confirmar eliminación
        document.getElementById('confirmDelete').addEventListener('click', function() {
            eliminarCliente();
        });

        // Modal - Cancelar eliminación
        document.getElementById('cancelDelete').addEventListener('click', cerrarModal);

        // Cerrar modal al hacer clic fuera
        document.getElementById('deleteModal').addEventListener('click', function(e) {
            if (e.target === this) {
                cerrarModal();
            }
        });

        // Prevenir envío del formulario con Enter
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    agregarOActualizarCliente();
                }
            });
        });

        console.log('✓ CRM inicializado correctamente');