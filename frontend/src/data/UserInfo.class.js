class UserInfo {
    constructor(email, name, description, age) {
        this.email = email;
        this.name = name;
        this.description = description;
        this.age = age;
    }

    toJSON() {
        return { ...this };
    }
}

export default UserInfo;