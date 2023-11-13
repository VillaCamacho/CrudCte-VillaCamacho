const { createApp } = Vue;
    
createApp({
  data() {  
    return {
      mostrarFormulario: false,
      clientes: [
      {id: Date.now(), nombre:'juan', correo: 'juan@gmail.com', telefono: '1111111111', direccion: 'en mi casa', creadoEn: new Date().toISOString()},
      {id: Date.now()+1, nombre:'tony', correo: 'tony@gmail.com', telefono: '2222222222', direccion: 'en mi casa2', creadoEn: new Date().toISOString()},
      {id: Date.now()+2, nombre:'mario', correo: 'mario@gmail.com', telefono: '3333333333', direccion: 'en mi casa3', creadoEn: new Date().toISOString()}],
      nuevoCliente: {
        id: null,
        nombre: '',
        correo: '',
        telefono: '',
        direccion: '',
        creadoEn: ''
      }
    };
  },
  created() {
    this.guardarClientes();
    this.cargarClientes();
  },
  methods: {
    cargarClientes() {
      const clientesEnJson = localStorage.getItem('clientes');
      if (clientesEnJson) {
        try {
          this.clientes = JSON.parse(clientesEnJson);
        } catch (e) {
          console.error('Error al parsear los clientes:', e);
          this.clientes = [];
        }
      }
    },
    guardarClientes() {
      const clientesEnJson = JSON.stringify(this.clientes);
      localStorage.setItem('clientes', clientesEnJson);
      
    },
    agregarCliente() {
      let form = document.getElementById('agregarCliente');
      // Verificar si el formulario es válido
      if (form.checkValidity()) {
      if (!this.nuevoCliente.nombre || !this.nuevoCliente.correo || !this.nuevoCliente.telefono || !this.nuevoCliente.direccion) {
        alert("Por favor, completa los campos necesarios.");
        return;
      }
      
      this.nuevoCliente.id = Date.now();
      this.nuevoCliente.creadoEn = new Date().toISOString();
      this.clientes.push({...this.nuevoCliente});
      this.guardarClientes();
      this.nuevoCliente = { id: null, nombre: '', correo: '', telefono: '', direccion: '', creadoEn: '' };
      this.mostrarFormulario = false;
    }else{
      form.reportValidity();
    }
    },
    mostrarModalEdicion(cliente) {
     
      
      
    },
    guardarEdicion() {
       
    },
    eliminarCliente(clienteId) {
     
    }
  }
}).mount('#app');