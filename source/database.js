const { personnel, department, location } = require('../database/models');
const Sequelize = require('sequelize');

//  Find employee form, function buildQuery reads the query in the url and transform it into a sequelize query that can be used in the function getPersonel to return data. 
const buildQuery = (queryParams) => {
    const cleanQuery = {};
    const allowedSearchStringTerms = ['firstName', 'lastName', 'jobTitle', 'email'];
    const allowedSearchIntTerms = ['id', 'departmentId'];

    for (const key of allowedSearchStringTerms) {
        value = queryParams[key];
        if (value != null && value != '') {
            cleanQuery[key] = Sequelize.where(
                    Sequelize.fn('LOWER', Sequelize.col(key)), 'LIKE', `%${value.toLowerCase()}%`) // mysql doesn't support iLike
        }
    };

    for (const key of allowedSearchIntTerms) {
        value = queryParams[key];
        if (value != null && value != '') {
            cleanQuery[key] = value;
        }
    }

    console.log(cleanQuery);
    return cleanQuery;
}

// function getPersonel use the sequelize query created by buildQuery to return correct personel in JSON.
const getPersonnel = async(queryParams) => {
    const query = buildQuery(queryParams);
    return await personnel.findAll({ raw: true, where: query });
};

// function getJobTitles run a query to return distinct job titles from personel table
const getJobTitles = async() => {
    return await personnel.findAll({
        attributes: [
            [Sequelize.fn("DISTINCT", Sequelize.col('jobTitle')), 'jobTitle']
        ],
        raw: true
    });
};

// function addPersonell take the data that user enter and add them into database
const addPersonnel = async({ departmentId, jobTitle, firstName, lastName, email }) => {
    return await personnel.create({ departmentId, jobTitle, firstName, lastName, email });
};

// find personel by ID and delete that
const deletePersonnel = async(id) => {
    const employee = await personnel.findAll({ where: { id } });
    return await employee[0].destroy();
};

// function editPersonell find personel by id then edit data and then save
const editPersonnel = async({ departmentId, jobTitle, firstName, lastName, email, id }) => {
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
const getAllDepartments = async() => {
    return await department.findAll({ raw: true });
};
// get location from databasse:
const getAllLocations = async() => {
    return await location.findAll({ raw: true });
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