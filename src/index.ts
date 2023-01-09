import express, { Request, Response } from 'express'
import cors from 'cors'
import { courses, student } from './database'
import { COURSE_STACK, TStudent, TCourse } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})
//criando nosso primeiro end point
app.get('/courses', (req: Request,  res:Response)=>{
   res.status(200).send(courses)
})
// Agora faremos um endpoint que faz uma consulta por todos os cursos cadastrados e os filtra baseado em uma query params.
//A query irá se chamar q (abreviação de query) e será utilizada para gerar um resultado case insensitive.
app.get('/courses/search', (req:Request,  res:Response)=>{
   const q = req.query.q as string    // o "as" força a const ser uma string
   const result = courses.filter((course)=>{
    return course.name.toLowerCase().includes(q.toLowerCase())
   })
   res.status(200).send(result)
})

//end point de criação de recurso

app.post('/courses', (req:Request, res: Response)=>{
    // const id = req.body.id as string
    // const name = req.body.name as string
    // const lessons = req.body.lessons as number
    // const stack = req.body.stack as COURSE_STACK

    const {id, name, lessons, stack} = req.body as TCourse   //msm coisa q esta comentado, porém desestruturado

    const newCourse = {
        id, 
        name,
        lessons,
        stack 
    }
    courses.push(newCourse)

    
    res.status(201).send("Curso registrado com sucesso!")
})
app.get('/student', (req:Request, res: Response)=>{
    res.status(200).send(student)

})

app.get('/student/seach', (req:Request, res: Response)=>{
    const query = req.query.q as string
    
    const buscarNome = student.filter((student)=>{
        return student.name.toLowerCase().includes(query.toLowerCase())
    })
    res.status(200).send(buscarNome)
})


app.post('/student', (req:Request, res: Response)=>{

    const {id, name, age} = req.body as TStudent   

    const newStudent: TStudent = {
        id, 
        name,
        age 
    }

    student.push(newStudent)
    res.status(200).send(student)
    console.log("Curso registrado com sucesso!")
})
