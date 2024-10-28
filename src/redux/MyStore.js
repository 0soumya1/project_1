const {configureStore} = require('@reduxjs/toolkit');
import AuthReducer from './AuthSlice';
import CommentReducer from './CommentSlice';

const MyStore = configureStore({
  reducer: {
    auth: AuthReducer,
    comment: CommentReducer,
  },
});

export default MyStore;
