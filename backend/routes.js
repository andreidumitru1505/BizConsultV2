const router = require('express').Router();
const {body} = require('express-validator');

const { getEntrepreneurs, getDashboardInfo, getProfileInfo, updateProfileInfo } = require('./controllers/entrepreneursController');
const { enrolledUserCheck } = require('./controllers/enrolledUserCheck');
const { submitProfile } = require('./controllers/profileSubmissionController');
const { getRecommendation } = require('./controllers/industryRecommendationController');
const { insertCompany } = require('./controllers/companiesController')
const { getEntrepreneurIdeas, lockInEntrepreneurIdea } = require('./controllers/industryIdeasController')

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
    body('industry', 'Please insert industry').notEmpty(),
    body('description', "Please insert description").notEmpty(),
    body('website', "Please insert website").notEmpty(),
    body('value', "Please insert value").notEmpty(),
    body('cif', "Please insert cif").notEmpty(),
    body('size', "Please insert size").notEmpty(),
    body('mainLocationCity', "Please insert main Location City").notEmpty(),
    body('mainLocationCountry', "Please insert main Location Country").notEmpty(),
    body('name', "Please insert name").notEmpty(),
    body('isPlatformRecommendation', "Insert isPlatformRecommendation").notEmpty(),
    body('isIdeaGenerated', "Insert isIdeaGenerated").notEmpty(),
    body('industryIdeaId'),
    body('foundedDate')
], insertCompany)

router.post('/getDashboardInfo',[
    body('emailAddress', "Please inset email address")
], getDashboardInfo)

router.post('/getEntrepreneurIdeas',[
    body('emailAddress', "Please inset email address")
], getEntrepreneurIdeas)

router.post('/lockInIdea',[
    body('emailAddress', "Please inset email address"),
    body('industryName', "Please insert industry").notEmpty(),
    body('isPlatformIdea', "Please insert isPlatformIdea").notEmpty(),
], lockInEntrepreneurIdea)

router.post('/getProfileInfo',[
    body('emailAddress', "Please inset email address")
], getProfileInfo)

router.post('/updateEntrepreneurProfile',[
    body('emailAddress', "Please insert email address").notEmpty(),
    body('firstNameUpdate'),
    body('lastNameUpdate'),
    body('ageUpdate'),
    body('genderUpdate'),
    body('phoneNumberUpdate'),
    body('studiesFieldUpdate')
], updateProfileInfo)

module.exports = router;