const conn = require('../dbConn').promise();
const {validationResult} = require('express-validator');

exports.getEntrepreneurs = async (req,res,next) => {

    try{
 
        const [rows] = await conn.execute('SELECT * FROM `entrepreneurs`');
        res.contentType('application/json');
        return res.send(JSON.stringify(rows));  
    }
    catch(err){
        next(err);
    }
}

exports.getProfileInfo = async (req, res, next) => {

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

        var response = [];

        response.push({
            firstName: entrepreneur[0].firstName,
            lastName: entrepreneur[0].lastName,
            age: entrepreneur[0].age,
            gender: entrepreneur[0].gender,
            phoneNumber: entrepreneur[0].phoneNumber,
            studiesField: entrepreneur[0].studiesField
        })

        res.contentType('application/json')
        return res.send(JSON.stringify(response));

    }
    catch(err){
        next(err);
    }
}


exports.getDashboardInfo = async (req, res, next) => {

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

        const [companies] = await conn.execute(
            'SELECT * FROM `companies` WHERE entrepreneurId=?',[
                entrepreneur[0].id
            ]
        )

        var companiesList = [];
        var response = [];
        var  earnings = 0;
        var  companiesNo = 0;

        for (var i = 0; i < companies.length; i++){
            var status;
            if(companies[i].isActive){
                status = 'Active';
                companiesNo++;
            }
            else{
                const [applicationSearch] = await conn.execute(
                    'SELECT * FROM `applications` WHERE companyId=?',[
                        companies[i].id
                    ]
                )
                if(applicationSearch[0].status === 'Accepted'){
                    status = 'Inactive'
                    companiesNo++;
                }
                else{
                    status = applicationSearch[0].status;
                }
            }
            const [collaborations] = await conn.execute(
                'SELECT * FROM `collaborations` WHERE offerCompanyId=?',[
                    companies[i].id
                ]
            )

            for(var j = 0; j < collaborations.length; j++){
                earnings += collaborations[j].actualProfitMetric;
            }

            companiesList.push({
                companyId: companies[i].id,
                industry: companies[i].industry,
                size: companies[i].size,
                isActive: companies[i].isActive,
                status: status
            })
        }

        response.push({
            companiesNo: companiesNo,
            ideasNo: ideas.length,
            earnings: earnings,
            companies: companiesList,
            status
        })

        res.contentType('application/json')
        return res.send(JSON.stringify(response));

    }
    catch(err){
        console.log(err);
        next(err);
    }
}

exports.updateProfileInfo = async (req, res, next) => {

    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{
        if(req.body.firstNameUpdate){
            const [updateFirstName] = await conn.execute(
                'UPDATE `entrepreneurs` SET firstName=? WHERE emailAddress=?',[
                    req.body.firstNameUpdate,
                    req.body.emailAddress
                ]
            )
        }
        if(req.body.lastNameUpdate){
            const [updateLastName] = await conn.execute(
                'UPDATE `entrepreneurs` SET lastName=? WHERE emailAddress=?',[
                    req.body.lastNameUpdate,
                    req.body.emailAddress
                ]
            )
        }
        if(req.body.ageUpdate){
            const [updateAge] = await conn.execute(
                'UPDATE `entrepreneurs` SET age=? WHERE emailAddress=?',[
                    req.body.ageUpdate,
                    req.body.emailAddress
                ]
            )
        }
        if(req.body.genderUpdate){
            const [updateGender] = await conn.execute(
                'UPDATE `entrepreneurs` SET gender=? WHERE emailAddress=?',[
                    req.body.genderUpdate,
                    req.body.emailAddress
                ]
            )
        }
        if(req.body.phoneNumberUpdate){
            const [updatePhoneNumber] = await conn.execute(
                'UPDATE `entrepreneurs` SET phoneNumber=? WHERE emailAddress=?',[
                    req.body.phoneNumberUpdate,
                    req.body.emailAddress
                ]
            )
        }
        if(req.body.studiesFieldUpdate){
            const [updateStudiesField] = await conn.execute(
                'UPDATE `entrepreneurs` SET studiesField=? WHERE emailAddress=?',[
                    req.body.studiesFieldUpdate,
                    req.body.emailAddress
                ]
            )
        }


        return res.status(201).json({
            message: "Profile updated!"
        })

    }
    catch(err){
        next(err);
    }
}

