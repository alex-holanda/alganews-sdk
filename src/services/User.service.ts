import { generateQueryString } from "..";
import { User } from "../@types";
import Service from "../Service";

class UserService extends Service {
  static getAllEditors(sort: User.Sort) {
    const queryString = generateQueryString(sort);
    return this.Http.get<User.EditorSummary[]>(
      "/users/editors".concat(queryString)
    ).then(this.getData);
  }

  static getExistingEditor(editorId: number) {
    return this.Http.get<User.EditorDetailed>(
      `/users/editors/${editorId}`
    ).then(this.getData);
  }

  static getDetailedUser(userId: number) {
    return this.Http.get<User.Detailed>(`/users/${userId}`).then(this.getData);
  }

  static updateExistingUser(userId: number, userData: User.Input) {
    return this.Http.put<User.Detailed>(`/users/${userId}`, userData).then(
      this.getData
    );
  }

  static getAllUsers(search: User.Query) {
    const queryString = generateQueryString(search);
    return this.Http.get<User.Summary[]>("/users".concat(queryString)).then(
      this.getData
    );
  }

  static insertNewUser(userData: User.Input) {
    return this.Http.post<User.Detailed>("/users", userData).then(this.getData);
  }

  static activateExistingUser(userId: number) {
    return this.Http.put<{}>(`/users/${userId}/activation`).then(this.getData);
  }

  static deactivateExistingUser(userId: number) {
    return this.Http.delete<{}>(`/users/${userId}/activation`).then(
      this.getData
    );
  }
}

export default UserService;