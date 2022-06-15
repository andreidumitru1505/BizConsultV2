const conn = require('../dbConn').promise();
const {validationResult} = require('express-validator');

exports.reviewApplication = async (req, res, next) => {

    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [expert] = await conn.execute(
            'SELECT * FROM `administrators` WHERE emailAddress=?',[
                req.body.emailAddress
        ])

        const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

        const [updateApplication] = await conn.execute(
            'UPDATE `applications` SET `status`=?, `reviewAdminId`=?, reviewStart=? WHERE companyId=?',[
                'Under Review',
                expert[0].id,
                currentDate,
                req.body.companyId
            ]
        )

        if(updateApplication.affectedRows === 0){
            return res.status(422).json({
                message: 'Failed updating application'
            })
        }

        return res.status(201).json({
            message: 'Application updated successfully!'
        })

    }
    catch(err){
        console.log(err);
        next(err);
    }
}

exports.getApplication = async (req, res, next) => {

    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [expert] = await conn.execute(
            'SELECT * FROM `administrators` WHERE emailAddress=?',[
                req.body.emailAddress
        ])

        const [company] = await conn.execute(
            'SELECT * FROM `companies` WHERE id=?',[
                req.body.companyId
            ]
        )

        const [application] = await conn.execute(
            'SELECT * FROM `applications` WHERE companyId=?',[
                company[0].id
            ]
        )

        const [entrepreneur] = await conn.execute(
            'SELECT * FROM `entrepreneurs` WHERE id=?',[
                company[0].entrepreneurId
            ]
        )

        foundedDate = new Date(company[0].foundedDate);
        var parsedFoundedDate = (foundedDate.getMonth() + 1) + '/' + foundedDate.getDate() + '/' + foundedDate.getFullYear();

        reviewStartDate = new Date(application[0].reviewStart);
        var parsedReviewStartDate = (reviewStartDate.getMonth() + 1) + '/' + reviewStartDate.getDate() + '/' + reviewStartDate.getFullYear() + ' ' + reviewStartDate.getHours() + ':' + reviewStartDate.getMinutes();
        
        var parsedReviewEndDate = 'None';
        if(application[0].reviewEnd !== null){
            reviewEndDate = new Date(application[0].reviewEnd);
            var parsedReviewEndDate = (reviewEndDate.getMonth() + 1) + '/' + reviewEndDate.getDate() + '/' + reviewEndDate.getFullYear() + ' ' + reviewEndDate.getHours() + ':' + reviewEndDate.getMinutes();
        }

        var response={
            company: {
                name: company[0].name,
                description: company[0].description,
                website: company[0].website,
                value: company[0].value,
                cif: company[0].cif,
                size: company[0].size,
                mainLocationCity: company[0].mainLocationCity,
                mainLocationCountry: company[0].mainLocationCountry,
                foundedDate: parsedFoundedDate,
                id: company[0].id
            },
            application: {
                status: application[0].status,
                notes: application[0].notes,
                reason: application[0].reason,
                reviewStart: parsedReviewStartDate,
                reviewEnd: parsedReviewEndDate,
                reviewTimeTaken: application[0].reviewTimeTaken
            },
            entrepreneur: {
                firstName: entrepreneur[0].firstName,
                lastName: entrepreneur[0].lastName,
                emailAddress: entrepreneur[0].emailAddress,
                phoneNumber: entrepreneur[0].phoneNumber,
                studiesField: entrepreneur[0].studiesField
            }
        }

        res.contentType('application/json')
        return res.send(JSON.stringify(response));
    }
    catch(err){
        console.log(err);
        next(err);
    }
}

exports.updateApplicationNotes = async (req, res, next) => {

    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [updateApplication] = await conn.execute(
            'UPDATE `applications` SET notes=? WHERE companyId=?',[
                req.body.notes,
                req.body.companyId
            ]
        )

        if(updateApplication.affectedRows === 0){
            return res.status(422).json({
                message: 'Failed updating application'
            })
        }

        return res.status(201).json({
            message: 'Application updated successfully!'
        })

    }
    catch(err){
        console.log(err);
        next(err);
    }
}

exports.rejectApplication = async (req, res, next) => {

    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

        const [updateApplication] = await conn.execute(
            'UPDATE `applications` SET reason=?, status=?, reviewEnd=? WHERE companyId=?',[
                req.body.reason,
                'Rejected',
                currentDate,
                req.body.companyId
            ]
        )

        if(updateApplication.affectedRows === 0){
            return res.status(422).json({
                message: 'Failed updating application'
            })
        }

        return res.status(201).json({
            message: 'Application updated successfully!'
        })

    }
    catch(err){
        console.log(err);
        next(err);
    }
}

exports.acceptApplication = async (req, res, next) => {

    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ')

        const [updateApplication] = await conn.execute(
            'UPDATE `applications` SET reason=?, status=?, reviewEnd=? WHERE companyId=?',[
                req.body.reason,
                'Accepted',
                currentDate,
                req.body.companyId
            ]
        )

        const [company] = await conn.execute(
            'SELECT * FROM `companies` WHERE id=?',[
                req.body.companyId
            ]
        )

        const [collaborations] = await conn.execute(
            'SELECT * FROM `collaborations` WHERE offerCompanyId=?',[
                company[0].id
            ]
        )

        var rating = new Number(3.5);
        for(var i = 0; i < collaborations.length; i++){
            if(collaborations[i].hasDesiredProfit){
                rating = ((Number(collaborations[i].actualProfitMetric) / Number(collaborations[i].desiredProfitMetric) * 5.0) + rating) / 2.0;
                rating = rating > 5 ? 5 : rating;
            }
        }

        const [companyUpdate] = await conn.execute(
            'UPDATE `companies` SET rating=?, isActive=? WHERE id=?',[
                rating,
                true,
                req.body.companyId
            ]
        )

        if(updateApplication.affectedRows === 0){
            return res.status(422).json({
                message: 'Failed updating application'
            })
        }

        return res.status(201).json({
            message: 'Application updated successfully!'
        })

    }
    catch(err){
        console.log(err);
        next(err);
    }
}