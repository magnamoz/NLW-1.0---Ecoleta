//importar a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose()

//criar objeto que irá fazer operações dentro no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//utilizar o objeto banco de dados para nossas operações
db.serialize(() =>{

    //com comandos SQL:
    //crase permite a quebra de linha no código
       //1 criar tabela
    //db.run(`
    //    CREATE TABLE IF NOT EXISTS places (
    //        id INTEGER PRIMARY KEY AUTOINCREMENT,
    //        image TEXT,
    //        name TEXT,
    //        address TEXT,
    //        address2 TEXT,
    //        state TEXT,
    //        city TEXT,
    //        items TEXT
    //    );
    //`)
  

    //2 inserir dados na tabela
   // const query = `
   //     INSERT INTO places (
    //        image,
    //        name,
    //        address,
    //        address2,
    //        state,
    //        city,
     //       items
    //    ) VALUES (?,?,?,?,?,?,?);
    //`

    //const values = [
    //    "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
     //   "Papersider",
     //   "Guilherme Gemballa, Jardim América",
     //   "N° 260",
      //  "Santa Catarina",
      //  "Rio do Sul",
      //  "Papéis e Papelão"
    //]

    //function afterInsertData(err){
        //se tiver erro retorna erro
      //  if (err){
       //     return console.log(err)
       // }
        //senao tiver erro continuação código
       // console.log("Cadastrado com sucesso")
        //quanto temos this não podemos usar aroww function
      //  console.log(this)
   // }

    //função será executda quando chegar a resposta do callback
    //db.run(query, values, afterInsertData)        

    
    //3 consultar dados na tabela
    //dentro do all 1° argumento seleciona tudo (*) da tabela
    //2°argumento é um callback, uma função anônima q vai receber erros
    // db.all(`SELECT * FROM places`, function (err, rows){
    //    if (err){
    //        return console.log(err)
    //    }
    //    console.log("aqui estão registros")
    //    console.log(rows)
    //})


    //4 apagar dados da tabela
    //onde id é igual a 1
    //db.run(`DELETE FROM places WHERE id = ?`, [3],function (err){
    //   if (err){
    //       return console.log(err)
    //   }
    //    console.log("Registro deletado com sucesso")
    //})
})