const conn = require('../dbConn').promise();

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