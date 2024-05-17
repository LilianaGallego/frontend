function login(){
  const email = document.getElementById("emailLogin").value;
  const password = document.getElementById("passwordLogin").value;

  if(email=="admin@gmail.com" && password=="123456"){
    window.location.href='../login/homeUser.html'
  }else{
    alert("Datos incorrectos");
  }
}

document.addEventListener('DOMContentLoaded', function(){
  function addUsers(){
      fetch('http://localhost:8080/users/findAll')
      .then(response => response.json())
      .then(data => {
          const usersBody = document.getElementById('users-body');
          console.log(data)
          data.forEach(user => {
              const tr = document.createElement('tr');
              tr.innerHTML = `
                  <td >${user.id}</td>
                  <td >${user.nombres}</td>
                  <td >${user.apellidos}</td>
                  <td >${user.ciudad}</td>
                  <td >${user.direccion}</td>
                  <td >${user.correo}</td>
                  <td >${user.telefono}</td>
                  <td >${user.contraseña}</td>
                  <td >${user.terminos ? "Si": "no"}</td>
                  <td><button class="btn btn-primary" onclick= "updateUser(${user.id})">ACTUALIZAR</button> </td>
                  <td><button class="btn btn-danger" onclick= "deleteUser(${user.id})">ELIMINAR</button></td>
              `;
              usersBody.appendChild(tr);
          });
      })
     
  }
  addUsers();
});

function deleteUser(id){
  fetch(`http://localhost:8080/users/delete/${id}`,{
      method:'DELETE'
  })
  .then(response => response.json())
  .then(data => {
      alert('Usuario eliminado correctamente');
      window.location.href = '../login/homeUser.html'
  })
}

function updateUser(id){
  window.location.href = `../users/updateUser.html?id=${id}`;
}

document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('create-user-form').addEventListener('submit', function(event){
      event.preventDefault();
      const nombres = document.getElementById('nombres').value;
      const apellidos = document.getElementById('apellidos').value;
      const ciudad = document.getElementById('ciudad').value;
      const direccion = document.getElementById('direccion').value;
      const correo = document.getElementById('correo').value;
      const telefono = document.getElementById('celular').value;
      const contraseña = document.getElementById('contraseña').value;
      const terminos = document.getElementById('terminos').checked ;
      fetch('http://localhost:8080/users/register', {
          method: 'POST',
          headers: {
              'content-Type':'application/json'
          },
          body: JSON.stringify({nombres:nombres,apellidos: apellidos, ciudad: ciudad, direccion: direccion, 
            correo: correo, telefono: telefono, contraseña: contraseña, terminos: terminos })
      })
      .then(response=> response.json())
      .then(data=> {
          alert('Usuario registrado correctamente')
          window.location.href='../login/homeUser.html'
      })
      .catch(error => console.error('Error: ', error));
  });
})

document.addEventListener('DOMContentLoaded', function(){
  const idUser = new URLSearchParams(window.location.search).get('id');
  console.log(idUser)
  fetch(`http://localhost:8080/users/findById/${idUser}`)
  .then(response=> response.json())
  .then(data=>{
      document.getElementById('id').value = data.id;
      document.getElementById('nombres').value = data.nombres;
      document.getElementById('apellidos').value = data.apellidos;
      document.getElementById('ciudad').value = data.ciudad;
      document.getElementById('direccion').value = data.direccion;
      document.getElementById('correo').value = data.correo;
      document.getElementById('celular').value = data.telefono ;
      document.getElementById('contraseña').value = data.contraseña;
      document.getElementById('terminos').checked = data.terminos;

  })
});

document.getElementById('update-user-form').addEventListener('submit', function(event){
  event.preventDefault();
  const id = document.getElementById('id').value;
  const nombres = document.getElementById('nombres').value;
  const apellidos = document.getElementById('apellidos').value;
  const ciudad = document.getElementById('ciudad').value;
  const direccion = document.getElementById('direccion').value;
  const correo = document.getElementById('correo').value;
  const telefono = document.getElementById('celular').value;
  const contraseña = document.getElementById('contraseña').value;
  const terminos = document.getElementById('terminos').checked;
  fetch(`http://localhost:8080/users/update/${id}`, {
      method: 'PATCH',
      headers: {
          'content-Type':'application/json'
      },
      body: JSON.stringify({nombres:nombres,apellidos: apellidos, ciudad: ciudad, direccion: direccion, 
        correo: correo, telefono: telefono, contraseña: contraseña, terminos: terminos })
  })
  .then(response=> response.json())
  .then(data=> {
      alert('Usuario actualizado correctamente')
      window.location.href='../login/homeUser.html'
  })
})

