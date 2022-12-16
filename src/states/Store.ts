import {configureStore} from '@reduxjs/toolkit';
import {sessionSlice} from './SessionSlice';

const store = configureStore({
  reducer: {
    session: sessionSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
