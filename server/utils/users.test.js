const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }];
  })

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Clinton',
      room: 'Doobie'
    }
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike', 'Julie']);

    var userList = users.getUserList('React Course');
    expect(userList).toEqual(['Jen']);
  });

  it('should remove a user', () => {
    var removedUser = users.removeUser('1');
    expect(users.users).toExclude(removedUser);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    var ogUsers = users.users;
    var user = users.removeUser('45');
    expect(users.users).toBe(ogUsers);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should get user', () => {
    var res = users.getUser('1');
    expect(res.id).toBe('1');
  });

  it('should not find user', () => {
    var userId = '1234';
    var user = users.getUser(userId);
    expect(user).toNotExist();
  });

});
