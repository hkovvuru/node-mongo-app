import router from '../src/router-connection/router-methods';
import express from 'express';
import bodyparser from 'body-parser';

// calls the express function
const app = express();
app.use(bodyparser.json());
app.use('/api', router);

// get the student details
router.get('/', (req, res) => {
    res.json(students);
})

// created server at port 5000
app.listen(5000, () => {
    console.log('Sever listening at port number 5000');

});

