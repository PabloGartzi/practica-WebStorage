/*VARIABLES*/

/** 
* Seleccionar los elementos del DOM que quiero modificar
*/
const miFormulario = document.querySelector('#miFormulario');
const divTabla = document.querySelector("#tablaProductos");

/* EVENTOS */
/**
 * poner a la escucha al formulario, cuando pulse submit se debe ejecutar: la funcion validar y la funcion agregar producto a la tabla
 */
miFormulario.addEventListener('submit', (ev) => {
    ev.preventDefault();
    validarFormularioIntroducir();
    //agregarProducto();
});


/**
 * ev.target.matches comprueba si el elemento sobre el que hace clic es un boton
 * si se cumple, invoca la funcion encargada de eliminar producto
 * La funcion tiene como argumento el elemento clicado = el boton. Como el id de boton = id producto, ya sabe que producto debe eliminar
 */
divTabla.addEventListener('click', (ev) => {
    if (ev.target.matches("button")) {
        //console.log("entra");
        //console.log(ev.target);
        eliminarProducto(ev.target);
    }
});


/* FUNCIONES */

/**
 * valida el producto que introducimos en el formulario 
 * comprueba que no tenga números ni caracteres especiales, solo puede tener letras y espacios
 * si es válido envia el formulario
 */
const validarFormularioIntroducir = () => {
    let valido = true;
    const producto = miFormulario.producto.value

    let regExp = /^[a-zA-Z ]+$/;
    if (!regExp.test(producto)) {
        alert("Por favor, ingresa un producto que no tenga caracteres especiales ni números.");
        valido = false;
    }

    if (valido) {
        //miFormulario.submit();
        agregarProducto();
    }
}

/**
 * Esta constante agrega un nuevo producto a local Storage
 * Si el producto ya existe aumenta su stock en 1
 * Si no existe lo añade con stock inicial = 1
 */
const agregarProducto = () => {
    const nuevoProducto = miFormulario.producto.value.trim().toLowerCase(); //eliminamos espacios al inicio y al final y convertimos a minusculas
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
    eliminarElemento(divTabla);
    pintarTabla();
}

/**
 * Esta funcion genera una tabla en el DOM con los productos almacenados en local storage
 * En cada fila de la tabla ponemos el nombre del producto, cantidad y un boton para eliminar
 */
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
        boton.classList.add("estiloBotones");
        celdaProducto.textContent = element.nombre;
        celdaStock.textContent = element.stock;
        fila.append(celdaProducto, celdaStock, boton);
        tabla.append(fila);
    });
    divTabla.append(tabla);
}

/**
 * Esta funcion reduce el número de stock de un producto en la lista de objetos guardados en localStorage
 * si el numero de stcock es mayor que 1, resta uno
 * si el número de stock es 1 lo elimina del almacenamiento
 * @param {object} botonEliminar 
 */
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
/**
 * Dado un elemento del HTML lo elimina
 * @param {HTMLObjectElement} elemento 
 */
const eliminarElemento = (elemento) => {
    elemento.innerHTML = "";
}

// INVOCAIONES 

pintarTabla();






