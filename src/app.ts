import { writeFileSync } from 'fs';
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { DbRow } from './Interfaces/DbRow';


(async () => {
    const db = await open({
      filename: './routes.db',
      driver: sqlite3.Database
    })

    const result = await db.all<DbRow[]>("SELECT 'AddPolyline(''' ||  polyline || ''',''' || color || ''',''' || opis || ''')'  as line FROM trasa");

    var lines = result
        .map(m=> m.line)
        .filter(f=> f != null)
        .join('\n');
    
    writeFileSync("test.js", lines);
})()

