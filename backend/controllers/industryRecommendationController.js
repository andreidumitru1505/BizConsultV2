const {validationResult} = require('express-validator');
const constants = require('../constants');
const conn = require('../dbConn').promise();

const STUDIES_MAP = new Map([
    ['Software Engineering', 1],
    ['Business Administration', 2],
    ['Social Sciences', 3],
    ['Commerce', 4],
    ['Science & Engineering', 5],
    ['Economics', 6],
    ['Psychology', 3],
    ['Electrical Engineering', 7],
    ['Marketing', 8],
    ['Mechanical Engineering', 9],
    ['Robotics', 7],
    ['Medicine', 10],
    ['Journalism', 11],
    ['Finance', 6],
    ['Telecommunications', 12],
    ['Logistics', 13],
    ['Tourism', 14],
    ['Law', 15],
    ['Transportation', 9]
])
const INDUSTRY_MAP = new Map([
    [1, 'Artificial intelligence'],
    [2, 'Auto & transportation'],
    [3, 'Edtech'],
    [4, 'Internet services'],
    [5, 'Fintech'],
    [6, 'Hardware'],
    [7, 'Health'],
    [8, 'Supply chain, logistics, & delivery'],
    [9, 'Consumer & retail'],
    [10, 'E-commerce & direct-to-consumer'],
    [11, 'Travel'],
    [12, 'Law Consultation']
])

const GENDER_MAP = new Map([
    ['MALE', 1],
    ['FEMALE', 2]
])

exports.getRecommendation = async(req,res,next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [entrepreneurSearch] = await conn.execute(
            "SELECT * FROM `entrepreneurs` WHERE emailAddress=?",[
                req.body.emailAddress
        ]);

        console.log(entrepreneurSearch[0].studiesField);
        const {spawn} = require("child_process");
        const pythonProcess = spawn('python3',['../algoML/classificationModelPredict.py', STUDIES_MAP.get(entrepreneurSearch[0].studiesField).toString(), entrepreneurSearch[0].age.toString(), GENDER_MAP.get(entrepreneurSearch[0].gender).toString()]);

        pythonProcess.stdout.on('data', (data) => {
            let x = `${data}`;
            res.contentType('application/json');
            return res.send(JSON.stringify(parseInt(x)));
        });
    }
    catch(err){
        next(err);
    }
}