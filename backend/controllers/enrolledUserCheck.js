const {validationResult} = require('express-validator');
const conn = require('../dbConn').promise();
const constants = require('../constants');

exports.enrolledUserCheck = async(req,res,next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{
        const [entrepreneurSearch] = await conn.execute(
            "SELECT * FROM `entrepreneurs` WHERE emailAddress=?",[
                req.body.emailAddress
        ]);
        const [adminSerach] = await conn.execute(
            "SELECT * FROM `administrators` WHERE emailAddress=?",[
                req.body.emailAddress
        ]);

        found = null;
        role = null;
        var response = [];

        if(entrepreneurSearch.length !== 0){
            found = entrepreneurSearch[0];
            role = constants.ENTREPRENEUR_ROLE;
        }
        else if(adminSerach.length !== 0){
            found = adminSerach[0];
            role = (found.expertField === constants.SYS_ADMIN_ROLE) ? constants.SYS_ADMIN_ROLE : constants.EXPERT_ADMIN_ROLE;
        }
        if(found === null){
            return res.status(201).json({
                message: "NOT_EXISTING"
            })
        }
        else{
            response.push({
                id : found.id,
                firstName: found.firstName,
                lastName: found.lastName,
                emailAddress: found.emailAddress,
                role: role
            })
            res.contentType('application/json');
            return res.send(JSON.stringify(response[0]));
        }
    }
    catch(err){
        next(err);
    }
}