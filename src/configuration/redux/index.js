import { combineReducers} from 'redux';
import ToastReducer from './reducers/ToastReducer';

const createRootReducer = () => combineReducers({
    toast: ToastReducer
})
export default createRootReducer