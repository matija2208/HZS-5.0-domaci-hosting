const ex = require("express");
const cors = require("cors");

const app = ex();
const PORT = 8080;

const baza=require("./BAZA/baza");

const user = require("./FUNCTIONS/user");
const pin = require("./FUNCTIONS/pin");
const music = require("./FUNCTIONS/music");
const file = require("./FUNCTIONS/file");
//const komentar = require("./FUNCTIONS/komentar");

app.use(ex.json());
app.use(cors());



app.listen(PORT, function(){
    console.log("Server slusa na portu: "+PORT);
})

baza();
app.use(ex.static('/home/matijacetrovic/HZS-5.0-domaci-hosting/BACK/FILES/'));
app.get("/",file.getPocetna);
app.get("/:name",file.get);

app.get("/api/users",user.get);

app.post("/api/user/get", user.getOne);

app.post("/api/user",user.post);

app.delete("/api/users",user.del);

app.post("/api/user/delOne", user.delOne);

app.put("/api/user/", user.put);

app.post("/api/user/login", user.login);

app.put("/api/user/changePassword", user.updatePassword);


app.get("/api/pin",pin.get);

app.get("/api/pin/:id", pin.getOne);

app.post("/api/pin",pin.post);

app.delete("/api/pin",pin.del);

app.delete("/api/pin/:id", pin.delOne);

app.put("/api/pin/:id", pin.put);


app.get("/api/music/:name", music.getSong);

app.get("/api/music", music.getList);

app.post("/api/music/", music.post);

app.delete("/api/music/:id", music.delOne);

// app.post("/api/komentar",komentar.post);

// app.get("/api/komentar",komentar.get);

// app.delete("/api/komentar", komentar.del);