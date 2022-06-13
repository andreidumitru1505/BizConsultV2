const conn = require('../dbConn').promise();
const { application } = require('express');
const {validationResult} = require('express-validator');

exports.getExpertDashboardInfo = async (req, res, next) => {

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

        const [expertSolvedApplications] = await conn.execute(
            'SELECT * FROM `applications` WHERE reviewAdminId=? AND (`status`=? OR `status`=?)',[
                expert[0].id,
                "Accepted",
                "Refused"
            ]
        )

        const [expertUnderReviewApplications] = await conn.execute(
            'SELECT * FROM `applications` WHERE reviewAdminId=? AND `status`=?',[
                expert[0].id,
                'Under Review'
            ]
        )
        
        const [companiesAwaitingReview] = await conn.execute(
            'SELECT * FROM `companies` WHERE `industry`=? AND `isActive`=0',[
                expert[0].expertField
            ]
        )

        var openApplications = 0;
        for(var i = 0; i < companiesAwaitingReview.length; i++){
            var [application] = await conn.execute(
                'SELECT * FROM `applications` WHERE `companyId`=? AND `status`=?',[
                    companiesAwaitingReview[i].id,
                    'Awaiting Review'
                ]
            )
            if(application.length !== 0){
                openApplications++;
            }
        }

        var response = [];

        response.push({
            openApplications: openApplications,
            underReviewApplications: expertUnderReviewApplications.length,
            solvedApplications: expertSolvedApplications.length
        })

        res.contentType('application/json')
        return res.send(JSON.stringify(response));

    }
    catch(err){
        console.log(err);
        next(err);
    } 
}

exports.getOpenApplications = async (req, res, next) => {

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
        
        const [companiesAwaitingReview] = await conn.execute(
            'SELECT * FROM `companies` WHERE `industry`=? AND `isActive`=0',[
                expert[0].expertField
            ]
        )

        var response = [];

        for(var i = 0; i < companiesAwaitingReview.length; i++){
            var [application] = await conn.execute(
                'SELECT * FROM `applications` WHERE `companyId`=? AND `status`=?',[
                    companiesAwaitingReview[i].id,
                    'Awaiting Review'
                ]
            )
            if(application.length !== 0){
                date = new Date(companiesAwaitingReview[i].foundedDate);
                var parsedDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
                response.push({
                    id: companiesAwaitingReview[i].id,
                    name: companiesAwaitingReview[i].name,
                    size: companiesAwaitingReview[i].size,
                    value: companiesAwaitingReview[i].value,
                    foundedDate: parsedDate
                })
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

exports.getExpertDashboardInfo = async (req, res, next) => {

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

        const [expertSolvedApplications] = await conn.execute(
            'SELECT * FROM `applications` WHERE reviewAdminId=? AND (`status`=? OR `status`=?)',[
                expert[0].id,
                "Accepted",
                "Refused"
            ]
        )

        const [expertUnderReviewApplications] = await conn.execute(
            'SELECT * FROM `applications` WHERE reviewAdminId=? AND `status`=?',[
                expert[0].id,
                'Under Review'
            ]
        )
        
        const [companiesAwaitingReview] = await conn.execute(
            'SELECT * FROM `companies` WHERE `industry`=? AND `isActive`=0',[
                expert[0].expertField
            ]
        )

        var openApplications = 0;
        for(var i = 0; i < companiesAwaitingReview.length; i++){
            var [application] = await conn.execute(
                'SELECT * FROM `applications` WHERE `companyId`=? AND `status`=?',[
                    companiesAwaitingReview[i].id,
                    'Awaiting Review'
                ]
            )
            if(application.length !== 0){
                openApplications++;
            }
        }

        var response = [];

        response.push({
            openApplications: openApplications,
            underReviewApplications: expertUnderReviewApplications.length,
            solvedApplications: expertSolvedApplications.length
        })

        res.contentType('application/json')
        return res.send(JSON.stringify(response));

    }
    catch(err){
        console.log(err);
        next(err);
    } 
}

exports.getUnderReviewApplications = async (req, res, next) => {

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
        
        const [applicationsUnderReview] = await conn.execute(
            'SELECT * FROM `applications` WHERE `reviewAdminId`=? AND `status`=?',[
                expert[0].id,
                'Under Review'
            ]
        )

        var response = [];

        for(var i = 0; i < applicationsUnderReview.length; i++){
            var [company] = await conn.execute(
                'SELECT * FROM `companies` WHERE `id`=?',[
                    applicationsUnderReview[i].companyId,
                ]
            )

            date = new Date(company[0].foundedDate);
            var parsedDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
            response.push({
                id: company[0].id,
                name: company[0].name,
                size: company[0].size,
                value: company[0].value,
                foundedDate: parsedDate
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