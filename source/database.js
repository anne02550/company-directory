const {personnel} = require('../database/models');

const buildQuery = (queryParams) => {
    const cleanQuery = {};
    const allowedSearchTerms = ['firstName', 'lastName', 'jobTitle', 'departmentID', 'email'];
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

const addPersonnel = async ({departmentId, jobTitle, firstName, lastName, email}) => {
    return await personnel.create({departmentId, jobTitle, firstName, lastName, email});
};

const deletePersonnel = async (id) => {
    const employee = await personnel.findAll({ where: { id } });
    return await employee[0].destroy();
};

module.exports = {
    getPersonnel,
    addPersonnel,
    deletePersonnel
}