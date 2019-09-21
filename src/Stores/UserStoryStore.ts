import { decorate, action, computed, observable } from 'mobx';
import { UserStoryType } from '../api/userStoryApi';

class UserStoryStore {
  userStoryList: UserStoryType[];
  sprintDuration: number;
  userStoryContentFilter: string;
  userStoryAuthorFilter: string[];
  userStoryLabelFilter: string;
  constructor() {
    this.userStoryList = []; //stores the list of user stories
    this.sprintDuration = 0; //remaining sprint duration in milliseconds
    this.userStoryContentFilter = ''; //search filter for user story content.
    this.userStoryAuthorFilter = []; //author filter for user story
    this.userStoryLabelFilter = ''; //label filter for user story
  }

  // @action
  setUserStoryAuthorFilter = (filter: string[]) => {
    this.userStoryAuthorFilter = filter;
  };

  // @action
  setUserStoryLabelFilter = (filter: string) => {
    this.userStoryLabelFilter = filter;
  };

  // @computed
  get getUserStoryDisplayNames() {
    let displayNamesSet = new Set<string>(); //placeholder to store display names
    this.userStoryList.forEach(userStory => {
      displayNamesSet.add(userStory.displayName);
    });
    return Array.from(displayNamesSet);
  }

  // @action
  setUserStoryContentFilter = (filter: string) => {
    this.userStoryContentFilter = filter;
  };

  // @action
  setSprintDuration = (newDuration: number) => {
    this.sprintDuration = newDuration;
  };

  // @action
  setUserStoryList = (newList: UserStoryType[]) => {
    this.userStoryList = newList;
  };

  // @computed
  get getRemainingSprintDuration() {
    return Math.floor((this.sprintDuration - Date.now()) / 8.64e7);
  }

  // @computed
  get getUserStoryListLength() {
    return this.userStoryList.length;
  }

  // @computed
  get getTodoUserStories(): UserStoryType[] {
    let finalList;
    finalList = this.userStoryList.filter(
      userStory =>
        userStory.phase === 'TO-DO' &&
        userStory.content.toLowerCase().indexOf(this.userStoryContentFilter.toLowerCase()) !== -1
    );

    if (this.userStoryAuthorFilter.length > 0) {
      finalList = finalList.filter(userStory => this.userStoryAuthorFilter.includes(userStory.displayName));
    }

    if (this.userStoryLabelFilter !== '') {
      finalList = finalList.filter(userStory => userStory.label === this.userStoryLabelFilter);
    }

    return finalList;
  }

  // @computed
  get getInProgressUserStories(): UserStoryType[] {
    let finalList;
    finalList = this.userStoryList.filter(
      userStory =>
        userStory.phase === 'IN-PROGRESS' &&
        userStory.content.toLowerCase().indexOf(this.userStoryContentFilter.toLowerCase()) !== -1
    );

    if (this.userStoryAuthorFilter.length > 0) {
      finalList = finalList.filter(userStory => this.userStoryAuthorFilter.includes(userStory.displayName));
    }

    if (this.userStoryLabelFilter !== '') {
      finalList = finalList.filter(userStory => userStory.label === this.userStoryLabelFilter);
    }

    return finalList;
  }

  // @computed
  get getToReviewUserStories(): UserStoryType[] {
    let finalList;
    finalList = this.userStoryList.filter(
      userStory =>
        userStory.phase === 'TO-REVIEW' &&
        userStory.content.toLowerCase().indexOf(this.userStoryContentFilter.toLowerCase()) !== -1
    );

    if (this.userStoryAuthorFilter.length > 0) {
      finalList = finalList.filter(userStory => this.userStoryAuthorFilter.includes(userStory.displayName));
    }

    if (this.userStoryLabelFilter !== '') {
      finalList = finalList.filter(userStory => userStory.label === this.userStoryLabelFilter);
    }

    return finalList;
  }

  // @computed
  get getCompletedUserStories(): UserStoryType[] {
    let finalList;
    finalList = this.userStoryList.filter(
      userStory =>
        userStory.phase === 'COMPLETED' &&
        userStory.content.toLowerCase().indexOf(this.userStoryContentFilter.toLowerCase()) !== -1
    );

    if (this.userStoryAuthorFilter.length > 0) {
      finalList = finalList.filter(userStory => this.userStoryAuthorFilter.includes(userStory.displayName));
    }

    if (this.userStoryLabelFilter !== '') {
      finalList = finalList.filter(userStory => userStory.label === this.userStoryLabelFilter);
    }

    return finalList;
  }
}

decorate(UserStoryStore, {
  userStoryAuthorFilter: observable,
  userStoryLabelFilter: observable,
  userStoryContentFilter: observable,
  sprintDuration: observable,
  userStoryList: observable,
  getUserStoryDisplayNames: computed,
  getRemainingSprintDuration: computed,
  getUserStoryListLength: computed,
  getTodoUserStories: computed,
  getInProgressUserStories: computed,
  getToReviewUserStories: computed,
  getCompletedUserStories: computed,
  setUserStoryAuthorFilter: action,
  setUserStoryLabelFilter: action,
  setUserStoryList: action,
  setSprintDuration: action,
  setUserStoryContentFilter: action,
});

export default UserStoryStore;
