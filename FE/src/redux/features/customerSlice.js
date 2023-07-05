import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  currentAcc: {},
  //dánh sách các bài hát hiện tại
  currentCart: [],
  //mảng sẽ là currentCart[i]= idBook
  isActive: false,
  //xem player đã active chưa
  isPlaying: false,
  // nhạc có đang chạy hay ko
  activeSong: {},
  // bài hát đang được active
  genreListId: '',
};

const customerSlice = createSlice({
  name: 'Customers',
  initialState,
  reducers: {
    setAcc: (state, action) => {
      state.currentAcc = action.payload
      // return {
      //   ...state,
      //   currentAcc: action.payload.acc
      // }
    },

    addGoods: (state, action) => {
      state.currentCart= [
        ...state.currentCart,
        action.payload
      ]
      // return {
      //   ...state,
      //   currentCart: [
      //     ...state.currentCart,
      //     action.payload.goods
      //   ]
      // }
    },
    clearGoods: (state, action) => {
      state.currentCart= []
    },
    upadteCart: (state, action) => {
      state.currentCart= [...action.payload]
    }
    // prevSong: (state, action) => {
    //   if (state.currentSongs[action.payload]?.track) {
    //     state.activeSong = state.currentSongs[action.payload]?.track;
    //   } else {
    //     state.activeSong = state.currentSongs[action.payload];
    //   }

    //   state.currentIndex = action.payload;
    //   state.isActive = true;
    // },

    // playPause: (state, action) => {
    //   state.isPlaying = action.payload;
    // },

    // selectGenreListId: (state, action) => {
    //   state.genreListId = action.payload;
    // },
  },
});

export const { setAcc, addGoods,clearGoods, upadteCart} = customerSlice.actions;

export default customerSlice.reducer;
