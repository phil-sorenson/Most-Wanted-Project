/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
// ? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"   "CTRL" "K" + "CTRL" "J" to undo

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResult;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResult = searchByName(people);
            // mainMenu(checkResults(searchResult), data)
            break;
        case "no":
            
            searchResult = searchByTraits(people);
            // mainMenu(checkSingleResult(foundPerson), people)    
           
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            break;
        case 'test':
            break
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResult, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    // mainMenu is called once you find who you are looking for
    if (!person[0]) {
        alert("Could not find that individual.");
        return app(people); // Restarts app() from the very beginning
    }

    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    ); 
    
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //✅! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
               
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            findPersonSpouse(person,people);
            findPersonParents(person,people);
            findPersonSiblings(person,people);
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            // let parents = findParents(person[0],people)
            // let personFamily = (findById, findSiblings, findParents)
            // let personFamily = findPersonFamily(person[0], people);
            // let personFamily = findPersonFamily(person[0], people)
            // alert(personFamily);
            // // displayPeople(parents);
            mainMenu(person,people);
            break;
        case "descendants":
            findPersonDescendants(person,people);
            displayPeople(descendantsArr);
            mainMenu(person,people)
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            // let personDescendants = findPersonDescendants(person[0], people);
            // let personDescendants = displayPeople(findPersonDescendants(person[0],people));
            // alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

// Search by one of more traits 
function searchByTraits(people) {        // Need only 2 but can search up to 5
    
    let peopleByTrait = people;
    while (true){
        let searchedTrait = promptFor("Let's find your person by entering some of their Traits!\n What trait would you like to search for?\n'gender', 'eye color', 'height(in)', 'weight(lbs)', or 'occupation'",chars).toLowerCase()
    

    
    switch(searchedTrait) {
        case "gender":
            peopleByTrait = genderArray(peopleByTrait)
            if (peopleByTrait.length > 1) {
                alert(`${peopleByTrait.length} results found. Lets search for your person with another trait!`)
                
            } else if (peopleByTrait.length === 1){
                alert(`Your person was found! ${peopleByTrait[0].firstName} ${peopleByTrait[0].lastName}`)
                // displayPeople(peopleByTrait)
                return peopleByTrait;
            } else {
                alert("No results Found. \n Let's try again from the beginning!")
                app(people)
            }
            break
            
        case "eye color":
            peopleByTrait = eyeColorArray(peopleByTrait)
            if (peopleByTrait.length > 1) {
                alert(`${peopleByTrait.length} results found. Lets search for your person with another trait!`)
            
            } else if (peopleByTrait.length === 1){
                alert(`Your person was found! ${peopleByTrait[0].firstName} ${peopleByTrait[0].lastName}`)
                // displayPeople(peopleByTrait);
                return peopleByTrait;
            } else {
                alert("No results Found. \n Let's try again from the beginning!")
                app(people)
            }
            break

        case "height":
            peopleByTrait = heightArray(peopleByTrait)
            if (peopleByTrait.length > 1) {
                alert(`${peopleByTrait.length} results found. Lets search for your person with another trait!`)
            
            } else if (peopleByTrait.length === 1){
                alert(`Your person was found! ${peopleByTrait[0].firstName} ${peopleByTrait[0].lastName}`)
                // displayPeople(peopleByTrait)
                return peopleByTrait;
            } else {
                alert("No results Found. \n Let's try again from the beginning!")
                app(people)
            }
            break
        case "weight":
            peopleByTrait = weightArray(peopleByTrait)
            if (peopleByTrait.length > 1) {
                alert(`${peopleByTrait.length} results found. Lets search for your person with another trait!`)
                
            } else if (peopleByTrait.length === 1){
                alert(`Your person was found! ${peopleByTrait[0].firstName} ${peopleByTrait[0].lastName}`)
                // displayPeople(peopleByTrait)
                return peopleByTrait;
            } else {
                alert("No results Found. \n Let's try again from the beginning!")
                app(people)
            }
            break
        case "occupation":
            peopleByTrait = occupationArray(peopleByTrait)
            if (peopleByTrait.length > 1) {
                alert(`${peopleByTrait.length} results found. Lets search for your person with another trait!`)
                
            } else if (peopleByTrait.length === 1){
                alert(`Your person was found! ${peopleByTrait[0].firstName} ${peopleByTrait[0].lastName}`)
                // displayPeople(peopleByTrait)
                return peopleByTrait;
            } else {
                alert("No results Found. \n Let's try again from the beginning!")
                app(people)
            }    
            break
        }
    }
    }


    function genderArray (people) {
      
            let gender = promptFor("What is the Person's gender?", chars);
            let peopleByTrait = people.filter(function(person){
                if (person.gender.toLowerCase() === gender.toLowerCase()){
                    return true;
                } else {
                    return false;
                }
            }) 
        
        displayPeople(peopleByTrait);
        return peopleByTrait;
    }
    
    function eyeColorArray (people) {
        
                let eyeColor = promptFor("What is the Person's eye color?", chars);
                let peopleByTrait = people.filter(function(person){
                    if (person.eyeColor.toLowerCase() === eyeColor.toLowerCase()){
                        
                        return true;
                    } else {
                        return false;
                    }
                })
            
            displayPeople(peopleByTrait);
            return peopleByTrait;
    }
    
    function heightArray(people) {
        
            let height = promptFor("What is the Person's height in inches?", chars);
            let peopleByTrait = people.filter(function(person){
                if (person.height === height){
                    return true;
                } else {
                    return false;
                }
            })
        
        displayPeople(peopleByTrait);
        return peopleByTrait;
    }
    
    function weightArray (people) {
       
            let weight = promptFor("What is the Person's weight in lbs?",chars);
            let peopleByTrait = people.filter(function(person){
                if (person.weight === weight){
                    return true;
                } else {
                    return false;
                }
            })
    
        displayPeople(peopleByTrait);
        return peopleByTrait;
    }
    
    function occupationArray (people) {
      
            let occupation = promptFor("What is the Person's occupation?", chars);
            let peopleByTrait = people.filter(function(person){
                if (person.occupation.toLowerCase() === occupation.toLowerCase()){
                    return true;
                } else {
                    return false;
                }
            })
        
        displayPeople(peopleByTrait);
        return peopleByTrait;
    } 
        

    // TODO:
    // Fix/Write code to verify Trait input (even after people have been filtered through once or twice, if user mispells the searched trait, it prompts you to type it again but loops through undefined and shows "no results")
    // Maybe find a different way to end displayPeople
/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    )
}
// End of displayPeople()
// Display Family
function displayFamilyInfo (foundPerson, relationship) {
    if(foundPerson.length < 1){
        alert(`This person has no ${relationship}.`);
    }
    else {
        alert(foundPerson.map(function(person){
            return (`${relationship}: ${person.firstName} ${person.lastName}`);
        }).join("\n"));
    }
}

function findPersonSpouse (person, people) {
    let foundPerson = people.filter(function(el){
        if(el.currentSpouse === person.id) {
            return true;
        } 
        return false;
    })
    displayFamilyInfo(foundPerson, "Spouse")
}

// function findPersonSiblings(person, people){
//     let foundPerson = people.filter(function(el){
//     let parentLength = el.parents
//       if(el.id === person.id)
//       return false;
//       else if(parentLength.length < 2)
//         return false;
//     else if(person.parents.includes(el.parents[0])|| person.parents.includes(el.parents[1])){
//         return true;
//     }
//     //   else if(el.parents[0] === person.parents[0] || el.parents[0] === person.parents[1] || el.parents[1] === person.parents[0] || el.parents[1] === person.parents[1]){
//       else {
//         return false;
//       }
//     })
//       displayFamilyInfo(foundPerson,"Sibling")
//   }
function findPersonSiblings(person,people){
    let siblings = people.filter(function(el){
        if((person.parents.includes(el.parents[0]) || person.parents.includes(el.parents[1])) && person.id != el.id){
            return true;
        }
        return false;
    }); siblings = displayFamilyInfo(foundPerson, "Siblings")
    return siblings;
}

// function findPersonSiblings(person, people){
//     // Does this array item contain the same ID as MY parents array in theirs?
//     return people.filter(function(el){
//         if(person.parents.includes(el.parents[0]) || person.parents.includes(el.parents[1])){
//             return true;
//         }
//     })
//     displayFamilyInfo(foundPerson, "Sibling")
// }

function findPersonParents (person, people) {
    let parents = people.filter(function(el) {
        if(person.parents[0] === el.id || person.parents[1] === el.id){
            return true;
        } else {
            return false;
        }
    }); parents = displayFamilyInfo(foundPerson, "Parent"); 
    return parents;
}

function findPersonDescendants(person,people){
    let descendantsArr = []
    let ID = person.id;
    let foundPerson = people.filter(function(person){
        if(person.parents.includes(ID)){
            if(person != descendantsArr){
                descendantsArr.push(person);
                return true;
            }
        } else {
            return true;
        }
        return false;
    })
    for(let i=foundPerson.length -1; i>=0; i--){
        findPersonDescendants(foundPerson[i],people);
    }
}   

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender:  ${person.gender}\n`;
    personInfo += `Date of Birth: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color:  ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    
    alert (personInfo)
}
    //✅! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////


// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

// Ensure an integer input (HELPER FUNCTION)
// function integer(input) {
//     for (let i = 0; i < input.length; i++) {
//         if (Number.isNaN(parseInt(input[i]))) {
//             return false;
//         }
//     } return true;
// }

// function nonInteger(input) {
//     for (let i = 0; i < input.length; i++){
//         if (!Number.isNaN(parseInt(input[i]))){
//             return false;
//         }
//     } return true;
// }
//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁
//! TODO:
//! Create Helper Function to validate a NAME regardless of the Letters being capitlized or undercase 
// When searching by Name -- I was only alerted back with the name as opposed to their info...FIGURE THIS OUT
//Create personFamily function
    // 
// Create searchByTrait function 
    // Allow user to search by a single trait (returns an Array of any person who fits that criteria)
    // Allow user to search by multiple trait (returns an Array or people)

// function checkSingleResult (personArray) {
//     if (personArray.length === 1){
//         return personArray [0];
//     } else if (personArray.length > 1) {
//         return personArray;
//     } else {
//         return undefined; /* or false? */
//     }
// }

// function findPersonChildren (person, people, descendants = []) {
//     let children = people.filter(function(el){
//         if(el.parents.includes(person.id)){
//             return true;
//         }
//     }) 
//     return false;
// } 
// if (children.length == 0){
//     return descendants;
// }

    



// function findSiblings (person, people) {
//     let sibling = people.filter(function(element){
//         if(person.parents[0] === element.id || person.parents[1] === element.id || person[0].parents[0] || person[0].parents[1]) {
//             return true;
//         } 
//             return false;
//         })
//     }; return sibling;



// Make sure to run a check 
// function findPersonFamily(person={}, people=[]){
//     let family = `${person.firstName} ${person.lastName}'s family members:`
//     family += findPersonSpouse(person,people)
//     family += findPersonSiblings(person,people)
//     family += findPersonParents(person,people)
    
//     let spouse = findById(person, people, "currentSpouse")
//     // displayPeople(spouse)
//     let parents = findParents(person, people);
//     let siblings = findSiblings(person,people);
//     // return spouse.concat(parents).concat(siblings)
//     // return {spouse:spouse, parents:parents, siblings:siblings}
//     let fam = {

//     }
// }

// function findById(person, people, personPropStr){
//     return people.filter(function(person){
//         return person[personPropStr] === person.id
//     }); 
// }   


// function findParents (person, people){
//     return people.filter(function(person){
//        return person.parents.includes(person.id) // code explained --> Does the personObj's array include the parents ID? 
//     })
// }

