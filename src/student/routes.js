const {Router} = require('express');
const controller = require('./controller')

const router = Router();

router.get('/department', controller.getDepartment);
router.get('/department/:id', controller.getDepartmentById);
router.get('/departmentdetails/:id', controller.getfullDepartmentById);
router.get('/departmenthod/:id', controller.getHeadOfDepartment);
router.get('/staff/:id', controller.getStaffById);
router.get('/staff/department/:id', controller.getStaffByDepartment);
router.get('/programme/:id', controller.getProgrammeById);
router.get('/programmedetails/:id', controller.getfullProgrammeById);
router.get('/programme/pl/:id', controller.getProgramLeader);
router.get('/modules/:id', controller.getModules);
router.get('/modules/:id/:semno', controller.getModulesBySemester);
router.get('/electives/:id', controller.getElectives);
router.get('/department/fullHod/:id', controller.getFullHodById);
router.get('/programme/fullPl/:id', controller.getFullPlById);

router.delete('/staff/delete/:id', controller.removeStaff);



// router.get('/',controller.getStudents);
// router.post('/', controller.addStudent);
// router.get('/:id',controller.getStudentById);
// router.put('/:id', controller.updateStudent);
// router.delete('/:id', controller.removeStudent);



module.exports = router;