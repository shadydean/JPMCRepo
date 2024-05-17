const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send(`<h1>WELCOME TO HOME!<h1/>`);
});

app.get('/students', async (req, res) => {
    const data = await fs.readFile('./students.json');
    const students = JSON.parse(data);
    res.status(200).json(students);
    });

app.post('/students', async (req, res) => {
    let students = [];
        const data = await fs.readFile('./students.json');
        if (data.length > 0) {
            students = JSON.parse(data);
        }
        const idx = students.length+1;
        const namex = req.body.name;
        const branchx = req.body.branch;

        const student = {
            id: idx,
            name: namex,
            branch: branchx
        };
        
        students.push(student);
        await fs.writeFile('./students.json', JSON.stringify(students));
        res.status(200).json(students);
    });

app.put('/students/:id', async (req, res) => {
    const data = await fs.readFile('./students.json')
    const students = JSON.parse(data);

    const studentIndex = students.findIndex(student => student.id === parseInt(req.params.id));
    if (studentIndex === -1) {
        return res.status(400).send("ERROR: Student not found");
    }
    students[studentIndex].name = req.body.name 
    students[studentIndex].branch = req.body.branch
    await fs.writeFile('./students.json', JSON.stringify(students));
    res.status(200).json(students);

})

app.delete('/students/:id', async (req, res) =>{
    const data = await fs.readFile('./students.json')
    const students = JSON.parse(data)
    const studentIndex = students.findIndex(student=> student.id===parseInt(req.params.id))
    if(studentIndex === -1) {
        res.status(400).send("ERROR: Student not found")
    }
    students.splice(studentIndex, 1)
    await fs.writeFile('./students.json', JSON.stringify(students))
    res.status(200).json(students)
})

app.listen(3000, () => {
    console.log('server is running on port 3000');
});
