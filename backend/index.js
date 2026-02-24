import express from "express"
import cors from "cors"

const app = express()

// database connection moved to separate module for security
import db from "./dbConnection.js";

app.use(cors())
app.use(express.json())

app.get("/cars", (req,res)=>{
    const q = "SELECT * FROM cars"
    db.query(q,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post("/cars" , (req,res) =>{
    const q = "INSERT INTO cars (`model`,`brand`,`color`,`year`,`diecastBrand`,`collection`,`condition`,`img`,`edition`) VALUES (?)"
    const values = [
        req.body.model,
        req.body.brand,
        req.body.color,
        req.body.year,
        req.body.diecastBrand,
        req.body.collection,
        req.body.condition,
        req.body.img,
        req.body.edition
    ];

    db.query(q,[values], (err,data)=>{
        if(err) return res.json(err);
        return res.json("car has been inserted successfully");
    })
})

// Rota para deletar um carro pelo ID
app.delete("/cars/:id", (req, res) => {
    const carId = req.params.id;
    const q = "DELETE FROM cars WHERE idcars = ?";

    db.query(q, [carId], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows === 0) return res.status(404).json("Carro não encontrado");
        return res.status(200).json("Carro removido com sucesso");
    });
});

// Nova rota para atualizar um carro pelo ID
app.put("/cars/:id", (req, res) => {
    const carId = req.params.id;
    const q = "UPDATE cars SET `model` = ?, `brand` = ?, `color` = ?, `year` = ?, `diecastBrand` = ?, `collection` = ?, `condition` = ?, `img` = ?, `edition` = ? WHERE idcars = ?";

    const values = [
        req.body.model,
        req.body.brand,
        req.body.color,
        req.body.year,
        req.body.diecastBrand,
        req.body.collection,
        req.body.condition,
        req.body.img,
        req.body.edition,
        carId
    ];

    db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows === 0) return res.status(404).json("Carro não encontrado");
        return res.status(200).json("Carro atualizado com sucesso");
    });
});

// Rota para buscar um carro específico por ID
app.get("/cars/:id", (req, res) => {
    const carId = req.params.id;
    const q = "SELECT * FROM cars WHERE idcars = ?";

    db.query(q, [carId], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("Carro não encontrado");
        return res.json(data[0]);
    });
});

const PORT = process.env.PORT || 8800;
app.listen(PORT, ()=>{ //apenas para saber se o servidor esta UP!
    console.log(`welcome to backend on port ${PORT}`)
})