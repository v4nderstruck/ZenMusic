import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionIfc {
  sessionVerified: boolean;
  cookieHeader: String;
}

const initialState: SessionIfc = {
  sessionVerified: false,
  cookieHeader: '',
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (state: any, action: PayloadAction<String>) => {
      state.cookieHeader = action.payload;
      // todo, add proper session check
      state.sessionVerified = action.payload === 's' ? false : true;
    },
    verifySession: _state => {
      // toodo!
    },
  },
});

export const { setSession, verifySession } = sessionSlice.actions;
export default sessionSlice;
