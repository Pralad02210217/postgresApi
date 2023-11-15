
const getDepartment = "SELECT * FROM department";
const getDepartmentById = "SELECT * FROM department WHERE deptid = $1";
const getStaffById = "SELECT * FROM staff WHERE sid = $1";
const getProgrammeById = 'SELECT * FROM Programme WHERE deptid = $1';
const getProgrammeByPid = 'SELECT * FROM Programme where pid =$1';
const getStaffByDepartment = "SELECT * FROM staff WHERE deptno = $1";
const getHeadOfDepartment = "SELECT * FROM department_hod WHERE deptid = $1";
const getProgramLeader = "SELECT * FROM programme WHERE pid= $1";
const getModules = "SELECT * FROM module where pid = $1";
const getModulesBySemester = 'SELECT * FROM module where pid = $1 and semno = $2';
const getElectives = "SELECT * FROM elective WHERE pid = $1";

const getFullHodQuery = 'SELECT dh.*, s.* FROM department_hod dh JOIN staff s ON dh.staffid = s.sid WHERE dh.deptid = $1';
const getFullplQuery = 'SELECT dh.*, s.* FROM programme_leader dh JOIN staff s ON dh.staffid = s.sid WHERE dh.pid = $1';

const removeStaff = "DELETE FROM staff WHERE sid = $1";
const addStaff ="INSERT INTO staff (sid, name, designation, email, imageurl,deptno) VALUES ($1, $2, $3, $4, $5, $6)";
const addHoD = "INSERT INTO department_hod (deptid, staffid, starting_tenure, ending_tenure) VALUES ($1,$2,$3,$4)";
const removeHoD = "DELETE FROM department_hod where staffid = $1";
const addPL = "INSERT INTO programme_leader (deptid, pid, staffid, starting_tenure, ending_tenure) VALUES ($1, $2, $3, $4, $5)";
const removePL = "DELETE FROM programme_leader where staffid = $1";
const checkLogin = "SELECT * FROM student WHERE name = $1 AND password = $2";
const addModule  ="INSERT INTO module (mid, mname, module_credit, lecture_hour, tutorial_hour, practical_hour, theory_ca_marks, theory_exam_marks, practical_ca_marks, semno,module_owner, module_coordinator, pid, borrowed_module) Values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)";
const deleteModule = "DELETE FROM module where mid = $1";
const addElective = "Insert INTO elective (eid,pid,mcode,ename,specilization) Values($1, $2, $3, $4, $5)";
const deleteElective = "DELETE From elective where mcode = $1";
// const getStudents = "SELECT * FROM student";
// const getStudentById = "SELECT * FROM student WHERE ID = $1";
const checkEmailExists = "SELECT COUNT(*) FROM staff WHERE email = $1";
// const addStudent = "INSERT INTO student (name,email, dob) VALUES($1, $2, $3)";
// const removeStudent = "DELETE FROM student WHERE ID = $1";
// const updateStudent = "UPDATE student SET name = $1 WHERE id = $2";


module.exports = { 
    getDepartment,
    getDepartmentById,
    getStaffById,
    getProgrammeById,
    getStaffByDepartment,
    getHeadOfDepartment,
    getProgramLeader,
    getModules,
    getElectives,
    getModulesBySemester,
    getProgrammeByPid,
    getFullHodQuery,
    getFullplQuery,
    removeStaff,
    addStaff,
    checkEmailExists,
    addHoD,
    removeHoD,
    addPL,
    removePL,
    checkLogin,
    addModule,
    deleteModule,
    addElective,
    deleteElective,

}