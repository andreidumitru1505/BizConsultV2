const conn = require('../dbConn').promise();
const {validationResult} = require('express-validator');

exports.insertExternalCollaboration = async(req,res,next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        var desiredProfitMetric = req.body.hasDesiredProfit ? req.body.desiredProfitMetric : null;
        var actualProfitMetric = req.body.hasDesiredProfit ? req.body.actualProfitMetric : null;

        console.log(req.body);

        const [newCollaboration] = await conn.execute(
            "INSERT INTO `collaborations` (`offerCompanyId`,`requestCompanyName`, `startDate`, `endDate`, `hasDesiredProfit`, `desiredProfitMetric`, `actualProfitMetric`, `isSuccess`, `isExternal`) VALUES (?,?,?,?,?,?,?,?,?)",[
                req.body.companyId,
                req.body.requestCompanyName,
                req.body.startDate,
                req.body.endDate,
                req.body.hasDesiredProfit,
                desiredProfitMetric,
                actualProfitMetric,
                req.body.isSuccess,
                true
            ]
        )

        if(newCollaboration.affectedRows === 0){
            return res.status(422).json({
                message: 'Failed inserting collaboration'
            })
        }

        return res.status(201).json({
            message: 'Collaboration inserted successfully!'
        })

    }
    catch(err){
        console.log(err);
        next(err);
    }
}

exports.getCompanyCollaborations = async(req,res,next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [collaborations] = await conn.execute(
            "SELECT * FROM `collaborations` WHERE (`offerCompanyId`=? OR requestCompanyId=?)",[
                req.body.companyId,
                req.body.companyId
            ]
        )

        var response = []

        for(var i = 0;i < collaborations.length; i++){

            var collaborationSide = req.body.companyId === collaborations[i].offerCompanyId ? 'Offer Service' : 'Request Service';
            var partnerCompanyId = req.body.companyId === collaborations[i].offerCompanyId ? collaborations[i].requestCompanyId : collaborations[i].offerCompanyId
            const [partnerCompany] = await conn.execute(
                "SELECT * FROM `companies` WHERE id=?",[
                    partnerCompanyId
                ]
            )

            var partnerCompanyName = collaborations[0].isExternal ? collaborations[i].requestCompanyName : partnerCompany[0].name;
            response.push({
                partnerCompanyName: partnerCompanyName,
                partnerCompanyId: partnerCompanyId,
                isSuccess: collaborations[i].isSuccess,
                isExternal: collaborations[i].isExternal,
                collaborationId: collaborations[i].id,
                collaborationSide: collaborationSide
            })

        }

        res.contentType('application/json')
        return res.send(JSON.stringify(response));

    }
    catch(err){
        console.log(err);
        next(err);
    }
}