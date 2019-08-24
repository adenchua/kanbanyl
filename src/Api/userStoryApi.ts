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

//retrieves all user stories based on sprint
export const retrieveUserStories = (sprintNumber: number = 1) => {
  let list: UserStory[] = [];
  var dbRef = db.ref('stories/');
  dbRef.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      childData['key'] = childKey;
      if (childData.sprintNumber === sprintNumber) {
        list.push(childData);
      }
    });
    return list;
  });
};
