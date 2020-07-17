# AutoSenseAG
Take home assessment

## The Task 
### Frontend 
As a fullstack developer, we would like you to build a demo fleet management web or mobile app with the following functionality. We will be providing a sample payload that is to be used as a reference for what an Item in the fleet management system could look like. But feel free to change it to fit your particular design if need be. 
 
1. Fleet overview: The first screen of the app will allow the user to visualise the list of cars they have in their fleet. If the fleet is empty a nice message should be displayed to the fleet manager encouraging them to add new cars to the fleet. 
 
2. Car details view: Your app should allow a user to pick one car from the list and display its details as well as the latest car position on a map(We recommend using Google maps). 
 
3. Adding a new car: The web app should allow the fleet manager to add new cars to the fleet via a modal or a form by clicking on an “Add Car” button from the fleet overview screen. 
 
4. Remove a car from the fleet: From the car details view the fleet manager should be able to delete the car they are viewing simply by clicking on the Delete button.  A delete confirmation should show and they should then be redirected to the fleet overview screen. 
 
### Backend 
On the Backend side we expect you to fetch/store the data using a Database of your choice but we would recommend dynamoDB and write a REST api that allows you to build the functionality mentioned above (Create, List and Delete). 

### DevOps 
On the DevOps side we expect you to use GitHub actions to deploy your project to AWS on every merge to master. The github action should not deploy if the tests fail.  
 
 
## Technology requirements 
**Web**: Please use Angular or VueJS

**Mobile**: If you decide to do a mobile app instead of a web app, please use Flutter

**Backend**: Please only use NodeJS and ExpressJS with Typescript. For the backend you are free to choose between a serverless backend or a microservice

**Deployment and CI/CD**: Please deploy the service to AWS (Lambda or Fargate in case you go for a microservice.) as for the Pipelines please use GitHub actions. For the UI you are free to deploy on any platform you are comfortable with. We are currently using AWS Amplify if you want to use a similar tool. 
 
If you have any questions, or need clarification please get in touch with Mohamed directly: mohamed@autosense.ch 

## Deliverables 
 
Please share the GitHub repository link as well as the link to the UI. If you write any documentation or architecture diagrams feel free to share as well. 

## Going the extra mile 

If you feel like going the extra mile and adding more functionality or working on the CI/CD please do not hesitate to document and share all the extra work you do. It is always appreciated and will only count as extra points
