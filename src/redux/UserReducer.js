import {USER_SUBMIT} from './UserType'
import {USER_DELETE} from './UserType'
import {USER_EDIT} from './UserType'
import {USER_EDIT_INDEX} from './UserType'

const initialState={
    data:[],
    // editUserData:{},
    userEditData:{},
    userEditIndex:''
};

const userSubmitReducer=(state=initialState,action)=>{
    console.log("statereducer",state)
    console.log("actionreducer-->",action)
    
    switch (action.type) {
        case USER_SUBMIT:
            return{
                ...state,
                data: action.payload
            }

        case USER_DELETE:{
            return {
                 ...state,
                data: action.payload
                }
            }
        case USER_EDIT:{
            return {
                 ...state,
                userEditData: action.payload
                }
            }
        case USER_EDIT_INDEX:{
            return {
                 ...state,
                userEditIndex: action.payload
                }
            }
        default:
            return initialState
}
};

export default userSubmitReducer;