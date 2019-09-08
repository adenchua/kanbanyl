import firebase from './firebase';

const db = firebase.database();

export interface UserStoryType {
  content: string;
  userId: string;
  label?: string;
  displayName: string;
  phase: string;
  date: number;
  key?: string;
}

//creates a user story card.
export const createUserStory = (content: string, userId: string, label: string, displayName: string) => {
  var newUserStory = db.ref('stories/').push();
  newUserStory.set({
    content,
    userId,
    label,
    displayName,
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
    date,
  });
};

//deletes a user story card from the database
export const deleteUserStory = (cardId: any) => {
  db.ref('stories')
    .child(cardId)
    .remove();
};

/*
resets the remaining days of sprint to 14, deletes all user stories with phases of 'COMPLETED',
changes user stories with phases 'IN-PROGRESS' to 'TO-DO'
*/
export const resetUserStories = () => {
  db.ref('/sprint').set({
    sprintDate: Date.now() + 1.21e9, // time now + 14 days of sprint duration
  });

  const userStoryList = retrieveUserStories(); //obtains the list of user stories in the database

  userStoryList.forEach(userStory => {
    if (userStory.phase === 'COMPLETED') {
      deleteUserStory(userStory.key); //deletes user story from database
    }
    if (userStory.phase === 'IN-PROGRESS') {
      db.ref('stories/' + userStory.key).set({
        phase: 'TO-DO',
        content: userStory.content,
        userId: userStory.userId,
        label: userStory.label,
        displayName: userStory.displayName,
        date: userStory.date,
      });
    }
  });
};

//obtains all the user stories from the database
export const retrieveUserStories = () => {
  let list: UserStoryType[] = [];
  var dbRef = firebase.database().ref('stories/');
  dbRef.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      childData['key'] = childKey;
      list.push(childData);
    });
  });
  return list;
};
