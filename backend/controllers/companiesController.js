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

        isPlatformGenerated = false;
        isIdeaGenerated = false;

        const [entrepreneur] = await conn.execute(
            "SELECT * FROM `entrepreneurs` WHERE `emailAddress`=?",[
                req.body.emailAddress
            ]
        )
        console.log("1");

        const [industryIdeas] = await conn.execute(
            "SELECT * FROM `industryIdeas` WHERE `entrepreneurId`=?",[
                entrepreneur[0].id
            ]
        )
        console.log("2");

        for(var i = 0; i < industryIdeas.length; i++){
            if(industryIdeas[i].isConverted){
                continue;
            }
            if(industryIdeas[i].industry === req.body.industry){
                isPlatformGenerated = true;
                isIdeaGenerated = industryIdeas[i].isPlatformIdea;
                break;
            }
        }

        foundedDate = req.body.foundedDate ? req.bodyFoundedDate : new Date();

        const [newCompany] = await conn.execute(
            "INSERT INTO `companies` (`entrepreneurId`, `industry`, `description`, `website`, `value`, `cif`, `size`, `isActive`, `isPlatformGenerated`, `isIdeaGenerated`, `mainLocationCity`, `mainLocationCountry`, `foundedDate`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",[
                entrepreneur[0].id,
                req.body.industry,
                req.body.description,
                req.body.website,
                req.body.value,
                req.body.cif,
                req.body.size,
                true,
                isPlatformGenerated,
                isIdeaGenerated,
                req.body.mainLocationCity,
                req.body.mainLocationCountry,
                foundedDate
            ]
        )
        
        const [newCompanyId] = await conn.execute(
            "SELECT * FROM `companies` ORDER BY id DESC LIMIT 1;"
        )
        console.log("sda");
        if(newCompany.affectedRows === 0){
            return res.status(422).json({
                message: 'Failed inserting company'
            })
        }
        else{
            if(isPlatformGenerated){
                const [updateIdea] = await conn.execute(
                    "UPDATE `industryIdeas` SET `isConverted`=?, `companyId`=? WHERE `entrepreneurId`=?",[
                        true,
                        newCompanyId[0].id,
                        entrepreneur[0].id
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
        next(err);
    }
}