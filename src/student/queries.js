
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

// const getStudents = "SELECT * FROM student";
// const getStudentById = "SELECT * FROM student WHERE ID = $1";
// const checkEmailExists = "SELECT COUNT(*) FROM student WHERE email = $1";
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

}