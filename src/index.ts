import express, { Request, Response } from "express";
import mysql from "mysql2/promise";

const app = express();

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

const connection = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mudar!@#",
    database: "unicesumar"
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.post('/users', async function (req: Request, res: Response) {
    const body = req.body;
    const isAtivo = body.ativo ? true : false;
    const insertQuery = "INSERT INTO users (name, email, senha, ativo, papel_id) VALUES (?, ?, ?, ?, ?)";

    if (body.password !== body.confirmPassword) {
        return res.redirect('/users/add');
    }

    try {
        await connection.query(insertQuery, [body.name, body.email, body.password, isAtivo, body.role]);
        res.redirect("/users");
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).send('Erro no servidor.');
    }
});

app.post('/users/:id/delete', async function(req : Request, rep : Response){
    const id = req.params.id;
    const sqlDelete = 'Delete from users where id = ?';
    await connection.query(sqlDelete,[id])
    rep.redirect("/users")
})

app.get('/users', async function (req: Request, res: Response) {
    try {
        const [rows] = await connection.query(`
            SELECT u.id, u.name, u.email, u.ativo, p.descricao, DATE_FORMAT(u.created_at, '%d-%m-%Y') AS formatted_date FROM users u
            INNER JOIN papel p ON u.papel_id = p.id
            ORDER BY u.id ASC;
        `);

        return res.render('users/index', {
            users: rows
        });

    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).send('Internal Server Error');
    }
});

app.get('/users/add', async function (req: Request, res: Response) {
    return res.render('users/form')
})

app.get('/login', async function(req: Request, rep: Response){
    return rep.render('users/login') 
})

app.get('/', function(req, resp){
    return resp.render('users/blog') 
})

app.post('/login', async function(req: Request, rep: Response){
    const email = req.body.email;
    const senha = req.body.password;
    const query = 'SELECT * FROM users WHERE email = ? AND senha = ?';
    
    try {
        const [results] = await connection.query(query, [email, senha]);
        console.log(results)
        if (results.length > 0) {
            return rep.render('users/blog') 
        } else {
            console.log('Falha no login');
            return rep.render('users/login')
        }
      } catch (err) {
        
      }
})

app.listen('3000', () => console.log("Server is listening on port 3000."));