import { USER_SUBMIT } from "./UserType";
import { USER_DELETE } from "./UserType";
import { USER_EDIT } from "./UserType";
import { USER_EDIT_INDEX } from "./UserType";

export const userSubmit = (data)=>{
    return {
        type:USER_SUBMIT,
        payload: data
    }
};
export const userDelete = (data)=>{
    return {
        type:USER_DELETE,
        payload: data
    }
};
export const userEdit = (data)=>{
    return {
        type:USER_EDIT,
        payload: data
    }
};
export const userEditIndex = (data)=>{
    return {
        type:USER_EDIT_INDEX,
        payload: data
    }
};