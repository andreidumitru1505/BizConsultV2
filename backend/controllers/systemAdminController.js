const conn = require('../dbConn').promise();
const {validationResult} = require('express-validator');

exports.getSysAdminDashboardInfo = async (req, res, next) => {

    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [companies] = await conn.execute(
            'SELECT * FROM `companies` WHERE isActive=?',[
                true
        ])

        const [collaborations] = await conn.execute(
            'SELECT * FROM `collaborations` WHERE status=?',[
                'Completed'
        ])

        const [entrepreneurs] = await conn.execute(
            'SELECT * FROM `entrepreneurs`')


        const [inactiveExperts] = await conn.execute(
            'SELECT * FROM `administrators` WHERE status=?',[
            "Awaiting Admin Review"
        ])

        var experts = [];
        for(var i = 0; i < inactiveExperts.length; i++){
            experts.push({
                id: inactiveExperts[i].id,
                firstName: inactiveExperts[i].firstName,
                lastName: inactiveExperts[i].lastName,
                expertField: inactiveExperts[i].expertField,
                emailAddress: inactiveExperts[i].emailAddress
            })
        }

        var response = {
            activeCompanies: companies.length,
            completedCollaborations: collaborations.length,
            entrepreneurs: entrepreneurs.length,
            experts: experts
        }

        res.contentType('application/json')
        return res.send(JSON.stringify(response));

    }
    catch(err){
        console.log(err);
        next(err);
    }
}