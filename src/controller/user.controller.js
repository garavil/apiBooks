const { pool } = require("../database")


const postUser = async (req, res) => { 

    const {id_user, name, last_name, email, photo, password} = req.body
    const params = [id_user, name, last_name, email, photo, password]
    let sql = "INSERT INTO user (id_user, name, last_name, email, photo, password) VALUES (?, ?, ?, ?, ?, ?)"

    try{
        const [result] = await pool.query(sql, params);
        res.send(result);
    }
    catch(err){
        res.send(err)
    }
}

const postLogin = async (req, res) =>{

    const {email,password} = req.body;
    const params = [email,password];
    let sql = `SELECT id_user,name,last_name,email,photo FROM user WHERE email = ? AND password = ?;`;
    let resultado;

    try {
        const [result] = await pool.query(sql,params);
        if (result.length === 0) {
            resultado = "Usuario no encontrado";
        }else{
            resultado = "Usuario encontrado"
        }
        res.send(resultado);
    } catch (error) {
        res.send(error)
    }
}

const getBook = async (req, res) =>{
    const{id_user,id_book} = req.query
    const params = [id_user, id_book];

    let sql;

    if(id_user != undefined && id_book == undefined){
        sql ="SELECT * FROM book WHERE id_users = ?;"
    }else{
        sql = "SELECT * FROM book WHERE id_users = ? AND id_book = ?"
    }

    try{
        const[data] = await pool.query(sql, params)
        if(data.length === 0){
            res.send("Libro no encontrado")
        }else{
            res.send(data)
        }
    }catch(err){
        res.send(err)
    }
}

const postBook = async (req, res) =>{

    const {id_user, title, type, author, price, photo} = req.body
    const params = [id_user, title, type, author, price, photo]
    let sql = "INSERT INTO book (id_users, title, type, author, price, photo) VALUES (?, ?, ?, ?, ?, ?)"

    try{
        const[data] = await pool.query(sql, params)
        if(data.length === 0){
            res.send("Libro no registrado")
        }else{
            res.send("Libro registrado")
        }
    }catch(err){
        res.send(err)
    }

}

const putBook = async (req,res) => {

    const{id_book,id_user,title,type,author,price,photo} = req.body;
    const params = [ title? title: null, type? type: null, author? author: null, price? price:null,photo? photo:null, id_book? id_book:null, id_user? id_user:null];
    let sql ="UPDATE book SET title = COALESCE(?,title), type = COALESCE(?,type), author = COALESCE(?,author), price = COALESCE(?,price), photo = COALESCE(?,photo) WHERE id_book = ? AND id_users = ?;"

    try{
        const[data] = await pool.query(sql, params)
        if(data.length === 0){
            res.send("No se ha editado ningún libro")
        }else{
            res.send("Libro modificado")
        }
    }catch(err){
        res.send(err)
    }
}

const delBook = async (req, res) =>{

    let sql = "DELETE FROM book WHERE id_book = ?;"
    const {id_book} = req.query
    const params = [id_book]

    try{
        const[data] = await pool.query(sql, params)
        if(data.length === 0){
            res.send("El libro no se ha podido eliminar")
        }else{
            res.send("Libro eliminado")
        }
    }catch(err){
        res.send(err)
    }


}

module.exports = { postUser, postLogin, getBook, postBook, putBook, delBook }