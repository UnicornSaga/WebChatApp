class UserInfo {
    constructor(id, email, name, description, age, friendlist) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.description = description;
        this.age = age;
        this.friendlist = friendlist;
    }

    toJSON() {
        return { ...this };
    }
}

export default UserInfo;