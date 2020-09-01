const {personnel, department, location} = require('../database/models');
const Sequelize = require('sequelize');

const buildQuery = (queryParams) => {
    const cleanQuery = {};
    const allowedSearchTerms = ['id', 'firstName', 'lastName', 'jobTitle', 'departmentId', 'email'];
    for(const key of allowedSearchTerms) {
        value = queryParams[key];
        if(value != null && value != '') {
            cleanQuery[key] = value;
        }
    }
    return cleanQuery;
}

const getPersonnel = async (queryParams) => {
    const query = buildQuery(queryParams);
    return await personnel.findAll({raw: true, where: query });
};

const getJobTitles = async () => {
    return await personnel.findAll({
        attributes: [[Sequelize.fn("DISTINCT", Sequelize.col('jobTitle')), 'jobTitle']],
        raw: true
    });
};

const addPersonnel = async ({departmentId, jobTitle, firstName, lastName, email}) => {
    return await personnel.create({departmentId, jobTitle, firstName, lastName, email});
};

const deletePersonnel = async (id) => {
    const employee = await personnel.findAll({ where: { id } });
    return await employee[0].destroy();
};

const editPersonnel = async ({departmentId, jobTitle, firstName, lastName, email, id}) => {
    const employees = await personnel.findAll({ where: { id } });
    const employee = employees[0];
    employee.firstName = firstName;
    employee.lastName = lastName;
    employee.jobTitle = jobTitle;
    employee.email = email;
    employee.departmentId = departmentId;

    return await employee.save();
};

// get department from database:
const getAllDepartments = async () => {
    return await department.findAll({raw: true});
};
// get location from databasse:
const getAllLocations = async () => {
    return await location.findAll({raw: true});
};

module.exports = {
    getPersonnel,
    addPersonnel,
    deletePersonnel,
    editPersonnel,
    getAllDepartments,
    getAllLocations,
    getJobTitles,
}