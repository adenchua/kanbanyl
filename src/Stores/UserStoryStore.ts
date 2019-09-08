import { decorate, action, computed, observable } from 'mobx';
import { UserStory } from '../api/userStoryApi';

class UserStoryStore {
  userStoryList: UserStory[];
  constructor() {
    this.userStoryList = []; //stores the list of user stories for a current selected sprint
  }

  // @action
  setUserStoryList = (newList: UserStory[]) => {
    this.userStoryList = newList;
  };

  // @computed
  get getUserStoryListLength() {
    return this.userStoryList.length;
  }

  // @computed
  get getTodoUserStories(): UserStory[] {
    return this.userStoryList.filter(userStory => userStory.phase === 'TO-DO');
  }

  // @computed
  get getInProgressUserStories(): UserStory[] {
    return this.userStoryList.filter(userStory => userStory.phase === 'IN-PROGRESS');
  }

  // @computed
  get getToReviewUserStories(): UserStory[] {
    return this.userStoryList.filter(userStory => userStory.phase === 'TO-REVIEW');
  }

  // @computed
  get getCompletedUserStories(): UserStory[] {
    return this.userStoryList.filter(userStory => userStory.phase === 'COMPLETED');
  }
}

decorate(UserStoryStore, {
  userStoryList: observable,
  getUserStoryListLength: computed,
  getTodoUserStories: computed,
  getInProgressUserStories: computed,
  getToReviewUserStories: computed,
  getCompletedUserStories: computed,
  setUserStoryList: action,
});

export default UserStoryStore;
