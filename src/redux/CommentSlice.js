const {createSlice} = require('@reduxjs/toolkit');

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    data: [],
  },
  reducers: {
    setCommentData(state, action) {
      // console.log('state-', state);
      // console.log('action', action);
      state.data = action.payload;
    },
  },
});

export const {setCommentData} = commentSlice.actions;
export default commentSlice.reducer;
