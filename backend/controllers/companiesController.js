const {validationResult} = require('express-validator');
const conn = require('../dbConn').promise();
const constants = require('../constants');

exports.insertCompany = async(req,res,next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [entrepreneur] = await conn.execute(
            "SELECT * FROM `entrepreneurs` WHERE `emailAddress`=?",[
                req.body.emailAddress
            ]
        )
        console.log("1");

        foundedDate = req.body.foundedDate ? req.bodyFoundedDate : new Date();

        const [newCompany] = await conn.execute(
            "INSERT INTO `companies` (`entrepreneurId`, `name`, `industry`, `description`, `website`, `value`, `cif`, `size`, `isActive`, `isPlatformRecommendation`, `isIdeaGenerated`, `mainLocationCity`, `mainLocationCountry`, `foundedDate`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[
                entrepreneur[0].id,
                req.body.name,
                req.body.industry,
                req.body.description,
                req.body.website,
                req.body.value,
                req.body.cif,
                req.body.size,
                false,
                req.body.isPlatformRecommendation,
                req.body.isIdeaGenerated,
                req.body.mainLocationCity,
                req.body.mainLocationCountry,
                req.body.foundedDate
            ]
        )
        
        const [newCompanyId] = await conn.execute(
            "SELECT * FROM `companies` ORDER BY id DESC LIMIT 1;"
        )

        const [newApplication] = await conn.execute(
            "INSERT INTO `applications` (`companyId`, `status`) VALUES (?,?)",[
                newCompanyId[0].id,
                'Awaiting Review'
            ]
        )

        console.log("sda");
        if(newCompany.affectedRows === 0){
            return res.status(422).json({
                message: 'Failed inserting company'
            })
        }
        else{
            if(req.body.isIdeaGenerated){
                const [updateIdea] = await conn.execute(
                    "UPDATE `industryIdeas` SET `isConverted`=?, `companyId`=? WHERE `id`=?",[
                        true,
                        newCompanyId[0].id,
                        req.body.industryIdeaId
                    ]
                )
        
                if(updateIdea.affectedRows === 0){
                    return res.status(422).json({
                        message: 'Failed inserting company'
                    })
                }
                else{
                    return res.status(201).json({
                        message: 'Company inserted!'
                    })
                }
            }

            return res.status(201).json({
                message: 'Company inserted!'
            })
        }

    }
    catch(err){
        console.log(err);
        next(err);
    }
}

exports.getCompanyDashboardInformation = async(req,res,next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [company] = await conn.execute(
            "SELECT * FROM `companies` WHERE `id`=?",[
                req.body.companyId
            ]
        )
        
        const [revenueCollaborations] = await conn.execute(
            "SELECT * FROM `collaborations` WHERE `offerCompanyId`=?",[
                req.body.companyId
            ]
        )

        var earnings = 0;
        for(var i = 0; i < revenueCollaborations.length; i++){
            if(revenueCollaborations[i].hasDesiredProfit){
                earnings += revenueCollaborations[i].actualProfitMetric;
            }
        }

        const [allCollaborations] = await conn.execute(
            'SELECT * FROM `collaborations` WHERE (offerCompanyId=? OR requestCompanyId=?)',[
                req.body.companyId,
                req.body.companyId
            ]
        )


        var rating = company[0].rating === null ? 0 : company[0].rating
        var response = {
            rating: rating,
            earnings: earnings,
            collaborationsNo: allCollaborations.length,
            name: company[0].name
        }

        res.contentType('application/json')
        return res.send(JSON.stringify(response));


    }
    catch(err){
        console.log(err);
        next(err);
    }
}

exports.getCompaniesByIndustry = async(req,res,next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [entrepreneur] = await conn.execute(
            'SELECT * FROM `entrepreneurs` WHERE emailAddress=?',[
                req.body.emailAddress
            ]
        )

        const [companies] = await conn.execute(
            "SELECT * FROM `companies` WHERE industry=? AND entrepreneurId<>? AND isActive=? ORDER BY rating DESC",[
                req.body.industry,
                entrepreneur[0].id,
                true
            ]
        )
        
        var response = []

        for(var i = 0; i < companies.length; i++){
            response.push({
                name: companies[i].name,
                industry: companies[i].industry,
                website: companies[i].website,
                city: companies[i].mainLocationCity,
                country: companies[i].country,
                companyId: companies[i].id,
                rating: companies[i].rating
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