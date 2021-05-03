import { combineReducers } from "redux"
import user from "./user.js"
const reducers = combineReducers({
    userState: user
})

export default reducers