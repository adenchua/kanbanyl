import { decorate, action, observable } from 'mobx';
import { IssueType } from '../api/issueApi';

class IssueStore {
  listOfIssues: IssueType[];
  constructor() {
    this.listOfIssues = []; //list of issues to be displayed on the users in the issue page
  }

  //@action
  setListOfIssues = (newList: IssueType[]) => {
    this.listOfIssues = newList;
  };
}
decorate(IssueStore, { listOfIssues: observable, setListOfIssues: action });

export default IssueStore;
