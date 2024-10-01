
export class UserDTO {
    email: string;
    name: string;
    password: string;

    constructor(email: string, name: string, password: string) {
        this.email = email;
        this.name = name;
        this.password = password;
    }

    static fromDTO(data: { email: string; name: string; password: string }) {
        return new UserDTO(
            data.email,
            data.name,
            data.password
        );
    };
};