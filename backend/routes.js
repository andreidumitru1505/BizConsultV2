const router = require('express').Router();
const {body} = require('express-validator');

const { getEntrepreneurs } = require('./controllers/entrepreneursController');
const { enrolledUserCheck } = require('./controllers/enrolledUserCheck');
const { submitProfile } = require('./controllers/profileSubmissionController');
const { getRecommendation } = require('./controllers/industryRecommendationController');
const { insertCompany } = require('./controllers/companiesController')

router.get('/getEntrepreneurs', getEntrepreneurs);

router.post('/enrolledUserCheck',[
    body('emailAddress', 'Invalid').notEmpty()
], enrolledUserCheck);

router.post('/profileSubmission',[
    body('firstName', "Please insert your first name").notEmpty(),
    body('lastName', 'Please insert last name').notEmpty(),
    body('emailAddress', "Please insert email address").notEmpty(),
    body('expertField', "Please field of expertise").notEmpty(),
    body('role', "Invalid Role").notEmpty(),
    body('age', "Please insert age").notEmpty(),
    body('gender', "Please insert gender").notEmpty(),
    body('phoneNumber', "Please insert phone number").notEmpty(),
    body('studiesField', "Please insert the field of your studies").notEmpty()
], submitProfile);

router.post('/getRecommendation', [
    body('emailAddress', "Please insert email address").notEmpty(),
], getRecommendation)

router.post('/insertCompany',[
    body('emailAddress', "Please insert email address").notEmpty(),
    body('industry', 'Please insert last name').notEmpty(),
    body('description', "Please insert email address").notEmpty(),
    body('website', "Please field of expertise").notEmpty(),
    body('value', "Invalid Role").notEmpty(),
    body('cif', "Please insert age").notEmpty(),
    body('size', "Please insert gender").notEmpty(),
    body('mainLocationCity', "Please insert phone number").notEmpty(),
    body('mainLocationCountry', "Please insert the field of your studies").notEmpty(),
    body('foundedDate')
], insertCompany)

module.exports = router;