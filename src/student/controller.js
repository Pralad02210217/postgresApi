const pool = require('../../db');
const queries = require('./queries')



const getDepartment = (req, res) =>{
    pool.query(queries.getDepartment, (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getDepartmentById = (req, res) => {
    const id = req.params.id;
    pool.query(queries.getDepartmentById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}
const getFullHodById = (req, res) => {
    const id = req.params.id;
    pool.query(queries.getFullHodQuery, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};
const getFullPlById = (req, res) => {
    const id = req.params.id;
    pool.query(queries.getFullplQuery, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getfullDepartmentById = (req, res) => {
    const id = req.params.id;
    pool.query(queries.getDepartmentById, [id], (error, departmentResults) => {
        if (error) throw error;

        const hodid = departmentResults.rows[0].hodid; // Get hodid from the department result

        // Use hodid to run the getStaffById query
        pool.query(queries.getStaffById, [hodid], (error, staffResults) => {
            if (error) throw error;
            const deptid = departmentResults.rows[0].deptid; 

            pool.query(queries.getProgrammeById, [deptid], (error, Programmeresults)=>{
                res.status(200).json({
                    department: departmentResults.rows,
                    staff: staffResults.rows,
                    Programme : Programmeresults.rows,
                });
            })
            
        });
    });
}
const getfullProgrammeById = (req, res) =>{
    const id = req.params.id;
    pool.query(queries.getProgrammeByPid, [id], (error, Programmeresults)=>{
        if (error) throw error;
        const staffid = Programmeresults.rows[0].pl_id;
        const deptid = Programmeresults.rows[0].deptid;
        pool.query(queries.getStaffById, [staffid], (error, StaffResults) =>{
            if (error) throw error; 
            pool.query(queries.getDepartmentById, [deptid], (error, departmentResults)=>{
                if (error) throw error
                res.status(200).json({
                    Programme : Programmeresults.rows,
                    staff: StaffResults.rows,
                    department: departmentResults.rows,
                })
            })
        });
    });
}

const getHeadOfDepartment = (req, res) =>{
    const id = req.params.id;
    pool.query(queries.getHeadOfDepartment, [id], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getProgrammeById = (req, res) =>{
    pool.query(queries.getProgrammeById, [id], (error, results)=>{
        if (error) throw error;
        res.status(200).json(results.row);
    })
}

const getStaffByDepartment = (req, res) =>{
    const id = req.params.id;
    pool.query(queries.getStaffByDepartment, [id], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}


const getStaffById =(req, res) =>{
    const id = req.params.id;
    pool.query(queries.getStaffById, [id], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}
const removeStaff = (req, res) =>{
    const id = req.params.id;
    pool.query(queries.getStaffById , [id], (error, results) =>{
        const noStaffFound = !results.rows.length;
        if (noStaffFound){
            res.send("Staff does not exist in the database, could not remove it");
        }

        pool.query(queries.removeStaff, [id], (error, results) =>{
            if (error) throw error;
            res.status(200).send("Staff removed Successfully");
        })
    });
}

// const getStudents = (req, res) => {
//     pool.query(queries.getStudents, (error, results) => {
//         if (error) throw error;
//         res.status(200).json(results.rows);
//     })
// }
// const getStudentById = (req, res) => {
//     const id = parseInt(req.params.id);
//     pool.query(queries.getStudentById, [id], (error, results) => { // Pass id as an array
//         if (error) throw error;
//         res.status(200).json(results.rows);
//     });
// }

const addStaff = (req, res) => {
    const { sid, name, designation, email,imageurl,deptno } = req.body[0]; // Access the first object in the array

    console.log(req.body);
    // Check if email exists
    console.log(email);
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Database error" });
        }

        console.log("Database results:", results.rows);

        if (results.rows[0].count > 0) {
            // Email already exists
            console.log("Email already exists:", email);
            return res.status(409).json({ message: "Email already exists" });
        } else {
            // Email is new, so add the new student
            pool.query(queries.addStaff, [sid, name, designation, email, imageurl, deptno], (error, result) => {
                if (error) {
                    return res.status(500).json({ error: " in addDatabase error" });
                }
                console.log(name, email);
                res.status(201).json({ message: "Staff created successfully" });
            });
        }
    });
}

const addHoD =(req,res)=>{
    const {deptid, staffid,starting_tenure, ending_tenure} = req.body[0];
    console.log(req.body[0]);
    pool.query(queries.addHoD, [deptid, staffid, starting_tenure, ending_tenure], (error, result) =>{
        if (error){
            console.error("Error adding HoD:", error);
            return res.status(500).json({error: "Error in database while adding HoD"})
        }
        res.status(201).json({message: "HoD added successfully"});
    });
}

const removeHoD = (req, res) =>{
    const id = req.params.id;
    pool.query(queries.getStaffById , [id], (error, results) =>{
        const noStaffFound = !results.rows.length;
        if (noStaffFound){
            res.send("Staff does not exist in the database, could not remove it");
        }

        pool.query(queries.removeHoD, [id], (error, results) =>{
            if (error) throw error;
            res.status(200).send("HoD removed Successfully");
        })
    });
}

const addPL =(req,res)=>{
    const {deptid,pid, staffid,starting_tenure, ending_tenure} = req.body[0];
    console.log(req.body[0]);
    pool.query(queries.addPL, [deptid, pid,staffid, starting_tenure, ending_tenure], (error, result) =>{
        if (error){
            console.error("Error adding HoD:", error);
            return res.status(500).json({error: "Error in database while adding PL"})
        }
        res.status(201).json({message: "PL added successfully"});
    });
}
const removePL = (req, res) =>{
    const id = req.params.id;
    pool.query(queries.getStaffById , [id], (error, results) =>{
        const noStaffFound = !results.rows.length;
        if (noStaffFound){
            res.send("Staff does not exist in the database, could not remove it");
        }

        pool.query(queries.removePL, [id], (error, results) =>{
            if (error) throw error;
            res.status(200).send("PL removed Successfully");
        })
    });
}

const checkLogin = (req, res) => {
    const { name, password } = req.body[0];
    console.log(req.body[0]);

    pool.query(queries.checkLogin, [name, password], (error, results) => {
        if (error) {
            console.error("Error checking login:", error);
            return res.status(500).json({ error: "Error in database while checking login", details: error.message });
        }

        if (results.rows.length === 1) {
            // Login successful
            res.status(200).json({ message: "Login successful" });
        } else {
            // Login failed
            res.status(401).json({ message: "Invalid login credentials" });
        }
    });
}

const getProgramLeader = (req, res) =>{
    const id = req.params.id;
    pool.query(queries.getProgramLeader, [id], (error, results)=>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getModules = (req, res) =>{
    const id =req.params.id;
    pool.query(queries.getModules, [id], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getModulesBySemester = (req, res) => {
    const id = req.params.id;
    const semno = parseInt(req.params.semno);
    
    pool.query(queries.getModulesBySemester, [id, semno], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}

const getElectives = (req, res) =>{
    const id = req.params.id;
    pool.query(queries.getElectives, [id], (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}







// const getStudents = (req, res) => {
//     pool.query(queries.getStudents, (error, results) => {
//         if (error) throw error;
//         res.status(200).json(results.rows);
//     })
// }
// const getStudentById = (req, res) => {
//     const id = parseInt(req.params.id);
//     pool.query(queries.getStudentById, [id], (error, results) => { // Pass id as an array
//         if (error) throw error;
//         res.status(200).json(results.rows);
//     });
// }

// const addStudent = (req, res) => {
//     const { name, email, dob } = req.body[0]; // Access the first object in the array

//     // Check if email exists
//     pool.query(queries.checkEmailExists, [email], (error, results) => {
//         if (error) {
//             return res.status(500).json({ error: "Database error" });
//         }

//         console.log("Database results:", results.rows);

//         if (results.rows[0].count > 0) {
//             // Email already exists
//             console.log("Email already exists:", email);
//             return res.status(409).json({ message: "Email already exists" });
//         } else {
//             // Email is new, so add the new student
//             pool.query(queries.addStudent, [name, email, dob], (error, result) => {
//                 if (error) {
//                     return res.status(500).json({ error: "Database error" });
//                 }
//                 console.log(name, email);
//                 res.status(201).json({ message: "Student created successfully" });
//             });
//         }
//     });
// }

// const removeStudent = (req, res) =>{
//     const id = parseInt(req.params.id);
//     pool.query(queries.getStudentById , [id], (error, results) =>{
//         const noStudentFound = !results.rows.length;
//         if (noStudentFound){
//             res.send("Student does not exist in the database, could not remove it");
//         }

//         pool.query(queries.removeStudent, [id], (error, results) =>{
//             if (error) throw error;
//             res.status(200).send("Student removed Successfully");
//         })
//     });
// }


// const updateStudent = (req, res) => {
//     const id = parseInt(req.params.id);
//     const { name } = req.body[0];

//     pool.query(queries.getStudentById, [id], (error, results) => {
//         const noStudentFound = !results.rows.length;
//         if (noStudentFound) {
//             res.send("Student does not exist in the database");
//         }

//         pool.query(queries.updateStudent, [name, id], (error, results) => {
//             if (error) throw error;
//             res.status(200).send("Student updated successfully");
//         });
//     });
// };


module.exports = {

    getDepartment,
    getDepartmentById,
    getStaffById,
    getStaffByDepartment,
    getProgrammeById,
    getfullDepartmentById,
    getHeadOfDepartment,
    getProgramLeader,
    getModules,
    getElectives,
    getModulesBySemester,
    getfullProgrammeById,
    getFullHodById,
    getFullPlById,
    removeStaff,
    addStaff,
    addHoD,
    removeHoD,
    addPL,
    removePL,
    checkLogin,

}
