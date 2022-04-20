export interface UserDataCreate {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string,
    password_repeat: string
}

export interface UserDataSingIn {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

export interface UserDataLogin {
    login: string,
    password: string
}

export interface UserPersonalData {
    id: string | number,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string | number,
    avatar: string
}

export interface UserDataUpdate {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string
}

export interface FindUsers {
    login: string
}

export interface UserPasswordUpdate {
    [key: string]: FormDataEntryValue
}