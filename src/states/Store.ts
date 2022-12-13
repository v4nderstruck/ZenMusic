import {configureStore} from '@reduxjs/toolkit';
import {sessionSlice} from './SessionSlice';

export default configureStore({
  reducer: {
    session: sessionSlice.reducer,
  },
});
