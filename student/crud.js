function display() {
    fetch("http://localhost:3000/data")
    .then((res) => res.json())
    .then((data) => {
        const table = document.querySelector("table");
        table.innerHTML = "";
        const headerRow = document.createElement("tr");
        headerRow.innerHTML = `
            <th>Rollno</th>
            <th>Name</th>
            <th>Marks</th>
            <th>Branch</th>
            <th>Operation</th>
        `;
        table.appendChild(headerRow);
        data.forEach((element) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${element.rollno}</td>
                <td>${element.name}</td>
                <td>${element.marks}</td>
                <td>${element.branch}</td>
                <td>
                    <button class="fa fa-trash" onclick="Delete(${element.id})"></button>
                    <button class="fa fa-edit" onclick="Update(${element.id})"></button>
                </td>
            `;
            table.appendChild(row);
        });
    });
}

function Delete(id){
    fetch(`http://localhost:3000/data/${id}`,{method:"DELETE"})
    .then((response)=>{
        console.log("DELETED SUCCESSFULLY")
        display()
    })
    .catch((err)=>console.log('error'))
}   

function Insert(){
    var idx=Math.round(Math.random()*1000).toString()
    var rollx = document.getElementById('rollno').value
    var namex = document.getElementById('name').value
    var marksx = document.getElementById('marks').value
    var branchx = document.getElementById('branch').value
    fetch(`http://localhost:3000/data`,{method:"POST", body:JSON.stringify({
        "id":`${idx}`,
        "rollno":`${rollx}`,
        "name":`${namex}`,
        "marks":`${marksx}`,
        "branch":`${branchx}`
    })})
    .then((response)=>{
        console.log("INSERTED SUCCESSFULLY")
        display()
    })
    .catch((err)=>console.log('error'))
}   

function Update(idx){
    var branchx = document.getElementById('branch').value
    fetch(`http://localhost:3000/data/${idx}`,{method:"PATCH", body:JSON.stringify({
        "branch":`${branchx}`
    })})
    .then((response)=>{
        console.log("UPDATED SUCCESSFULLY")
        display()
    })
    .catch((err)=>console.log('error'))
}   
