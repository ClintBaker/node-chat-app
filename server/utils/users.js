class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    var user = {id, name, room: room.toLowerCase()};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    var user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !==id);
    }

    return user;

    // this.users.splice(this.users.indexOf(userToRemove));
    // return userToRemove;
  }
  getUser (id) {
    var user = this.users.filter((user) => user.id === id)[0];
    return user;
  }
  getUserList (room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }
  }

module.exports = {Users};


// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription () {
//     return `${this.name} is ${this.age} year(s) old`
//   }
//
// };
//
// var me = new Person('Mike', 25);
// var des = me.getUserDescription();
// console.log(des);
