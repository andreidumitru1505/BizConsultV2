const {validationResult} = require('express-validator');
const constants = require('../constants');
const conn = require('../dbConn').promise();

exports.getEntrepreneurIdeas = async (req, res, next) => {

    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [entrepreneur] = await conn.execute(
            'SELECT * FROM `entrepreneurs` WHERE emailAddress=?',[
                req.body.emailAddress
        ])

        const [ideas] = await conn.execute(
            'SELECT * FROM `industryIdeas` WHERE entrepreneurId=?',[
                entrepreneur[0].id
            ]
        )

        var response = [];

        for(var i = 0; i < ideas.length; i++){
            var companyName = '', companyId = '';
            if(ideas[i].isConverted){
                const [company] = await conn.execute(
                    'SELECT * FROM `companies` WHERE id=?',[
                        ideas[i].companyId
                    ]
                )
                companyName = company[0].name;
                companyId = company[0].id
            }

            response.push({
                id: ideas[i].id,
                industry: ideas[i].industry,
                isConverted: ideas[i].isConverted,
                isPlatformIdea: ideas[i].isPlatformIdea,
                companyName: companyName,
                companyId: companyId
            })

        }

        res.contentType('application/json')
        return res.send(JSON.stringify(response));

    }
    catch(err){
        next(err);
    }
}

exports.lockInEntrepreneurIdea = async (req, res, next) => {

    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [entrepreneur] = await conn.execute(
            'SELECT * FROM `entrepreneurs` WHERE emailAddress=?',[
                req.body.emailAddress
        ])

        const [newIdea] = await conn.execute(
            'INSERT INTO `industryIdeas` (`entrepreneurId`, `industry`, `isConverted`, `isPlatformIdea`) VALUES (?,?,?,?)',[
                entrepreneur[0].id,
                req.body.industryName,
                false,
                req.body.isPlatformIdea
            ]
        )

        if(newIdea.affectedRows === 0){
            return res.status(422).json({
                message: 'Failed to lock in idea!'
            })
        }

        return res.status(201).json({
            message: 'Idea locked in!'
        })
    }
    catch(err){
        next(err);
    }
}