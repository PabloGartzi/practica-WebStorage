const miFormulario = document.querySelector('#miFormulario');

const divTabla = document.querySelector("#tablaProductos");


/* EVENTOS */
miFormulario.addEventListener('submit', (ev) => {
    ev.preventDefault();
    validarFormularioIntroducir();
    agregarProducto();
});

divTabla.addEventListener('click', (ev) => {
    if (ev.target.matches("button")) {
        //console.log("entra");
        //console.log(ev.target);
        eliminarProducto(ev.target);
    }

});



/* FUNCIONES */

const validarFormularioIntroducir = () => {
    let valido = true;
    const producto = miFormulario.producto.value

    let regExp = /^[a-zA-Z ]+$/;
    if (!regExp.test(producto)) {
        alert("Por favor, ingresa un producto que no tenga caracteres especiales ni números.");
        valido = false;
    }

    if (valido) {
        miFormulario.submit();
    }
}

const agregarProducto = () => {
    const nuevoProducto = miFormulario.producto.value.trim().toLowerCase(); //eliminamos espacios al inicio y al final y convertimos a letra pequeña
    // Devolvemos la lista de productos o la lista vacia (si no hay productos)
    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    const existeProducto = productos.findIndex(elem => elem.nombre == nuevoProducto);

    if (existeProducto >= 0) {
        productos[existeProducto].stock += 1;
    }
    else {
        const producto = {
            nombre: nuevoProducto,
            stock: 1,
        };
        productos.push(producto);
    }
    localStorage.setItem("productos", JSON.stringify(productos));
}

const pintarTabla = () => {
    const tabla = document.createElement("TABLE");
    const cabeceraTabla = document.createElement("TR");
    const tituloProducto = document.createElement("TH");
    const tituloStock = document.createElement("TH");
    
    tituloProducto.textContent = "Producto";
    tituloStock.textContent = "Cantidad";
    
    cabeceraTabla.append(tituloProducto, tituloStock);
    
    tabla.append(cabeceraTabla);
    
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    productos.forEach(element => {
        const fila = document.createElement("TR");
        const celdaProducto = document.createElement("TD");
        const celdaStock = document.createElement("TD");
        const boton = document.createElement("BUTTON");
        boton.textContent = "Eliminar";
        boton.id = element.nombre;
        celdaProducto.textContent = element.nombre;
        celdaStock.textContent = element.stock;
        fila.append(celdaProducto, celdaStock, boton);
        tabla.append(fila);
    });
    divTabla.append(tabla);
}




const eliminarProducto = (botonEliminar) => {
    const nombreProducto = botonEliminar.id;
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    const producto = productos.find(elem => elem.nombre == nombreProducto);
    const indiceDeLista = productos.indexOf(producto)
    if (producto.stock > 1) {
        productos[indiceDeLista].stock -= 1;
    } else {
        productos.splice(indiceDeLista, 1);
    }
    localStorage.setItem("productos", JSON.stringify(productos));
    eliminarElemento(divTabla);
    pintarTabla();
}

const eliminarElemento = (elemento) => {
    elemento.innerHTML = "";
}


// INVOCAIONES 

pintarTabla();






