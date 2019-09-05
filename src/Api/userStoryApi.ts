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

//moves a user story card from one phase to another
export const moveUserStory = (
  content: string,
  userId: string,
  label: any,
  displayName: string,
  sprintNumber: number,
  newPhase: string,
  date: number,
  cardId: any
) => {
  db.ref('stories/' + cardId).set({
    phase: newPhase,
    content,
    userId,
    label,
    displayName,
    sprintNumber,
    date,
  });
};

//deletes a user story card from the database
export const deleteUserStory = (cardId: any) => {
  db.ref('stories')
    .child(cardId)
    .remove();
};
