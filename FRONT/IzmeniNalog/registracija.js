var valid_test;
const LINK = 'http://localhost';

function everything_filled(entries){
    if(entries.korisnickoIme_input.value.length == 0){
        valid_test = false;
        document.getElementById("EmptyNameWarning").classList.remove("hidden");
    } else document.getElementById("EmptyNameWarning").classList.add("hidden");

    if(entries.mail_input.value.length == 0){
        valid_test = false;
        document.getElementById("EmptyMailWarning").classList.remove("hidden");
    } else document.getElementById("EmptyMailWarning").classList.add("hidden");

    
}

function regex_valid_name(entries){
    var pattern = /^[A-Za-z0-9]{1,30}$/;
    var tekst = entries.korisnickoIme_input.value;
    var test = tekst.match(pattern);

    if (test == null) {
        document.getElementById("ErrorNameWarning").classList.remove("hidden");
        valid_test = false;
    } else{
      console.log("validirano korisnicko ime korisnika...");
      document.getElementById("ErrorNameWarning").classList.add("hidden");
    }
}
function regex_valid_ime(entries){
    var pattern = /^[A-Za-z0-9 ]{1,100}$/;
    var tekst = entries.ime_input.value;
    var test = tekst.match(pattern);
    
    if (test==null){
        document.getElementById("ErrorImeWarning").classList.remove("hidden");
        valid_test = false;
    } else{
        console.log("validirano ime korisnika...");
        document.getElementById("ErrorImeWarning").classList.add("hidden");
    }
}

function regex_valid_mail(entries){
    var pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var tekst = entries.mail_input.value;
    var test = tekst.match(pattern);

    if (test == null) {
        document.getElementById("ErrorMailWarning").classList.remove("hidden");
        valid_test = false;
    } else{
      console.log("validiran email korisnika...");
      document.getElementById("ErrorMailWarning").classList.add("hidden");
    }
}

function regex_valid_pass_OLD(entries){
    var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    var tekst = entries.pass_input_OLD.value;
    var test = tekst.match(pattern);
 
    if (test == null) {
         document.getElementById("ErrorPassWarning").classList.remove("hidden");
         valid_test = false;
     } else{
       console.log("validirana lozinka korisnika...");
       document.getElementById("ErrorPassWarning").classList.add("hidden");
     }
 }

function regex_valid_pass(entries){
   var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
   var tekst = entries.pass_input.value;
   var test = tekst.match(pattern);

   if (test == null) {
        document.getElementById("ErrorPassWarning").classList.remove("hidden");
        valid_test = false;
    } else{
      console.log("validirana lozinka korisnika...");
      document.getElementById("ErrorPassWarning").classList.add("hidden");
    }
}

function regex_valid_repeat(entries){
    var password = entries.pass_input.value;
    var repeatPass = entries.pass_repeat.value;
    if(password != repeatPass){
        valid_test = false;
        document.getElementById("ErrorRepeatWarning").classList.remove("hidden");
    } else{
        console.log("validirana ponovljena lozinka korisnika...");
        document.getElementById("ErrorRepeatWarning").classList.add("hidden");
    }
}

////
async function ValidirajRegister(){
    valid_test = true;
    var entries = document.getElementById("forma");
    regex_valid_ime(entries);
    everything_filled(entries);
    regex_valid_name(entries);
    regex_valid_mail(entries)
    // regex_valid_pass(entries);
    // regex_valid_repeat(entries);
    
    

    if(valid_test != true){
        console.log("Korisnik se ne registruje")
    }else{
        let imeIprezime = entries.ime_input.value;
        let username = entries.korisnickoIme_input.value;
        let mail = entries.mail_input.value;

        let ispis = await axios.put(LINK+'/api/user',{
            id:localStorage.getItem("key"),
            ime:imeIprezime,
            prezime:"",
            username:username,
            mail:mail
        });


        console.log(ispis);
        if(ispis.data.uspesnost)
        {
            console.log("Korisnik se registruje");
           
            location.href="../pocetna/pocetna.html"
        }

        
    }
}

function everything_filled1(entries){

    if(entries.pass_input_OLD.value.length == 0){
        valid_test = false;
        document.getElementById("EmptyMailWarning").classList.remove("hidden");
    } else document.getElementById("ErrorOldPassWarning").classList.add("hidden");

    if(entries.pass_input.value.length == 0){
        valid_test = false;
        document.getElementById("EmptyOldPassWarning").classList.remove("hidden");
    } else document.getElementById("EmptyPassWarning").classList.add("hidden");

    if(entries.pass_repeat.value.length == 0){
        valid_test = false;
        document.getElementById("EmptyRepeatWarning").classList.remove("hidden");
    } else document.getElementById("EmptyRepeatWarning").classList.add("hidden");
}

async function ValidirajRegister1(){
    valid_test = true;
    var entries = document.getElementById("forma");
    everything_filled1(entries);
    regex_valid_pass_OLD(entries);
    regex_valid_pass(entries);
    regex_valid_repeat(entries);
    
    

    if(valid_test != true){
        console.log("Korisnik se ne registruje")
    }else{
        let oldPass = entries.pass_input_OLD.value;
        let password = entries.pass_input.value;

        let ispis = await axios.put(LINK+'/api/user/changePassword',{
            id:localStorage.getItem("key"),
            noviPassword:password,
            stariPassword:oldPass
        });


        console.log(ispis);
        if(ispis.data.uspesnost)
        {
            location.href="../pocetna/pocetna.html"
        }

        
    }
}


async function popuni()
{
    id = localStorage.getItem("key");

    let user = (await axios.post(LINK+'/api/user/get',{
        id:id,
    })).data.user;
    

    document.getElementById("ime_input").value=user.ime;
    document.getElementById("korisnickoIme_input").value=user.username;
    document.getElementById("mail_input").value=user.mail;
}