class UserDto {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.surname = user.surname;
    this.fullName = `${user.name} ${user.surname}`;
    this.email = user.email;
    this.username = user.username;
    this.phoneNumber = user.phoneNumber;
    this.role = user.role;
    this.avatar = user.avatar;
    this.age = user.age;
    this.address = user.address;
  }
}

export default UserDto;
