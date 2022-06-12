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
            undeReviewApplications: expertUnderReviewApplications.length,
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