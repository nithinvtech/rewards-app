import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Reward } from '../types/Reward';
import { COLLECT_REWARD } from '../constants/appConstants';

// State interface: stores collected rewards
interface RewardsState {
  collected: Reward[];
}

// Initial state: empty collected rewards list
const initialState: RewardsState = {
  collected: [],
};

const rewardsSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    // Use constant COLLECT_REWARD as action type
    [COLLECT_REWARD]: (state, action: PayloadAction<Reward>) => {
      // Check if reward is already collected to avoid duplicates
      const exists = state.collected.some(r => r.id === action.payload.id);
      if (!exists) {
        state.collected.push(action.payload); 
      }
    },
  },
});

export const { [COLLECT_REWARD]: collectReward } = rewardsSlice.actions;
export default rewardsSlice.reducer;