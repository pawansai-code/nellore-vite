import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  signatureDishes: [
    {
      id: 1,
      name: 'Nellore Chepala Pulusu',
      description: 'Tangy fish curry with regional spices',
      tag: 'Non-Veg',
      image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400',
      actionLabel: 'Where to eat',
      category: 'Non-Veg',
    },
    {
      id: 2,
      name: 'Gongura Chicken',
      description: 'Spicy sorrel-based chicken curry',
      tag: 'Non-Veg',
      image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400',
      actionLabel: 'Where to eat',
      category: 'Non-Veg',
    },
    {
      id: 3,
      name: 'Andhra Meals',
      description: 'Traditional thali on banana leaf',
      tag: 'Veg',
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400',
      actionLabel: 'Popular spots',
      category: 'Veg',
    },
    {
      id: 4,
      name: 'Mirchi Bajji',
      description: 'Crispy stuffed chili fritters',
      tag: 'Street',
      image: 'https://images.unsplash.com/photo-1563379091339-03246963d3a9?w=400',
      actionLabel: 'Map',
      category: 'Street',
    },
    {
      id: 5,
      name: 'Malai Kaja',
      description: 'Famous layered sweet delicacy of Nellore',
      tag: 'Sweet',
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400',
      actionLabel: 'Where to buy',
      category: 'Sweets',
    },
    {
      id: 6,
      name: 'Pot Biryani',
      description: 'Aromatic biryani cooked in clay pots',
      tag: 'Non-Veg',
      image: 'https://images.unsplash.com/photo-1631515243349-e060360a0c77?w=400',
      actionLabel: 'Where to eat',
      category: 'Non-Veg',
    },
    {
      id: 7,
      name: 'Bobbatlu',
      description: 'Sweet stuffed flatbread (Puran Poli)',
      tag: 'Sweet',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400',
      actionLabel: 'Where to buy',
      category: 'Sweets',
    },
    {
      id: 8,
      name: 'Pulihora',
      description: 'Tangy tamarind rice with peanuts',
      tag: 'Veg',
      image: 'https://images.unsplash.com/photo-1647248197771-464879309990?w=400',
      actionLabel: 'Where to eat',
      category: 'Veg',
    },
    {
      id: 9,
      name: 'Prawns Iguru',
      description: 'Spicy thick prawn curry',
      tag: 'Non-Veg',
      image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400',
      actionLabel: 'Top spots',
      category: 'Non-Veg',
    },
    {
      id: 10,
      name: 'Alasanda Vada',
      description: 'Crispy black-eyed bean fritters',
      tag: 'Veg',
      image: 'https://images.unsplash.com/photo-1605335777134-5aa46338ac62?w=400',
      actionLabel: 'Snack points',
      category: 'Veg',
    },
  ],

  todaysSpecials: [
    {
      id: 1,
      name: 'Spicy Gongura Thali',
      details: 'Lunch only - Old Town',
      label: 'Popular',
      icon: 'bi-hand-thumbs-up',
    },
    {
      id: 2,
      name: 'Millet Meals',
      details: 'Healthy pick - East Street',
      label: 'New',
      icon: 'bi-leaf',
    },
  ],

  topRatedSpots: [
    {
      id: 1,
      name: 'Coastal Spice',
      description: 'Seafood specialist',
      rating: 4.6,
      icon: 'bi-star-fill',
    },
    {
      id: 2,
      name: 'Guntur House',
      description: 'Spicy Andhra meals',
      rating: 4.5,
      icon: 'bi-star-fill',
    },
  ],

  commonAds: [
    {
      id: 1,
      title: 'Grand Restaurant Opening',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
      actionLabel: 'View offer',
    },
    {
      id: 2,
      title: '50% Off on Delivery',
      subtitle: 'ORDER FOOD & BEER HERE',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
      actionLabel: 'Order now',
    },
  ],

  editorsPicks: [
    {
      id: 1,
      title: 'Best Fish Curry Places',
      subtitle: 'Harbour side shacks · Family restaurants',
      icon: 'bi-geo-alt-fill',
      actionLabel: 'Guide',
    },
    {
      id: 2,
      title: 'Evening Chai & Snacks Trail',
      subtitle: 'Samosa, bajji, and filter coffee',
      icon: 'bi-basket',
      actionLabel: 'Trail',
    },
    {
      id: 3,
      title: 'Dessert Spots',
      subtitle: 'Kulfi, falooda, fruit custard',
      icon: 'bi-ice-cream',
      actionLabel: 'List',
    },
  ],

  foodTourPlan: {
    date: '',
    peopleCount: '',
  },

  filters: {
    category: 'All', // All, Veg, Non-Veg, Sweets
    location: 'Nellore - Gudur',
  },

  foodsPage: {
    currentPage: 1,
    totalPages: 5,
    isLoading: false,
  },
};

const famousFoodsSlice = createSlice({
  name: 'famousFoods',
  initialState,
  reducers: {
    setFoodsPage: (state, action) => {
      state.foodsPage.currentPage = action.payload;
    },
    setFoodsLoading: (state, action) => {
      state.foodsPage.isLoading = action.payload;
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    updateFoodTourPlan: (state, action) => {
      state.foodTourPlan = { ...state.foodTourPlan, ...action.payload };
    },
  },
});

export const { setFoodsPage, setFoodsLoading, updateFilters, resetFilters, updateFoodTourPlan } = famousFoodsSlice.actions;
export default famousFoodsSlice.reducer;

