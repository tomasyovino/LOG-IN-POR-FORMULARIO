const express = require('express');
const handlebars = require('express-handlebars');
const { router } = require("./src/routes/router.js");

const app = express();

app.use('/api', router);

app.engine(
    "hbs",
    handlebars.engine({
        extname: "hbs",
        defaultLayout: "index.hbs",
        layoutsDir: __dirname + "/src/views/layouts",
        partialsDir: __dirname + "src/views/partials",
    }),
);

app.set("view engine", "hbs");
app.set("views", "./src/views")

app.listen(8080, () => {
    console.log("Server ON");
});