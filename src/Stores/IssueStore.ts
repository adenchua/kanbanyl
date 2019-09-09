import { decorate, action, observable } from 'mobx';
import { IssueType } from '../api/issueApi';

class IssueStore {
  listOfIssues: IssueType[];
  issueFilter: string;
  constructor() {
    this.listOfIssues = []; //list of issues to be displayed on the users in the issue page
    this.issueFilter = ''; //filter applied to retrieve issues
  }

  //@action
  setListOfIssues = (newList: IssueType[]) => {
    this.listOfIssues = newList;
  };

  //@action
  setIssueFilter = (newFilter: string) => {
    this.issueFilter = newFilter;
  };
}
decorate(IssueStore, {
  issueFilter: observable,
  listOfIssues: observable,
  setListOfIssues: action,
  setIssueFilter: action,
});

export default IssueStore;
