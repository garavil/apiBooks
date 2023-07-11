const {Router} = require("express")
const ruta = Router();
const userCtrl = require("../controller/user.controller")

ruta.post('/register', userCtrl.postUser)
ruta.post('/login', userCtrl.postLogin)
ruta.get("/books", userCtrl.getBook)
ruta.post("/books", userCtrl.postBook)
ruta.put("/books", userCtrl.putBook)
ruta.delete("/books", userCtrl.delBook)


module.exports = ruta;