import bodyparser from 'body-parser';
import express from 'express';
import router from '../src/router-connection/router-methods';

// calls the express function
const app = express();
app.use(bodyparser.json());
app.use('/api', router);
const students = [{}];
// get the student details
router.get('/', (req, res) => {
    res.json(students);
});

// created server at port 5000
app.listen(5000, () => {
    console.log('Sever listening at port number 5000');
});

