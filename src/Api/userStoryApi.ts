import firebase from './firebase';

const db = firebase.database();

export interface UserStory {
  content: string;
  userId: string;
  label?: string;
  displayName: string;
  sprintNumber: number;
  phase: string;
  date: number;
  key?: string;
}

//creates a user story card.
export const createUserStory = (
  content: string,
  userId: string,
  label: string,
  displayName: string,
  sprintNumber: number = 1
) => {
  var newUserStory = db.ref('stories/').push();
  newUserStory.set({
    content,
    userId,
    label,
    displayName,
    sprintNumber,
    phase: 'TO-DO',
    date: Date.now(),
  });
};
