const conn = require('../dbConn').promise();
const {validationResult} = require('express-validator');
const dbConn = require('../dbConn');

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
            "INSERT INTO `collaborations` (`offerCompanyId`,`requestCompanyName`, `startDate`, `endDate`, `hasDesiredProfit`, `desiredProfitMetric`, `actualProfitMetric`, `isSuccess`, `isExternal`, `status`) VALUES (?,?,?,?,?,?,?,?,?,?)",[
                req.body.companyId,
                req.body.requestCompanyName,
                req.body.startDate,
                req.body.endDate,
                req.body.hasDesiredProfit,
                desiredProfitMetric,
                actualProfitMetric,
                req.body.isSuccess,
                true,
                'Completed'
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
                collaborationSide: collaborationSide,
                status: collaborations[i].status
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

exports.getCollaborationInfo = async(req,res,next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [collaborations] = await conn.execute(
            "SELECT * FROM `collaborations` WHERE id=?",[
                req.body.collaborationId
            ]
        )

        var partnerCompanyName;
        if(collaborations[0].requestCompanyId !== null){
            const [partnerCompany] = await dbConn.execute(
                "SELECT * FROM `companies` WHERE id=?",[
                    collaborations[0].requestCompanyId
                ]
            )
            partnerCompanyName = partnerCompany[0].name;
        }
        else{
            partnerCompanyName = collaborations[0].requestCompanyName
        }


        var collaborationSide = req.body.companyId === collaborations[0].offerCompanyId ? 'Offer Service' : 'Request Service';

        startDate = new Date(collaborations[0].startDate);
        var parsedStartDate = (startDate.getMonth() + 1) + '/' + startDate.getDate() + '/' + startDate.getFullYear();

        endDate = new Date(collaborations[0].endDate);
        var parsedEndDate = (endDate.getMonth() + 1) + '/' + endDate.getDate() + '/' + endDate.getFullYear();


        response = {
            partnerCompanyName: partnerCompanyName,
            isSuccess: collaborations[0].isSuccess,
            isExternal: collaborations[0].isExternal,
            collaborationSide: collaborationSide,
            startDate: parsedStartDate,
            endDate: parsedEndDate,
            hasDesiredProfit: collaborations[0].hasDesiredProfit,
            desiredProfitMetric: collaborations[0].desiredProfitMetric,
            actualProfitMetric: collaborations[0].actualProfitMetric,
            status: collaborations[0].status
        }
        

        res.contentType('application/json')
        return res.send(JSON.stringify(response));

    }
    catch(err){
        console.log(err);
        next(err);
    }
}

exports.requestCollaboration = async(req,res,next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{


        var desiredProfitMetric = req.body.hasDesiredProfit ? req.body.desiredProfitMetric : null;
        const [newCollaboration] = await conn.execute(
            "INSERT INTO `collaborations` (`requestCompanyId`, `offerCompanyId`, `startDate`, `endDate`, `hasDesiredProfit`, `desiredProfitMetric`, `status`) VALUES (?,?,?,?,?,?,?)",[
                req.body.requestCompanyId,
                req.body.offerCompanyId,
                req.body.startDate,
                req.body.endDate,
                req.body.hasDesiredProfit,
                desiredProfitMetric,
                'Awaiting Response'
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

