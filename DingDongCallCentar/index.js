firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";



    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;


    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
 
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}


function logout(){
  firebase.auth().signOut();
}


 function create_unfinished_task(){
   unfinished_task_container = document.getElementsByClassName("container")[0];
   unfinished_task_container.innerHTML = "";

   task_array = [];
   firebase.database().ref("Porudzbina").once('value', function(snapshot) {
     snapshot.forEach(function(childSnapshot) {
       var childKey = childSnapshot.key;
       var childData = childSnapshot.val();
       task_array.push(Object.values(childData));
     });
     for(var i, i = task_array.length-1; i >=0; i--){
       task_ulica = task_array[i][0];
       task_broj= task_array[i][1];
       task_brojtelefon = task_array[i][2];
       task_ime=task_array[i][3];
       task_interfon=task_array[i][4];
       task_key=task_array[i][5];
       task_korisnik=task_array[i][6];
       task_napomena=task_array[i][7];
       task_naselje=task_array[i][8];
       task_sprat=task_array[i][9];
       task_stan=task_array[i][10];
       task_vreme=task_array[i][11];
       task_vremeporudzbine=task_array[i][12];


       task_container = document.createElement("div");
       task_container.setAttribute("class", "task_container");
       task_container.setAttribute("data-key", task_key);

       // TASK DATA
       task_data = document.createElement('div');
       task_data.setAttribute('id', 'task_data');

       ime = document.createElement('div');
       ime.setAttribute('id', 'task_ime');
       ime.setAttribute('contenteditable', false);
       ime.innerHTML = task_ime;

       broj = document.createElement('div');
       broj.setAttribute('id', 'task_broj');
       broj.setAttribute('contenteditable', false);
       broj.innerHTML = task_broj;

       brojtelefona = document.createElement('div');
       brojtelefona.setAttribute('id', 'task_brojtelefon');
       brojtelefona.setAttribute('contenteditable', false);
       brojtelefona.innerHTML = task_brojtelefon;

       ulica = document.createElement('div');
       ulica.setAttribute('id', 'task_ulica');
       ulica.setAttribute('contenteditable', false);
       ulica.innerHTML = task_ulica;

       naselje = document.createElement('div');
       naselje.setAttribute('id', 'task_naselje');
       naselje.setAttribute('contenteditable', false);
       naselje.innerHTML =task_naselje;

       korisnik = document.createElement('div');
       korisnik.setAttribute('id', 'task_korisnik');
       korisnik.setAttribute('contenteditable', false);
       korisnik.innerHTML =task_korisnik;

       sprat = document.createElement('div');
       sprat.setAttribute('id', 'task_sprat');
       sprat.setAttribute('contenteditable', false);
       sprat.innerHTML = task_sprat;

       stan = document.createElement('div');
       stan.setAttribute('id', 'task_stan');
       stan.setAttribute('contenteditable', false);
       stan.innerHTML =task_stan;

       interfon = document.createElement('div');
       interfon.setAttribute('id', 'task_interfon');
       interfon.setAttribute('contenteditable', false);
       interfon.innerHTML = task_interfon;

       napomena = document.createElement('div');
       napomena.setAttribute('id', 'task_napomena');
       napomena.setAttribute('contenteditable', false);
       napomena.innerHTML =task_napomena;

       vreme = document.createElement('div');
       vreme.setAttribute('id', 'task_vreme');
       vreme.setAttribute('contenteditable', false);
       vreme.innerHTML = task_vreme;

       vremeporudzbine = document.createElement('div');
       vremeporudzbine.setAttribute('id', 'task_vremeporudzbine');
       vremeporudzbine.setAttribute('contenteditable', false);
       vremeporudzbine.innerHTML = task_vremeporudzbine;
       // TASK TOOLS
       task_tool = document.createElement('div');
       task_tool.setAttribute('id', 'task_tool');

       task_done_button = document.createElement('button');
       task_done_button.setAttribute('id', 'task_done_button');
       task_done_button.setAttribute('onclick', "task_done(this.parentElement.parentElement, this.parentElement)");
       fa_done = document.createElement('i');
       fa_done.setAttribute('class', 'fa fa-check');





       unfinished_task_container.append(task_container);
       task_container.append(task_data);
       task_data.append(ime);
       task_data.append(ulica);
       task_data.append(brojtelefona);
       task_data.append(broj);
       task_data.append(korisnik);
       task_data.append(naselje);
       task_data.append(sprat);
       task_data.append(stan);
       task_data.append(interfon);
       task_data.append(napomena);
       task_data.append(vreme);
      task_data.append(vremeporudzbine);
       task_container.append(task_tool);
       task_tool.append(task_done_button);
       task_done_button.append(fa_done);





     }

   });

 }

 function task_done(task, task_tool){
   finished_task_container = document.getElementsByClassName("container")[1];
   finished_task_container.append(task);

   var key = task.getAttribute("data-key");
   var task_obj = {
     ime:task.childNodes[0].childNodes[0].innerHTML,
     adresa: task.childNodes[0].childNodes[1].innerHTML,
     broj: task.childNodes[0].childNodes[2].innerHTML,
     brojtelefona: task.childNodes[0].childNodes[3].innerHTML,
     naselje:task.childNodes[0].childNodes[4].innerHTML,
     sprat:task.childNodes[0].childNodes[5].innerHTML,
     korisnik: task.childNodes[0].childNodes[6].innerHTML,
     stan:task.childNodes[0].childNodes[7].innerHTML,
     interfon:task.childNodes[0].childNodes[8].innerHTML,
     napomena:task.childNodes[0].childNodes[9].innerHTML,
     vreme:task.childNodes[0].childNodes[10].innerHTML,
     vremeporudzbine:task.childNodes[0].childNodes[11].innerHTML,
     key:key
   };
   var updates = {};
   var vozac;

   var x = document.getElementById("lista").value;
   vozac=x;


   updates["/"+vozac+"/" + key] = task_obj;
   firebase.database().ref().update(updates);
   create_unfinished_task();

}

let button=document.getElementById("button");
var i=2;
button.addEventListener("click",function(){

  let broj=document.getElementById("broj").value;

  let ime=document.getElementById("ime").value;

  let brojtelefona=document.getElementById("brojtelefona").value;

  let naselje=document.getElementById("naselje").value;

  let adresa=document.getElementById("ulica").value;

  let sprat=document.getElementById("sprat").value;

  let stan=document.getElementById("stan").value;

  let interfon=document.getElementById("interfon").value;

  let napomena=document.getElementById("napomena").value;

  let vreme=document.getElementById("vreme").value;

  let korisnik=document.getElementById("korisnik").value;

  var d = new Date();
  var sati = d.getHours();
  var minuti=d.getMinutes();
  var sekunde=d.getSeconds();
  let vremeporudzbine=sati+":"+minuti+":"+sekunde;



  if (brojtelefona==""||ulica=="") {
    alert("Please enter the fields");

  }
  else {
    var key = firebase.database().ref().child("Porudzbina").push().key;
    var data={
      broj: broj,
      ime: "Ime ili prezime:"+ime,
      brojtelefona:"Broj telefona:"+brojtelefona,
      naselje: "Naselje:"+naselje,
      adresa: "Ulica:"+adresa,
      sprat:"Sprat:"+sprat,
      stan: "Stan:"+stan,
      interfon: "Interfon:"+interfon,
      napomena:"Napomena:"+napomena,
      vreme:"Vreme potrebno da porudzbina stigne:"+vreme,
      korisnik:"Korisnik:"+korisnik,
      vremeporudzbine:"Vreme narucivanja:"+vremeporudzbine,
      key:key
    };
    var updates = {};
    updates["/Porudzbina/" + key] = data;
    firebase.database().ref().update(updates);

    var updates1 = {};

    var vozac;

    var x = document.getElementById("lista1").value;
    vozac=x;


    updates1["/"+vozac+"/"+key] = data;
    firebase.database().ref().update(updates1);

    create_unfinished_task();

    document.getElementById("broj").value = "Broj Porudzbine:"+i;
    document.getElementById("ime").value = "";
    document.getElementById("brojtelefona").value = "";
    document.getElementById("naselje").value = "";
    document.getElementById("ulica").value = "";
    document.getElementById("sprat").value = "";
    document.getElementById("stan").value = "";
    document.getElementById("interfon").value = "";
    document.getElementById("napomena").value = "";
    document.getElementById("vreme").value = "";
    i++;


    create_unfinished_task();
  }
})

var ref = firebase.database().ref("Porudzbina");
firebase.database().ref().on('value', function(snapshot) {
  create_unfinished_task();

});

function updateDrivers(){
  task_vozaci = [];
  firebase.database().ref("Vozaci").on('value', function(snapshot1) {
    snapshot1.forEach(function(childSnapshot1) {
      var childData1 = childSnapshot1.val();
      task_vozaci.push(Object.values(childData1));
    });
    for(var i=0; i <=task_vozaci.length-1; i++){
      task_name=task_vozaci[i][0];
      task_number=task_vozaci[i][1];
       var selectElements = document.getElementsByClassName("lista");
      for (var j = 0; j < selectElements.length; j++) {
        var select = selectElements[j];
        var option = document.createElement("option");
        option.id = task_number;
        option.value = "Vozac "+task_number;
        option.text = task_name;
        select.appendChild(option);
      }
    }

  });
}

function addDrivers() {

  var jsonData = {
    "Vozaci": [
      null,
      {
        "Name": "Bojke",
        "Number": 1
      },
      {
        "Name": "Striko",
        "Number": 2
      },
      {
        "Name": "Loto",
        "Number": 3
      },
      {
        "Name": "Marko",
        "Number": 4
      },
      {
        "Name": "Novica",
        "Number": 5
      },
      {
        "Name": "Nebojsa",
        "Number": 6
      },
      {
        "Name": "Janko",
        "Number": 7
      },
      {
        "Name": "Capa",
        "Number": 8
      },
      {
        "Name": "Nenad V",
        "Number": 9
      },
      {
        "Name": "Sluzbeni 1",
        "Number": 10
      },
      {
        "Name": "Milos Brzi",
        "Number": 11
      },
      {
        "Name": "Sluzbeni 2",
        "Number": 12
      }
    ]
  };

  firebase
  .database()
  .ref("/").update(jsonData).then(function() {
    console.log("Data added successfully!");
  })
  .catch(function(error) {
    console.error("Error adding data: ", error);
  });

  updateDrivers();
}