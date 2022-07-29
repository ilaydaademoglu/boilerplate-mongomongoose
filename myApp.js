require('dotenv').config();
const mongoose = require('mongoose');

//console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String],
})

const Person = mongoose.model("Person", personSchema);

let arrayOfPeople = [{name: "Patrick Simpson", age: 38, favoriteFoods: ["bacon", "beans", "pudding"]},
{name: "Linda Simpson", age: 32, favoriteFoods: ["lahmacun", "kebap"]},
{name: "Adam Jackson", age: 38, favoriteFoods: ["chicken soup", "fish", "cheesecake"]}]


const createAndSavePerson = (done) => {
  var janeFonda = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});


  janeFonda.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error, createdPeople) => { //it creates person object from array of people and tries to save it into db
    if(error){
      console.log(error);
    }
    else{
      done(null, createdPeople);
      
    }
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({
    name: personName
  },(error, arrayofResults) => {
    if(error) console.log(error);
    else {   done(null, arrayofResults);  }
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: {$all : [food]} } ,(error, person) =>{
    if(error) {
      console.log(error);
    }else{
      done(null, person);
    }
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId,(error, person) => {
    if(error) {
      console.log(error);
    }else{
      done(null, person);
    }
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (error, result) => {
    if(error) {
      console.log(error);
    }
    result.favoriteFoods.push(foodToAdd);
    result.save((error,updatedResult) => {
      if(error){
        console.log(error);
      }
      done(null, updatedResult);
    })
  });

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet},  { new: true }, (error, result) => {
    if(error){
      console.log(error);
    }
    else{
      done(null, result);
    }
  }) //new true , it returns modified document 
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (error,result) => {
    if(error){
      console.log(error);
    }
    done(null, result);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (error, result) => {
    if(error){
      console.log(error);
    }else{
      done(null, result);
    }
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: {$all : [foodToSearch]}, })
  .sort({name: 'asc'})
  .limit(2)
  .select('-age')
  .exec((error,result)=>{
    if(error){
      console.log(error);
    }
    done(null,result);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

