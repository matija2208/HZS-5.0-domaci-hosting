const mg = require("mongoose");

const kontaktStruct = new mg.Schema({
    telefon:{
        type:String,
        trim:true,
        require:true
    },
    adresa:{
        type:String,
        trim:true,
    },
    mail:{
        type:String,
        trim:true,
        require:true
    }
});

const bandStruct = new mg.Schema({
    ime:{
        type:String,
        trim:true,
        require:true
    },
    zanr:{
        type:String,
        trim:true,
        require:true
    },
    clanovi:[
        {
            type:String,
            trim:true,
            require:true
        }
    ],
    opis:{
        type:String,
        trim:true,
        require:true
    },
    kontakt:{
        type:kontaktStruct,
        require:true
    },
    slika:{
        type:String,
        trim:true,
        require:true
    },
    korisnik:{
        type:String,
        trim:true,
        require:true
    }
});

module.exports = bandStruct;