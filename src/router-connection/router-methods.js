import express from 'express';
import bodyparser from 'body-parser';
import Student from '../database-model/db-connection';


const app = express();

// tells the system to use JSON fromat data
app.use(bodyparser.json());

// define the routing using the express method
const router = express.Router();

// Mount the router as middleware at path /Stud
app.use('/stud', router);

// get all student details list from database
router.get('/stud', (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'Student Cannot be empty!' });
    }
    Student.find({}).then((data) => {
        res.send(data);
    }).catch((error) => {
        console.error(error.message);
        res.send({ err: error.message });
    });
    return 'get the data successfully';
});


// Get the data with name parameter
router.get('/stud/:name', (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'Person Cannot be empty!' });
    }
    Student.find({ name: req.params.name }).then((data) => {
        res.send(data);
    }).catch((error) => {
        console.error(error.message);
        res.send({ err: error.message });
    });
    return 'get the data successfully';
});

// add a new member to database using Post method

router.post('/stud', (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'Student Cannot be empty!' });
    }
    Student.create(req.body).then((stud) => {
        res.status(201).json(stud);
        // console.log('Post the data successfully');
    }).catch((error) => {
        console.error(error.message);
        res.send({ err: error.message });
    });
    return 'post the data successfully';
});

// update student data
router.put('/stud/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'Student Cannot be empty!' });
    }
    Student.findById(req.params.id, (err, data) => {
        // data.name = req.body[0].name;
        console.log('data => ', data);
        data.save(() => {
            if (err) { res.send(err); }
            res.json(data);
        });
        res.send(data);
        // console.log('update the data successfully');
    });
    return 'put/update the data successfully';
});


// delete a data from database with parameter id
router.delete('/stud/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'Student Cannot be empty!' });
    }
    Student.findByIdAndRemove({ _id: req.params.id }).then((data) => {
        res.send(data);
        // console.log('Delete the data successfully');
    }).catch((error) => {
        console.error(error.message);
        res.send({ err: error.message });
    });
    return 'delete the data successfully';
});

// Removing all students data from the database
router.delete('/stud', (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'Student Cannot be empty!' });
    }
    Student.remove().then((data) => {
        // Student.remove().exec();
        res.send(`${data.n} - Entries Deleted Sucessfully!!`);
        // console.log('Deleted total data successfully');
    }).catch((error) => {
        console.error(error.message);
        res.send({ err: error.message });
    });
    return 'Deleted total data successfully';
});


// pagination methods

router.get('/stud-details/:page', (req, res) => {
    const perPage = 5;
    const page = req.params.page || 1;

    Student
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .then((docs) => {
            if (docs.length === 0) { console.log('There are no results matching your query.'); }
            else {
                Student.count({})
                    .then((number) => {
                        res.status(200).json(docs);
                        // fetch no.of records in the db
                        console.log(JSON.stringify({ number }));
                    });
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
});

// create the data in the database
router.post('/stud-details', (req, res) => {
    if (!req.body) { console.log(res.status(400).send({ message: 'Student Cannot be empty!' })); }
    Student.create(req.body).then((stud) => {
        res.status(201).json(stud);
        // console.log('Post the data successfully');
    }).catch((error) => {
        console.error(error.message);
        res.send({ err: error.message });
    });
});

/* router.get('/stud-details/:pageNo', (req, res,next) => {
    const recordsPerPage = 5;
    const pageNumber = req.params.pageNo || 1;
     Student
        .find({})
        .skip((recordsPerPage * pageNumber) - recordsPerPage)
        .limit(recordsPerPage)
        .then((docs) => {
            if (docs.length === 0)
                console.log('hello No data is there ');

            else
                Student
                    .count({})
                    .then((totalRecords) => {
                        res.status(200).json(docs);
                        console.log(JSON.stringify({ totalRecords }));
                    });

        })
        .catch((error) => {
            console.log(error.message);
            res.send(error.message);
        })
}); */

// Export the router
export default router;
