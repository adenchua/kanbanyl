import firebase from './firebase';

const db = firebase.database();

export interface IssueType {
  title: string;
  description: string;
  issuer: string;
  date: string;
  status: string;
  key?: string;
}

//creates a issue in the database.
export const createIssue = (title: string, description: string, issuer: string, status: string = 'unresolved') => {
  var newIssue = db.ref('issues/').push();
  newIssue.set({
    title,
    description,
    issuer,
    date: Date.now(),
    status: status,
  });
};

//changes a status of a issue from 'unresolved/urgent' to 'resolved'
export const resolveIssue = (title: string, description: string, issuer: string, date: string, key: any) => {
  db.ref('issues/' + key).set({
    status: 'resolved',
    title,
    description,
    issuer,
    date,
  });
};
