
import mongoose from 'mongoose';
// create Schema instance
const Schema = mongoose.Schema; 

// connecting to the mongodb database using mongoose
mongoose.connect('mongodb://localhost/mySampleDB', (err) => {
    if (err) throw err;
    console.log('Database connected successfully');
});
// create Schema and model
const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    college: {
        type: String,
    },
    department: {
        type: String,
    },
    emailId: {
        type: String,
    },
    phone: {
        type: Number,
    },
    address: {
        type: String,
    },
    _id: {
        type: String,
    }
});

//Creating Student reference variable for model
const Student = mongoose.model('students', studentSchema);

// Exporting the Student Model
module.exports = Student;