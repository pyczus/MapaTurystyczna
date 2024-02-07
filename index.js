const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('routes.db');

const fs = require('fs')

db.serialize(() => {
	console.log('Script started...');
	var lines = ''
    db.each("SELECT 'AddPolyline(''' ||  polyline || ''',''' || color || ''',''' || opis || ''')'  as line FROM trasa", (err, row) => {
        lines += row.line + '\n'
    });

	fs.writeFile('routes.js', lines,  function(err) {
            if (err) {
                return console.error(err);
            }
            console.log('Script finished succesfully.');
        });
	
});

db.close();
