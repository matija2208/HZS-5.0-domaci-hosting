const LINK = 'http://localhost'

async function loadData()
{
    let id = (window.location.href).split('?')[1];

    let pin = (await axios.get(LINK+'/api/pin/'+id)).data.pin;


    document.getElementById("slika").innerHTML=`<img src="${pin.KONCERT.slika}" width="100%">`;
    document.getElementById("naziv").innerHTML = pin.KONCERT.naziv;
    document.getElementById("opis").innerHTML = pin.KONCERT.opis;
    document.getElementById("vreme").innerHTML = pin.KONCERT.kontakt.vreme;
    document.getElementById("cena").innerHTML = ' '+pin.KONCERT.cena + ' din';
    document.getElementById("telefon").innerHTML = `tel: ${pin.KONCERT.kontakt.telefon}`;
    document.getElementById("mail").innerHTML = `mail: ${pin.KONCERT.kontakt.mail}`;

    let div=``;

    for(let i=0;i<pin.KONCERT.bendovi.length;i++)
    {
        div+=pin.KONCERT.bendovi[i];
        if(i!==pin.KONCERT.bendovi.length-1)
        {
            div+=', ';
        }
    }

    document.getElementById("bendovi").innerHTML=div;
}

loadData();