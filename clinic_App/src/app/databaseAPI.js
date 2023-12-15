const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;

// Database Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'his008',
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database');
});
app.use(cors());

// Middleware for parsing JSON
app.use(express.json());
// let alternativecontactID;

// API Endpoint for Form Submission
app.post('/api/submit-form', (req, res) => {
    let genderint ;
    let patientNo;
    let alternativecontactID;

    const formData = req.body;
    console.log(formData)
    const patienttable = 'INSERT INTO patient SET ?';
    const alternativecontact = 'INSERT INTO alternativecontact SET ?';
    const appointment = 'INSERT INTO appointment SET ?';
    const alternativecontactdata = {
        fname: formData.firstName,
        lname: formData.surname,
        mobile: formData.telephone

    }
    // console.log(alternativecontactdata)
    // query add alternativecontact
    connection.query(alternativecontact, alternativecontactdata, (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).json({ error: 'Internal Server Error -alternative Contact ' });
            return;
        }

        const alternativeidsql = 'SELECT alternativeContactId FROM alternativecontact WHERE mobile = ?';
        // query alternativecontact ID


        connection.query(alternativeidsql, [formData.telephone], (err, results) => {
            if (err) {
                console.error('Error executing query: ' + err.stack);
                res.status(500).json({ error: 'Internal Server Error SELECT alternativeContactId' });
                return;
            }
            alternativecontactID = results[0].alternativeContactId
            // console.log('hereeeeree: ' + alternativecontactID)



            // query gender ID
            const gendersql = 'SELECT genderID FROM gender WHERE genderName = ?';

            connection.query(gendersql, [formData.gender], (err, results) => {
                if (err) {
                    console.error('Error executing query: ' + err.stack);
                    res.status(500).json({ error: 'Internal Server Error SELECT genderID' });
                    return;
                }
                genderint = results[0].genderID;


                // console.log('hereeee: ' + formData)
                // alternativecontactID = 
                const patientdata = {
                    fname: formData.firstName,
                    lname: formData.surname,
                    othernames: formData.othernames,
                    DOB: formData.dateOfBirth,
                    ID_No: formData.idNo,
                    gender: genderint,
                    county: formData.county,
                    mobile: formData.mobile,
                    email: formData.email,
                    AlternativeContactId: alternativecontactID,
                    disability: formData.hasDisability
                }

                // Insert the form data into the database



                connection.query(patienttable, patientdata, (err, results) => {
                    if (err) {
                        console.error('Error executing query: ' + err.stack);
                        res.status(500).json({ error: 'Internal Server Error patient Data' });
                        return;
                    }


                    connection.query('SELECT patient_NO from patient where ID_No = ' + formData.idNo, (err, results) => {
                        if (err) {
                            console.error('Error executing query: ' + err.stack);
                            res.status(500).json({ error: 'Internal Server Error SELECT patient_NO' });
                            return;
                        }
                        patientNo = results[0].patient_NO;

                        const appointmentdata = {
                            patientNo: patientNo,
                            appDate: formData.appointmentDate,
                            appTime: formData.appointmentTime,


                        }
                        // add appointment
                        connection.query(appointment, appointmentdata, (err, results) => {
                            if (err) {
                                console.error('Error executing query: ' + err.stack);
                                res.status(500).json({ error: 'Internal Server Error appointment data' });
                                return;
                            }

                            res.status(201).json({ message: 'data  submitted successfully' });
                        });
                    });
                });
            });
        });
    });
});

// get counties to sleect drop down
app.get('/api/counties', (req, res) => {
    const sql = 'SELECT * FROM county';

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        res.status(200).json(results);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
