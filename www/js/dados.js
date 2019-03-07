function obterDadosFirebase() {
  let currentUser = localStorage["username"];
  firebase
    .firestore()
    .collection("messages")
    .orderBy("created", "asc")
    .onSnapshot(querySnapshot => {
      var dados = [];
      querySnapshot.forEach(doc => dados.push(doc.data()));

      $("#messages").html(
        dados.map(
          data =>
          currentUser === data.username ?
          `<li class="message right"><b>${data.username}</b>:<br/> ${data.message}</li>`
            :`<li class="message"><b>${data.username}</b>:<br/> ${data.message}</li>`
        )
      );
    });
}

function adicionarMensagem() {
  let msg = $("#input-message").val();
  console.log(msg);
  firebase
    .firestore()
    .collection("messages")
    .add({
      message: msg,
      username: localStorage["username"],
      created: new Date().getTime()
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
      $("#input-message").val("");
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}
