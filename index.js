
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// const dataCourses = [
//     {
//         id: 1,
//         name: "NodeJS",
//         leader: "Bui Viet Hoang",
//         year: 2022
//     },
//     {
//         id: 2,
//         name: "ReactJS",
//         leader: "Chu Minh Hoang",
//         year: 2022
//     }
// ]

// app.get("/courses", (req, res) => {
//     res.json(dataCourses);
// });

// app.post("/courses", (req, res) => {
//     let course = req.body;
//     dataCourses.push(course);
//     res.send("Successfully Create");
// });

// app.put("/courses/:id", (req, res) => {
//     let { id } = req.params;
//     let putID = (course) => course.id == id;
//     let putIndex = dataCourses.findIndex(putID);

//     if(putIndex===-1) 
//         return res.send("Not found");

//     dataCourses[putIndex].name = req.body.name;
//     dataCourses[putIndex].leader = req.body.leader;
//     dataCourses[putIndex].year = req.body.year;
//     res.send("Successfully Update");
// });

// app.delete("/courses/:id", (req, res) => {
//     let { id } = req.params;
//     let deleteID = (course) => course.id == id;
//     let deleteIndex = dataCourses.findIndex(deleteID);

//     if(deleteIndex===-1)
//         return res.send("Not found");

//     dataCourses.splice(deleteIndex, 1);
//     res.send("Successfully Delete");
// });



const data = {
    courses: [
        {
            id: 1,
            name: "NodeJS",
            leader: "Bui Viet Hoang",
            year: 2022
        },
        {
            id: 2,
            name: "ReactJS",
            leader: "Chu Minh Hoang",
            year: 2022
        }
    ],
    students: [
        {
            id: 1,
            name: 'Chee',
            age: 18
        }
    ],
    supports: [
        {
            id: 1,
            name: "Tran Duong",
            age: 18
        }
    ]
}

app.get("/:nameData", (req, res) => {
    let { nameData } = req.params;

    if(!data[nameData])
        return res.send("Not found data");

    res.json(data[nameData]);
});

app.post("/:nameData", (req, res) => {
    let { nameData } = req.params;
    let dataPost = req.body;

    if(!data[nameData])
        return res.send("Not found data");
        
    data[nameData].push(dataPost);
    res.send("Successfully Create");
});

app.put("/:nameData/:id", (req, res) => {

    let { nameData, id } = req.params;
    let putNameData = data[nameData];
    let dataPut = req.body;

    if(!putNameData)
        return res.send("Not found data");

    let putID = (data) => data.id == id;
    let index = putNameData.findIndex(putID);
    if(index === -1) 
        return res.send("Not found ID");

    let putNameDataIndex = putNameData[index];
    for(let key in putNameDataIndex){
        if (putNameDataIndex.hasOwnProperty(key)) {
            putNameDataIndex[key] = dataPut[key];
        }
    }
    res.send("Successfully Update");
});

app.delete("/:nameData/:id", (req, res) => {
    let { nameData, id } = req.params;
    let deleteNameData = data[nameData];
    if(!deleteNameData)
        return res.send("Not found data");

    let deleteID = (data) => data.id == id;
    let index = deleteNameData.findIndex(deleteID);
    if( index===-1 )
        return res.send("Not found ID");

    deleteNameData.splice(index, 1);
    res.send("Successfully Delete");
});

app.listen(port, () => {
    console.log(`Running server on port ${port}`);
});
