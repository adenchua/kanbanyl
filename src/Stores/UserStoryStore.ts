import { decorate, action, computed, observable } from 'mobx';
import { UserStoryType } from '../api/userStoryApi';

class UserStoryStore {
  userStoryList: UserStoryType[];
  sprintDuration: number;
  constructor() {
    this.userStoryList = []; //stores the list of user stories
    this.sprintDuration = 0; //remaining sprint duration in milliseconds
  }

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
    return this.userStoryList.filter(userStory => userStory.phase === 'TO-DO');
  }

  // @computed
  get getInProgressUserStories(): UserStoryType[] {
    return this.userStoryList.filter(userStory => userStory.phase === 'IN-PROGRESS');
  }

  // @computed
  get getToReviewUserStories(): UserStoryType[] {
    return this.userStoryList.filter(userStory => userStory.phase === 'TO-REVIEW');
  }

  // @computed
  get getCompletedUserStories(): UserStoryType[] {
    return this.userStoryList.filter(userStory => userStory.phase === 'COMPLETED');
  }
}

decorate(UserStoryStore, {
  sprintDuration: observable,
  userStoryList: observable,
  getRemainingSprintDuration: computed,
  getUserStoryListLength: computed,
  getTodoUserStories: computed,
  getInProgressUserStories: computed,
  getToReviewUserStories: computed,
  getCompletedUserStories: computed,
  setUserStoryList: action,
  setSprintDuration: action,
});

export default UserStoryStore;
