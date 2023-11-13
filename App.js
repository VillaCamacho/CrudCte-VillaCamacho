const { createApp } = Vue;
    
createApp({
  data() {  
    return {
      mostrarFormulario: false,
      clientes: [],
      nuevoCliente: {
        id: null,
        nombre: '',
        correo: '',
        telefono: '',
        direccion: '',
        creadoEn: ''
      },
      clienteEdicion: {
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
    ls = localStorage.getItem('clientes')
    if(!ls){
        localStorage.setItem('clientes', '[]')
    }
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
      if(localStorage.getItem('clientes').length == 2){
        this.clientes.push(
            {id: Date.now(), nombre:'juan', correo: 'juan@gmail.com', telefono: '1111111111', direccion: 'en mi casa', creadoEn: new Date().toISOString()},
            {id: Date.now()+1, nombre:'tony', correo: 'tony@gmail.com', telefono: '2222222222', direccion: 'en mi casa2', creadoEn: new Date().toISOString()},
            {id: Date.now()+2, nombre:'mario', correo: 'mario@gmail.com', telefono: '3333333333', direccion: 'en mi casa3', creadoEn: new Date().toISOString()})
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
      this.clienteEdicion = Object.assign({}, cliente);
      console.log(this.clienteEdicion)
     
      this.$nextTick(() => {
        const modal = new bootstrap.Modal(document.getElementById('modalEdicion'));
        modal.show();
      });
      
      
    },
    guardarEdicion() {
        
        let form = document.getElementById('editarForm');
      // Verificar si el formulario es válido
      if (form.checkValidity()) {
      const indice = this.clientes.findIndex(c => c.id === this.clienteEdicion.id);
      if (indice !== -1) {

        this.clientes.splice(indice, 1, this.clienteEdicion);
        
        this.guardarClientes();
        const modalEl = document.getElementById('modalEdicion');
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal.hide();
      } else {
        console.error('Cliente no encontrado');
      }
    }else{
      form.reportValidity();
    }
    },
    eliminarCliente(clienteId) {
      this.clientes = this.clientes.filter(cliente => cliente.id !== clienteId);
      this.guardarClientes();
    }
  }
}).mount('#app');