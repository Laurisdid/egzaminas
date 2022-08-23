const express = require("express");
const app = express();
const port = 3003;
const cors = require("cors");
app.use(express.json({ limit: '10mb' }));
app.use(cors());
const mysql = require("mysql");
const md5 = require('js-md5');
const uuid = require('uuid');

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "egzam",
});

// AUTH
app.get("/login-check", (req, res) => {
    let sql;
    let requests;
    if (req.query.role === 'admin') {
        sql = `
        SELECT
        name
        FROM users
        WHERE session = ? AND role = ?
        `;
        requests = [req.headers['authorization'] || '', req.query.role];
    } else {
        sql = `
        SELECT
        name
        FROM users
        WHERE session = ?
        `;
        requests = [req.headers['authorization'] || ''];
    }
    con.query(sql, requests, (err, result) => {
        if (err) throw err;
        if (!result.length) {
            res.send({ msg: 'error' });
        } else {
            res.send({ msg: 'ok' });
        }
    });
});


app.post("/login", (req, res) => {
    const key = uuid.v4();
    const sql = `
    UPDATE users
    SET session = ?
    WHERE name = ? AND pass = ?
  `;
    con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
        if (err) throw err;
        if (!result.affectedRows) {
            res.send({ msg: 'error', key: '' });
        } else {
            res.send({ msg: 'ok', key });
        }
    });
});

// Project
app.post("/meister", (req, res) => {
    const sql = `
    INSERT INTO meister
    (meistras, vardas, pavarde,spec,servisas,miestas, photo)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    con.query(sql, [req.body.meistras, req.body.vardas, req.body.pavarde,req.body.spec, req.body.servisas, req.body.miestas, req.body.photo], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, created', type: 'success' } });
    });
});

app.get("/meister", (req, res) => {
    const sql = `
  SELECT * FROM meister
`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.delete("/meister/:id", (req, res) => {
    const sql = `
    DELETE FROM meister
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, Product gone', type: 'success' } });
    });
});


// app.put("/meister/rate/", (req, res) => {
//     console.log(req.body.sum);
//     const selectQuerry = `
    
//     SELECT sum
//     FROM rate   
//     WHERE id = ?
//     `
//     con.query(selectQuerry, [req.body.id], (err, result) => {
//         if (err) throw err;
//         console.log(result);
//         const sql =
//             `
//     UPDATE rate
//     SET sum = ${parseInt(result[0].sum)+ parseInt(req.body.sum)} 
//     WHERE id = ?
//     `;
//         con.query(sql, [req.body.id], (err, result) => {
//             if (err) throw err;
//             res.send({ result, msg: { text: 'OK', type: 'success' } });
//         });
//     });
// });
app.put("/rate/", (req, res) => {
    console.log(req.body.id,req.body.sum);
    const sql = `
    INSERT INTO rate
    (sum, target)
    VALUES (?, ?)
    `;
    con.query(sql, [req.body.sum, req.body.id], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, created', type: 'success' } });
    });
});

app.delete("/photos/:id", (req, res) => {
    const sql = `
    UPDATE meister
    SET photo = null
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'Ok', type: 'success' } });
    });
});


app.listen(port, () => {
    console.log(`Porto Nr ${port}`);
});