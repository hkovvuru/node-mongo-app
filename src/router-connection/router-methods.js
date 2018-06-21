import Student from '../database-model/db-connection'
import express from 'express';
import bodyparser from 'body-parser';
const app = express();

// tells the system to use JSON fromat data
app.use(bodyparser.json());

// define the routing using the express method
const router = express.Router();

//Mount the router as middleware at path /Stud
app.use('/stud', router);

//get all student details list from database
router.get('/stud', (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Student Cannot be empty!" });
    }
    Student.find({}).then((data) => {
        res.send(data);
        console.log('get the data successfully')
    }).catch((error) => {
        console.error(error.message);
        res.send({ err: error.message });
    });
});


// Get the data with name parameter
router.get('/stud/:name', (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Person Cannot be empty!" });
    }
    Student.find({ name: req.params.name }).then((data) => {
        res.send(data);
    }).catch((error) => {
        console.error(error.message);
        res.send({ err: error.message });
    });
});

//add a new member to database using Post method

router.post('/stud', (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Student Cannot be empty!" });
    }
    Student.create(req.body).then((stud) => {
        res.status(201).json(stud);
        console.log('Post the data successfully')
    }).catch((error) => {
        console.error(error.message);
        res.send({ err: error.message });
    });

});

//update student data
router.put('/stud/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Student Cannot be empty!" });
    }
    Student.findById(req.params.id, (err, data) => {
        data.name = req.body[0].name;
        console.log('data => ', data);
        data.save((err) => {
            if (err)
                res.send(err);
            res.json(data);
        });
        res.send(data);
        console.log('update the data successfully')
    });
});



//delete a data from database with parameter id
router.delete('/stud/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Student Cannot be empty!" });
    }
    Student.findByIdAndRemove({ _id: req.params.id }).then((data) => {
        res.send(data);
        console.log('Delete the data successfully')
    }).catch((error) => {
        console.error(error.message);
        res.send({ err: error.message });
    });

});

// Removing all students data from the database
router.delete('/stud', (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Student Cannot be empty!" });
    }
    Student.remove().then((data) => {
        //Student.remove().exec();        
        res.send(data.n + " - Entries Deleted Sucessfully!!");
        console.log('Deleted total data successfully')
    }).catch((error) => {
        console.error(error.message);
        res.send({ err: error.message });
    });

});

//Exporting router 
module.exports = router;
