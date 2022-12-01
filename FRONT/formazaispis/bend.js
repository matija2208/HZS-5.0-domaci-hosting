const LINK = 'http://localhost'

async function loadData()
{
    let id = (window.location.href).split('?')[1];

    let pin = (await axios.get(LINK+'/api/pin/'+id)).data.pin;


    document.getElementById("slika").innerHTML=`<img src="${pin.BAND.slika}" width="100%">`;
    document.getElementById("imeBenda").innerHTML = pin.BAND.ime;
    document.getElementById("opisBenda").innerHTML = pin.BAND.opis;
    document.getElementById("zanrBenda").innerHTML = pin.BAND.zanr;
    document.getElementById("telefon").innerHTML = `tel: ${pin.BAND.kontakt.telefon}`;
    document.getElementById("mail").innerHTML = `mail: ${pin.BAND.kontakt.mail}`;

    let div=``;

    for(let i=0;i<pin.BAND.clanovi.length;i++)
    {
        div+=pin.BAND.clanovi[i];
        if(i!==pin.BAND.clanovi.length-1)
        {
            div+=', ';
        }
    }

    document.getElementById("clanovi").innerHTML=div;
}

loadData();