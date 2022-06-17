const conn = require('../dbConn').promise();
const {validationResult} = require('express-validator');
const dbConn = require('../dbConn');

const MONTH_MAP = new Map([
    [1, 'January'],
    [2, 'February'],
    [3, 'March'],
    [4, 'April'],
    [5, 'May'],
    [6, 'June'],
    [7, 'July'],
    [8, 'August'],
    [9, 'September'],
    [10, 'October'],
    [11, 'November'],
    [12, 'December']
])

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
            "SELECT * FROM `collaborations` WHERE (`offerCompanyId`=? OR requestCompanyId=?) AND `status`=?",[
                req.body.companyId,
                req.body.companyId,
                req.body.status
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

            var partnerCompanyName = collaborations[i].isExternal ? collaborations[i].requestCompanyName : partnerCompany[0].name;
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
            if(collaborations[0].requestCompanyId === req.body.companyId) {
                const [partnerCompany] = await conn.execute(
                    "SELECT * FROM `companies` WHERE id=?",[
                        collaborations[0].offerCompanyId
                    ]
                )
                partnerCompanyName = partnerCompany[0].name
            }
            else{
                const [partnerCompany] = await conn.execute(
                    "SELECT * FROM `companies` WHERE id=?",[
                        collaborations[0].requestCompanyId
                    ]
                )
                partnerCompanyName = partnerCompany[0].name
            }

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
            status: collaborations[0].status,
            collaborationId: collaborations[0].id,
            proposeFinish: collaborations[0].proposeFinish,
            proposeFinishProfitMetric: collaborations[0].proposeFinishProfitMetric,
            proposeFinishSuccess: collaborations[0].proposeFinishSuccess
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
            "INSERT INTO `collaborations` (`requestCompanyId`, `offerCompanyId`, `startDate`, `endDate`, `hasDesiredProfit`, `desiredProfitMetric`, `status`, `isExternal`) VALUES (?,?,?,?,?,?,?,?)",[
                req.body.requestCompanyId,
                req.body.offerCompanyId,
                req.body.startDate,
                req.body.endDate,
                req.body.hasDesiredProfit,
                desiredProfitMetric,
                'Awaiting Response',
                false
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

exports.acceptCollaboration = async(req,res,next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [collaborationUpdate] = await conn.execute(
            "UPDATE `collaborations` SET status=? WHERE id=?",[
                'Ongoing',
                req.body.collaborationId
            ]
        )

        if(collaborationUpdate.affectedRows === 0){
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

exports.refuseCollaboration = async(req,res,next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [collaborationUpdate] = await conn.execute(
            "UPDATE `collaborations` SET status=? WHERE id=?",[
                'Refused',
                req.body.collaborationId
            ]
        )

        if(collaborationUpdate.affectedRows === 0){
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

exports.proposeFinishCollaboration = async(req,res,next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [collaborationUpdate] = await conn.execute(
            "UPDATE `collaborations` SET proposeFinish=?, proposeFinishProfitMetric=?, proposeFinishSuccess=?, requestCompanyReview=? WHERE id=?",[
                true,
                req.body.proposeFinishProfitMetric,
                req.body.proposeFinishSuccess,
                req.body.requestCompanyReview,
                req.body.collaborationId
            ]
        )

        if(collaborationUpdate.affectedRows === 0){
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

exports.acceptProposedFinishCollaboration = async(req,res,next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{
        const [collaboration] = await conn.execute(
            "SELECT * FROM `collaborations` WHERE id=?",[
                req.body.collaborationId
            ]
        )

        const [collaborationUpdate] = await conn.execute(
            "UPDATE `collaborations` SET status=?, actualProfitMetric=?, isSuccess=? WHERE id=?",[
                'Completed',
                collaboration[0].proposeFinishProfitMetric,
                collaboration[0].proposeFinishSuccess,
                req.body.collaborationId
            ]
        )

        const [offerCompany] = await conn.execute(
            "SELECT * FROM `companies` WHERE id=?",[
                collaboration[0].offerCompanyId
            ]
        )

        var rating;
        if(collaboration[0].hasDesiredProfit){
            console.log(collaboration[0].proposeFinishProfitMetric);
            console.log(collaboration[0].desiredProfitMetric);
            console.log(offerCompany[0].rating);
            rating = ((Number(collaboration[0].proposeFinishProfitMetric) / Number(collaboration[0].desiredProfitMetric) * 5.0) + offerCompany[0].rating) / 2.0;
            const [updateCompany] = await conn.execute(
                "UPDATE `companies` SET rating=? WHERE id=?",[
                    rating,
                    collaboration[0].offerCompanyId
                ]
            )
        }


        if(collaborationUpdate.affectedRows === 0){
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

exports.refuseProposedFinishCollaboration = async(req,res,next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [collaborationUpdate] = await conn.execute(
            "UPDATE `collaborations` SET proposeFinishProfitMetric=?, proposeFinishSuccess=?, proposeFinish=? WHERE id=?",[
                null,
                null,
                null,
                req.body.collaborationId
            ]
        )

        if(collaborationUpdate.affectedRows === 0){
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

exports.getReviews = async(req,res,next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [collaborations] = await conn.execute(
            "SELECT * FROM `collaborations` WHERE offerCompanyId=? AND status=? ORDER BY startDate, endDate ASC",[
                req.body.companyId,
                'Completed'
            ]
        )

        var response=[];
        for(var i = 0; i < collaborations.length; i++){


            startDate = new Date(collaborations[i].startDate);
            startDateMonth = startDate.getMonth() + 1;
            var parsedStartDate = MONTH_MAP.get(startDateMonth) + ' ' + startDate.getFullYear();

            endDate = new Date(collaborations[i].endDate);
            endDateMonth = endDate.getMonth() + 1;
            var parsedEndDate = MONTH_MAP.get(endDateMonth) + ' ' + endDate.getFullYear();

            response.push({
                startDate: parsedStartDate,
                endDate: parsedEndDate,
                review: collaborations[i].requestCompanyReview
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

