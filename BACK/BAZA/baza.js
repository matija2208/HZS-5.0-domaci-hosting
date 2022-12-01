const mg = require("mongoose");

async function connect()
{
    try
    {
        const link = "mongodb+srv://Cirko:CirkoBreGluvacuJedan@cluster0.vhbul.mongodb.net/Cirkovic?retryWrites=true&w=majority";

        const connection = await mg.connect(link);
        console.log("Baza uspesna");
    }
    catch(err)
    {
        console.log(`Jebise konju: ${err.message}`);
    }
}

module.exports = connect;