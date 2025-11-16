import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Session {
  _id?: string;
  bookId: string;
  startTime: Date;
  endTime?: Date;
  durationMinutes: number;
  pagesRead: number;
  mood: string;
  ambientSound: string;
  status: 'active' | 'paused' | 'completed';
}

interface SessionState {
  activeSession: Session | null;
  sessions: Session[];
  isTimerRunning: boolean;
  elapsedSeconds: number;
}

const initialState: SessionState = {
  activeSession: null,
  sessions: [],
  isTimerRunning: false,
  elapsedSeconds: 0
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    startSession: (state, action: PayloadAction<Omit<Session, 'durationMinutes' | 'pagesRead' | 'status'>>) => {
      state.activeSession = {
        ...action.payload,
        startTime: new Date(),
        durationMinutes: 0,
        pagesRead: 0,
        status: 'active'
      };
      state.isTimerRunning = true;
      state.elapsedSeconds = 0;
    },
    pauseSession: (state) => {
      state.isTimerRunning = false;
      if (state.activeSession) {
        state.activeSession.status = 'paused';
      }
    },
    resumeSession: (state) => {
      state.isTimerRunning = true;
      if (state.activeSession) {
        state.activeSession.status = 'active';
      }
    },
    endSession: (state, action: PayloadAction<{ pagesRead: number }>) => {
      if (state.activeSession) {
        state.activeSession.status = 'completed';
        state.activeSession.endTime = new Date();
        state.activeSession.durationMinutes = Math.floor(state.elapsedSeconds / 60);
        state.activeSession.pagesRead = action.payload.pagesRead;
        state.sessions.push(state.activeSession);
      }
      state.activeSession = null;
      state.isTimerRunning = false;
      state.elapsedSeconds = 0;
    },
    tick: (state) => {
      if (state.isTimerRunning) {
        state.elapsedSeconds += 1;
      }
    },
    setAmbientSound: (state, action: PayloadAction<string>) => {
      if (state.activeSession) {
        state.activeSession.ambientSound = action.payload;
      }
    }
  }
});

export const { startSession, pauseSession, resumeSession, endSession, tick, setAmbientSound } = sessionSlice.actions;
export default sessionSlice.reducer;
