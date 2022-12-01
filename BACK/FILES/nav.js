function loginbox(){
    if(document.getElementById("loginbox").getAttribute("open") == "da"){
        document.getElementById("loginbox").style.display="none";
        document.getElementById("loginbox").setAttribute('open', 'ne');
    }
    else{
        document.getElementById("loginbox").style.display="block";
        document.getElementById("loginbox").setAttribute('open', 'da');
    }
}


function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "navbar") {
      x.className += " responsive";
    } else {
      x.className = "navbar";
      if(document.getElementById("loginbox").getAttribute("open") == "da"){
        document.getElementById("loginbox").style.display="none";
        document.getElementById("loginbox").setAttribute('open', 'ne');
    }
    }
}

async function Brisi()
{
    document.getElementById("loginbox").style.display="none";
    document.getElementById("loginbox").setAttribute('open', 'ne');
    let ID = localStorage.getItem("key");

    let test = (await axios.post(LINK + '/api/user/delOne',{
        id:ID
    }));
    console.log(test);
    if(test.data.uspesnost)
    {
        localStorage.removeItem("key");
        OdjaviSe();
    }

}

function Pitaj()
{
    let div = `
                <h1 class="logboxdata">Da li ste sigurni da zelite da obrisete svoj nalog?</h1>
                
                <input class="dugme" type="button" value="NE" onclick="ifLogedIn()"/>
                <input class="dugme" style="float:right" type="button" value="DA" onclick="Brisi()"/>
            `
            document.getElementById("loginbox").innerHTML=div;
}

async function ifLogedIn()
{
    let key = localStorage.getItem("key");
    //console.log(key);
    if(key!=null)
    {
        let user = (await axios.post(LINK + '/api/user/get',{
            id:key
        })).data.user;

        //console.log(user);

        if(user != undefined)
        {
            document.getElementById("trebaMiId").innerHTML = "Moj Nalog";

            let div = `
                <h1 class="logboxdata">${user.username}</h1>
                <a class="logboxdatalink" href = "../IzmeniNalog/IzmeniNalog.html">Izmeni Nalog</a><br>
                <a class="logboxdatalink" href = "../IzmeniNalog/IzmeniPassword.html">Izmeni Password</a><br><br>
                <input class="dugme" type="button" value="ODJAVI SE" onclick="OdjaviSe()"/>
                <input class="dugme" type="button" value="OBRISI" onclick="Pitaj()"/>
            `
            document.getElementById("loginbox").innerHTML=div;
        }
    }
}

function OdjaviSe()
{
    localStorage.removeItem("key");
    document.getElementById("trebaMiId").innerHTML = "Prijavi se";

    let div = `
            <input class="polje_unos"type='text' id="korisnickoIme_input" placeholder='Korisničko ime ili email:'  /><br>
            <input class="polje_unos"type='password' id="pass_input" placeholder='Lozinka:'  /><br>
            <input class="dugme" type='button' value="PRIJAVI SE" id="registracija" onclick="Login()" />
            <a href="../Registruj se/registracija.html" class="reg-nav">Registruj se</a>
            `
    document.getElementById("loginbox").innerHTML=div;

}

async function Login()
{

    var username = document.getElementById("korisnickoIme_input").value;
    var password = document.getElementById("pass_input").value;

    let login = (await axios.post(LINK + '/api/user/login',{
        
        mail:username,
        password:password
    })).data;

    if(login.uspesnost)
    {
        localStorage.setItem("key",login.id);
        
        loginbox();
        ifLogedIn();
    }
}

ifLogedIn();