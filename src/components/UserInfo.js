export default class UserInfo {
  constructor(userName, userJob) {
    this._name = userName;
    this._job = userJob;
  }

  getUserInfo() {
    return {
      userName: this._name.textContent,
      userJob: this._job.textContent,
    };
  }

  setUserInfo(userName, userJob) {
    this._name.textContent = userName;
    this._job.textContent = userJob;
    console.log(userName);
  }
}
