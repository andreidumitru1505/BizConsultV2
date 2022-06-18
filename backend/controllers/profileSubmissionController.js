const {validationResult} = require('express-validator');
const conn = require('../dbConn').promise();
const constants = require('../constants');

exports.submitProfile = async(req,res,next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        if(req.body.role === constants.ENTREPRENEUR_ROLE){
            const [newEntrepreneur] = await conn.execute(
                "INSERT INTO `entrepreneurs` (`firstName`, `lastName`,`age`, `gender`, `emailAddress`, `phoneNumber`, `studiesField`) VALUES (?,?,?,?,?,?,?)",[
                    req.body.firstName,
                    req.body.lastName,
                    req.body.age,
                    req.body.gender,
                    req.body.emailAddress,
                    req.body.phoneNumber,
                    req.body.studiesField
            ]);

            if(newEntrepreneur.affectedRows == 0){
                return res.status(422).json({
                    message: "Failed to submit center admin profile."
                })
            }
            else{
                return res.status(201).json({
                    message: "Profile submitted!"
                })
            }           
        }
        else if(req.body.role === constants.EXPERT_ADMIN_ROLE){
            const [newExpertAdmin] = await conn.execute(
                "INSERT INTO `administrators` (`firstName`,`lastName`, `emailAddress`, `expertField`, `status`) VALUES (?,?,?,?,?)",[
                    req.body.firstName,
                    req.body.lastName,
                    req.body.emailAddress,
                    req.body.expertField,
                    'Awaiting Admin Review'
            ]);
    
            if(newExpertAdmin.affectedRows == 0){
                return res.status(422).json({
                    message: "Failed to submit basic user profile."
                })
            }
            else{
                return res.status(201).json({
                    message: "Profile submitted!"
                })
            }
        }
    }
    catch(err){
        next(err);
    }
}