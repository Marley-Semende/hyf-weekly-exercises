import { modules, students, mentors, classes } from "./hyf.js";

/*
  Tjebbe would like help to get a list of possible mentors for a module.
 Fill in this function that finds all the mentors that can teach the given module.

 It should return an array of names. So something like:
 ['John', 'Mary']
 */
const possibleMentorsForModule = (moduleName) => {
  const mentorsForModule = mentors.filter((mentor) =>
  mentor.canTeach.includes(moduleName)
  );
  const mentorNames = mentorsForModule.map((mentor) => mentor.name);
  return mentorNames;
};
console.log(possibleMentorsForModule('using-apis'));

/**
 * Tjebbe wants to make it even easier for himself.
 * Fill in this function that chooses a random mentor to teach the given module.
 *
 * It should return a single name.
 */
const findMentorForModule = (moduleName) => {
  const mentorsForModule = mentors.filter((mentor) => 
  mentor.canTeach.includes(moduleName)
  );
  if(mentorsForModule.length === 0) {
    return 'No available mentors for this module';
  } else {
    const randomIndex = Math.floor(Math.random() * mentorsForModule.length);
    return mentorsForModule[randomIndex].name;
  }
}
console.log(findMentorForModule('javascript'));