export default class UserInfo {
  constructor(nameSelector, jobSelector, avatar) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._aboutElement.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }

  setAvatar() {}
}
