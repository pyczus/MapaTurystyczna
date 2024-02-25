const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('routes.db');

const fs = require('fs')

var lines = "drawPolylines = function(map) {\n";

db.all("SELECT * FROM trasa INNER JOIN type ON trasa.typ=type.id", function(_, rows) {
    rows.forEach(function (row) {
        lines += "\tmap.addPolyline('" + row.polyline.replace(/\\/g, '\\\\') + "', '" + row.color + "', '" + row.opis + "', " + (row.typ=="piesza" ? "true" : "false") + ");\n"
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
