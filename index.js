'use strict';

const mockData = require('./mockData.js').data;
const prompt = require("prompt-sync")({sigint: true});

// Your code here

const datingProfile = {
    first_name: '',
    last_name: '',
    age: 0,
    gender: '',
    gender_interest: '',
    location: '',
    min_age_interest: 0,
    max_age_interest: 0
  }

 const datingQuestions = {
    first_name: 'What is your first name?',
    last_name: 'What is your last name?',
    age: 'What is your age?',
    gender: 'What is your gender? Please enter (M, F or X)',
    gender_interest: 'In which gender are you interested? Please enter (M, F or X)',
    location: 'Where do you live? (rural or city)',
    min_age_interest: 'What is the minimal age requirement for your dating partner?',
    max_age_interest: 'What is the maximum age requirement for your dating partner?'
  }

// ask dating questions
for(let key in datingQuestions) {
    const question = datingQuestions[key];
    let answer;

    while (true) {
         answer = prompt(question);
         // - Make sure that all number values are stored as number and not as string.
         if(key.indexOf('age') >  -1) answer = Number(answer);
         // clear any unnessacary spaces
         else answer = answer.trim();
         // If the input is empty or zero, ask the question again
         if(!answer) {
            console.log("Please enter a valid value!");
            continue;
         }
         // validate ages
         if(key.indexOf('age') >  -1) {
            // Make sure the age is always 18 or higher for every age field
            if(Math.abs(parseInt(answer)) !== answer || answer < 18 ) {
                console.log("Please enter a valid age! (18+)");
                continue;
            }
          }  
          // Make sure the maximum interested age is higher than the minimum interested age.
          if(key === 'max_age_interest' && answer < datingProfile.min_age_interest) { 
            console.log("value cannot be less then the minimum age!");
           continue;
          }
          // validate genders
          if(key.indexOf('gender') >  -1) {
            // Make sure that gender can only be M, F, X. (X is all not male & female genders)
            if((answer ==='M' || answer === 'F' || answer === 'X') && answer.length === 1) {break;}
            else { console.log("Please enter a valid gender (M, F or X)");
            continue;
            }
            }
          //validate location
          if(key === 'location') {
            // Make sure that location can only be “rural” or “city”.
            if(answer === 'rural' || answer === 'city') {break;}
            else console.log("Please enter a valid location (rural or city)");
            continue;
          }
          break;
        } 
  //store answer in profile
  datingProfile[key] = answer;      
}

// find dating matches
let counter =0;
const matches = [];
    for(let i = 0; i < mockData.length; i++) {
        const profile = mockData[i];
        // Your age range and their age match
        if(profile.age >= datingProfile.min_age_interest && profile.age <= datingProfile.max_age_interest) {
          // Their age range and your age match
          if(datingProfile.age >= profile.min_age_interest && datingProfile.age <= profile.max_age_interest) {
            //Their gender_interest and your gender match. 
            if(profile.gender_interest === datingProfile.gender) {
              //Your gender_interest and their gender match. 
              if(datingProfile.gender_interest === profile.gender) {
                //Your location and their location match.
                if(datingProfile.location === profile.location) {
                  matches.push(profile);
                  counter ++;
                }
              }
            }
          }
        }    
    }

    console.log(counter + " matches found in " + mockData.length + " possible dates");
for(let i = 0; i < matches.length; i++) {
  //Show all possible matches to the user by printing it in a readable format that shows their name, age and location.
  console.log(`Match 1: ${matches[i].first_name} ${matches[i].last_name}, age (${matches[i].age}), location (${matches[i].location})}`);
}
