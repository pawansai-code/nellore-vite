import { createSlice } from "@reduxjs/toolkit";
import sportsHero from "../../assets/images/sports-hero.jpg";

const initialState = {
  // Hero Section
  heroImage: sportsHero,
  heroImageAlt: "Sports hero image",

  // Categories for filter
  categories: [
    { id: 1, label: "All" },
    { id: 2, label: "Cricket" },
    { id: 3, label: "Volleyball" },
    { id: 4, label: "Kabaddi" },
    { id: 5, label: "Athletics" },
    { id: 6, label: "Football" },
  ],

  // Regions for filter
  regions: [
    { id: 1, label: "All" },
    { id: 2, label: "Nellore" },
    { id: 3, label: "Gudur" },
    { id: 4, label: "Kavali" },
    { id: 5, label: "Mypadu" },
  ],

  // Live Scores
  liveScores: [
    {
      id: 1,
      match: "Nellore XI vs Gudur CC",
      sport: "Cricket",
      score: "134/6 (17.2)",
      type: "T20",
      isLive: true,
    },
    {
      id: 2,
      match: "District Qualifiers Court-2",
      sport: "Volleyball",
      score: "Set 2 - 18-16",
      type: "Live",
      isLive: true,
    },
  ],

  // Upcoming Fixtures
  upcomingFixtures: [
    {
      id: 1,
      title: "School Cricket Finals",
      date: "Fri",
      time: "3:30 PM",
      location: "Municipal Ground",
      category: "Cricket",
      fullContent: "The highly anticipated School Cricket Finals will take place this Friday at the Municipal Ground. The top two teams from the district league will battle it out for the championship trophy. \n\n Spectators are welcome to attend. Entry is free. The match will be followed by a prize distribution ceremony attended by the District Sports Officer.",
    },
    {
      id: 2,
      title: "Kabaddi Zonal Semis",
      date: "Sat",
      time: "6:00 PM",
      location: "Stadium Court A",
      category: "Kabaddi",
      fullContent: "The Zonal Semi-finals for the Kabaddi championship are scheduled for Saturday evening. Four teams remain in the hunt for the zonal title. \n\n Expect high-intensity raids and tackles as players vie for a spot in the finals. Court A at the main stadium has been prepped for the event with enhanced lighting for the evening matches.",
    },
    {
      id: 3,
      title: "10K City Marathon",
      date: "Sun",
      time: "5:30 AM",
      location: "Beach Road",
      category: "Athletics",
      fullContent: "The annual City 10K Marathon kicks off this Sunday at 5:30 AM from Beach Road. Over 500 runners have registered for the event, which aims to promote fitness and healthy living. \n\n Traffic diversions will be in place along the beach route from 5 AM to 9 AM. Water stations and medical aid posts will be available at every 2km mark.",
    },
    {
      id: 4,
      title: "Inter-school Volleyball Finals",
      date: "Sun",
      time: "4:00 PM",
      location: "Indoor Arena",
      category: "Volleyball",
      fullContent: "The Indoor Arena will host the Inter-school Volleyball Finals on Sunday afternoon. The girls' and boys' finals will be played back-to-back. \n\n This tournament has seen exceptional talent this year, with several players being scouted for the district team. Come and cheer for the future stars of Nellore volleyball.",
    },
  ],

  // Sports News
  sportsNews: [
    {
      id: 1,
      title: "National Games: State clinches 3 golds in athletics",
      posted: "2h ago",
      tag: "Featured",
      fullContent: "In a stunning display of speed and endurance, the state athletics team secured three gold medals at the ongoing National Games. \n\n The victories came in the 100m sprint, 400m relay, and long jump events. The athletes have dedicated their wins to their coaches and the intense training camps held in Nellore prior to the games. The Chief Minister has announced cash rewards for the medalists.",
    },
    {
      id: 2,
      title: "District volleyball trials draw record turnout",
      posted: "4h ago",
      tag: "Local",
      fullContent: "The district-level volleyball selection trials held yesterday saw a record turnout of over 200 aspirants. Coaches were impressed by the raw talent on display, particularly from the rural belts of the district. \n\n A shortlist of 30 players will be announced tomorrow for the upcoming training camp. The selected players will represent the district in the state inter-district championship next month.",
    },
    {
      id: 3,
      title: "School cricket league announces new format",
      posted: "Yesterday",
      tag: "Update",
      fullContent: "The organizing committee of the School Cricket League has unveiled a new format for the upcoming season. To make the league more competitive, teams will now be divided into two groups, playing a round-robin stage followed by knockouts. \n\n Additionally, a 'Super Sub' rule has been introduced to allow teams more tactical flexibility. The season is set to begin in the second week of November.",
    },
    {
      id: 4,
      title: "Nellore runner qualifies for state marathon finals",
      posted: "2d ago",
      tag: "Athletics",
      fullContent: "Local long-distance runner, Ravi Kumar, has qualified for the State Marathon Finals after clocking a personal best time in the regional qualifiers. \n\n Ravi, who trains at the AC Stadium, finished the 42km course in 2 hours and 45 minutes. 'My goal is to finish on the podium at the state level,' he said. The finals will be held in Visakhapatnam next month.",
    },
  ],

  // News Lines
  newsLines: [
    {
      id: 1,
      text: "Cricket: Rain delay expected at Municipal Ground",
    },
    {
      id: 2,
      text: "Volleyball qualifiers day-2 schedule updated",
    },
    {
      id: 3,
      text: "Marathon bib distribution from Friday 10 AM",
    },
  ],

  // Standings
  standings: {
    league: "School Cricket League",
    teams: [
      {
        id: 1,
        name: "Nellore Titans",
        played: 6,
        points: 10,
      },
      {
        id: 2,
        name: "Gudur Warriors",
        played: 6,
        points: 8,
      },
      {
        id: 3,
        name: "Sullur Stars",
        played: 6,
        points: 6,
      },
      {
        id: 4,
        name: "Kovur Kings",
        played: 6,
        points: 4,
      },
    ],
  },

  // Sponsored Content
  sponsored: {
    title: "Buy Sports Gear - Local Stores",
    tags: ["Cricket", "Volleyball", "Running"],
    action: "Explore Offers",
  },

  // Active filters
  activeFilters: {
    category: "All",
    region: "All",
  },
};

const sportsSlice = createSlice({
  name: "sports",
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeFilters.category = action.payload;
    },
    setActiveRegion: (state, action) => {
      state.activeFilters.region = action.payload;
    },
    resetFilters: (state) => {
      state.activeFilters = {
        category: "All",
        region: "All",
      };
    },
  },
});

export const setSportsCategory = sportsSlice.actions.setActiveCategory;
export const setSportsRegion = sportsSlice.actions.setActiveRegion;
export const resetSportsFilters = sportsSlice.actions.resetFilters;

export default sportsSlice.reducer;
