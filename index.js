const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('routes.db');

const fs = require('fs')

var lines = "drawPolylines = function(map) {\n";

db.all("SELECT * FROM trasa", function(_, rows) {
    rows.forEach(function (row) {
        lines += "\tmap.addPolyline('" + row.polyline + "', '" + row.color + "', '" + row.opis + "');\n"
    });
    lines += "}\n";

    fs.writeFile('routes.js', lines,  function(err) {
        if (err) {
            return console.error(err);
        }
        console.log('Script finished succesfully.');
    });
    
});
db.close();
