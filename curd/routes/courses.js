const express = require('express');

const router = express.Router();

const genres = [
    {id : 1, name:'course1'},
    {id : 2, name:'course2'},
    {id : 3, name:'course3'},
]

router.get('/', (req, res) =>{
    res.send('calling');
})

router.get('/:id', (req, res) => {
    
    const course = genres.filter(course => course.id === parseInt(req.params.id))    
    if(course.length == 0) {
        res.status(404).send('Course is not found')
    } else {        
        console.log(course[0].id);
        res.send(course);
    }     
})

router.post('/',(req, res)=>{
    console.log(genres.length);
    const course = {
        id : genres.length+1,
        name : req.body.name
    };
    if(req.body.name.length >=3 ) {
        genres.push(course);
        res.send(genres)
        console.log('calling post method')
    } else {
        res.status(404).send('Please enter name');
    }
})

router.put('/:id', (req, res) => {
    console.log('calling put');
    const course = genres.filter(c => c.id === parseInt(req.params.id));
    if(course.length == 0){
        console.log('calling put-1');
        res.status(404).send('Course is not found')
    } else if(req.body.name.length <=3) {
        console.log('calling put-2');
        res.status(404).send('Please enter valid course name')
    } else {
        console.log(req.body.name);
        course[0].name = req.body.name;
        console.log( course);
        res.send(genres);
    }
})

router.delete('/:id', (req, res) => {
    const course = genres.find(c => c.id === parseInt(req.params.id));
    if(course.length == 0){
        console.log('calling put-1');
        res.status(404).send('Course is not found')
    } else {
       const index = genres.indexOf(course)
       genres.splice(index,1)
        res.send(genres);
    }
})

module.exports = router;