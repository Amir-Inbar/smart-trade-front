import {UserSchema} from "@/schemas/types";

export interface UserState {
    users: UserSchema[];

    setUsers: (users: UserSchema[]) => void;

    addUser: (user: UserSchema) => void;
}