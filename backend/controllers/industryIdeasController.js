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
        var  earnings = 0;
        var  companiesNo = 0;

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