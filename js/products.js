var inicio = 0; //se inicializa una variable en 0

function aumentar(){ // se crean la funcion y se agrega al evento onclick en en la etiqueta button con id aumentar

    var cantidad = document.getElementById('cantidad').value = ++inicio; //se obtiene el valor del input, y se incrementa en 1 el valor que tenga.
}

function disminuir(){ // se crean la funcion y se agrega al evento onclick en en la etiqueta button con id disminuir

    var cantidad = document.getElementById('cantidad').value = --inicio; //se obtiene el valor del input, y se decrementa en 1 el valor que tenga.
}

document.addEventListener('DOMContentLoaded', function(){
    function addProducts(){
        fetch('http://localhost:8080/products/findAll')
        .then(response => response.json())
        .then(data => {
            const productsBody = document.getElementById('products-body');
            
            data.forEach(product => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td >${product.id}</td>
                    <td >${product.nombre}</td>
                    <td >${product.precio}</td>
                    <td >${product.cantidad}</td>
                    <td><button class="btn btn-primary" onclick= "updateProduct(${product.id})">ACTUALIZAR</button> </td>
                    <td><button class="btn btn-danger" onclick= "deleteProduct(${product.id})">ELIMINAR</button></td>
                `;
                productsBody.appendChild(tr);
            });
        })
       
    }
    addProducts();
});

function deleteProduct(id){
    fetch(`http://localhost:8080/products/delete/${id}`,{
        method:'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert('Producto eliminado correctamente');
        window.location.href = '../products/listProducts.html'
    })
}

function updateProduct(id){
    window.location.href = `../products/updateProduct.html?id=${id}`;
}

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('create-product-form').addEventListener('submit', function(event){
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const precio = document.getElementById('precio').value;
        const cantidad = document.getElementById('cantidad').value;
        fetch('http://localhost:8080/products/register', {
            method: 'POST',
            headers: {
                'content-Type':'application/json'
            },
            body: JSON.stringify({nombre:nombre,precio: precio, cantidad: cantidad})
        })
        .then(response=> response.json())
        .then(data=> {
            alert('Producto creado correctamente')
            window.location.href='../products/listProducts.html'
        })
        .catch(error => console.error('Error: ', error));
    });
})


document.addEventListener('DOMContentLoaded', function(){
    const idProduct = new URLSearchParams(window.location.search).get('id');
    console.log(idProduct)
    fetch(`http://localhost:8080/products/findById/${idProduct}`)
    .then(response=> response.json())
    .then(data=>{
        document.getElementById('id').value = data.id;
        document.getElementById('nombre').value = data.nombre;
        document.getElementById('precio').value = data.precio;
        document.getElementById('cantidad').value = data.cantidad;

    })
});

document.getElementById('update-product-form').addEventListener('submit', function(event){
    event.preventDefault();
    const id = document.getElementById('id').value;
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const cantidad = document.getElementById('cantidad').value;
    fetch(`http://localhost:8080/products/update/${id}`, {
        method: 'PATCH',
        headers: {
            'content-Type':'application/json'
        },
        body: JSON.stringify({nombre:nombre, precio: precio, cantidad: cantidad})
    })
    .then(response=> response.json())
    .then(data=> {
        alert('Producto actualizado correctamente')
        window.location.href='../products/listProducts.html'
    })
})