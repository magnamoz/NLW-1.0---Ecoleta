//"pedir" o express para iniciar servidor
const express = require("express")

//variável server vai executar express
const server = express()

//pegar o banco de dados
const db = require("./database/db")

//configurar pasta pública para o express poder enxergar os arquivos que estão dentro dela e carregar o html "configurado"
server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({extended: true}))


//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{ 
   
    express: server,  
   
    noCache:true  
})


//configurar caminhos da aplicação
//página inicial
server.get("/", (req, res) =>{
    return res.render("index.html")
}) 


server.get("/create-point", (req, res) =>{
    
    return res.render("create-point.html")
}) 

server.post("/savepoint", (req, res) =>{

    //console.log(req.body)

    //inserir dados no banco de dados
    const query = `
         INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if (err){
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        
       console.log("Cadastrado com sucesso")
       console.log(this)

       return res.render("create-point.html", {saved:true})
    }

    //função será executda quando chegar a resposta do callback
    db.run(query, values, afterInsertData) 

})


server.get("/search", (req, res) =>{

    const search = req.query.search

    if (search =="")
       return res.render("search-results.html", {total:0})

    //pegar dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if (err){
            return console.log(err)
        }

        // para mostrar quantidade de dados encontrados
        const total = rows.length

        //mostra a página html com os dados do banco de dados
        return res.render("search-results.html", {places: rows, total})
    })

}) 


//ligar servidor (ouvindo a porta 3000)
server.listen(3000)