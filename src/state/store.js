import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import articlesReducer from './slices/articlesSlice';
import commonAdsReducer from './slices/commonAdsSlice';
import contactReducer from './slices/contactSlice';
import eventsReducer from './slices/eventsSlice';
import famousFoodsReducer from './slices/famousFoodsSlice';
import famousStaysReducer from './slices/famousStaysSlice';
import historyReducer from './slices/historySlice';
import homepageReducer from './slices/homepageSlice';
import newsReducer from './slices/newsSlice';
import notificationReducer from './slices/notificationSlice';
import resultsReducer from './slices/resultsSlice';
import sportsReducer from './slices/sportsSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    news: newsReducer,
    homepage: homepageReducer,
    results: resultsReducer,
    notifications: notificationReducer,
    famousStays: famousStaysReducer,
    famousFoods: famousFoodsReducer,
    events: eventsReducer,
    sports: sportsReducer,
    articles: articlesReducer,
    history: historyReducer,
    commonAds: commonAdsReducer,
    contact: contactReducer,
  },
});