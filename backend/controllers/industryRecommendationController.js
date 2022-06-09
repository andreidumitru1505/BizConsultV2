const {validationResult} = require('express-validator');
const constants = require('../constants');

const STUDIES_MAP = new Map([
    ['SFTENG', 1],
    ['BIZADM', 2],
    ['SOCSCI', 3],
    ['COMM', 4],
    ['SCIENG', 5],
    ['ECON', 6],
    ['PSY', 3],
    ['ELENG', 7],
    ['MARKETING', 8],
    ['MCHENG', 9],
    ['ROB', 7],
    ['MED', 10],
    ['JOURN', 11],
    ['FIN', 6],
    ['TELECOMM', 12],
    ['LOG', 13],
    ['TOUR', 14],
    ['LAW', 15],
    ['TRANSP', 9]
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
    ['Male', 1],
    ['Female', 2]
])

exports.getRecommendation = async(req,res,next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if(!errors.isEmpty()){
        
        return res.status(422).json({ errors: errors.array() });
    }

    try{
        console.log(STUDIES_MAP.get(req.body.studies).toString() + '  Age  '  + req.body.age.toString() + '  Gender ' +  GENDER_MAP.get(req.body.gender).toString())
        const {spawn} = require("child_process");
        const pythonProcess = spawn('python3',['../algoML/classificationModelPredict.py', STUDIES_MAP.get(req.body.studies).toString(), req.body.age.toString(), GENDER_MAP.get(req.body.gender).toString()]);

        console.log('sdas');
        pythonProcess.stdout.on('data', (data) => {
            let x = `${data}`;
            console.log(`stdout:` + x);
            res.contentType('application/json');
            return res.send(JSON.stringify(INDUSTRY_MAP.get(parseInt(x))));
        });
    }
    catch(err){
        next(err);
    }
}