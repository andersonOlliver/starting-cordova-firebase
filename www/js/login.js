function registrar() {
  startLoading();
  let email = $("#email-cadastro").val();
  let password = $("#password-cadastro").val();

  setTimeout(() => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        localStorage.setItem("user", JSON.stringify(response.user));
        $("#email-cadastro").val("");
        $("#password-cadastro").val("");
        finishLoading();
        console.log(response);
      })
      .catch(function(error) {
        finishLoading();

        let errorCode = error.code;

        if (errorCode === "auth/invalid-email") {
          alert("Email inválido");
        } else if (errorCode === "auth/weak-password") {
          alert("Senha deverá conter no mínimo 6 caracteres");
        } else if (errorCode === "auth/email-already-in-use") {
          alert("E-mail já está sendo utilizado por outra conta");
        } else {
          console.error(error);
        }
      });
  }, 500);
}

function logar() {
  let email = $("#email-login").val();
  let password = $("#password-login").val();

  setTimeout(() => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        console.log(response);
        localStorage.setItem("user", JSON.stringify(response.user));
        $("#email-login").val("");
        $("#password-login").val("");
      })
      .catch(function(error) {
        let errorCode = error.code;

        if (errorCode === "auth/user-not-found") {
          alert("Usuário não encontrado");
        } else {
          console.error(error);
        }
      });
  }, 500);
}

function logout() {
  setTimeout(() => {
    firebase
      .auth()
      .signOut()
      .then(response => {
        console.log(response);
        localStorage.removeItem("username");
        localStorage.removeItem("user");
        $.mobile.navigate("#pg-registro");
      });
    console.log("Sair");
  }, 500);
}
