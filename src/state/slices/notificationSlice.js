import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Filters
  notificationsFilters: [
    { id: 1, label: 'All' },
    { id: 2, label: 'General' },
    { id: 3, label: 'Exams' },
    { id: 4, label: 'Admissions' },
    { id: 5, label: 'Updates' },
  ],

  // Main notification list (dummy content – replace later)
  notificationsList: [
    {
      id: 1,
      title: "AP Board Released New Circular - October 2025",
      category: "General",
      board: "AP",
      session: "2024-25",
      tags: ["Circular", "Published 1h ago", "AP"],
      description: "Important notice for school managements regarding academic schedule.",
      actions: ["View", "Download PDF"],
      publishedDate: new Date("2025-10-27"),
      fullContent: "The Andhra Pradesh State Board of Education has released a new circular regarding the academic schedule for the upcoming months. All schools are mandated to follow the revised timings and holiday list. \n\n Key highlights include the rescheduling of the mid-term exams to the first week of November and the declaration of Dussehra holidays from October 15th. School principals are requested to disseminate this information to parents and students immediately.",
    },
    {
      id: 2,
      title: "Group-IV Exam Notification - Certificate Verification",
      category: "Exams",
      board: "AP",
      session: "2024-25",
      tags: ["Govt Exams", "Today"],
      description: "Candidates shortlisted for CV. Schedule released.",
      actions: ["Open", "PDF"],
      publishedDate: new Date("2025-10-27"),
      fullContent: "The AP Public Service Commission has released the schedule for the certificate verification process for Group-IV service posts. Candidates who have qualified in the written examination are required to attend the verification on their allotted dates. \n\n Please carry all original certificates along with two sets of photocopies. The verification will take place at the Commission's headquarters in Vijayawada from November 5th to November 10th. Failure to attend will result in disqualification.",
    },
    {
      id: 3,
      title: "NEET Counselling Instructions Updated - Round 2",
      category: "Admissions",
      board: "National",
      session: "2024-25",
      tags: ["Medical", "Updated 30m ago"],
      description: "Revised reporting guidelines for students.",
      actions: ["Instructions", "Allotment"],
      publishedDate: new Date("2025-10-27"),
      fullContent: "The Medical Counselling Committee (MCC) has updated the instructions for the second round of NEET UG counselling. Students allotted seats in this round must report to their respective colleges by November 2nd. \n\n The updated guidelines clarify the documents required for admission and the fee payment process. Candidates are advised to download their allotment letters from the official portal and proceed with the reporting formalities to secure their seats.",
    },
    {
      id: 4,
      title: "AP Schools Holiday Notification",
      category: "General",
      board: "AP",
      session: "2024-25",
      tags: ["Schools", "Released"],
      description: "Schools closed due to heavy rainfall for two days.",
      actions: ["View Notice"],
      publishedDate: new Date("2025-10-26"),
      fullContent: "Due to the heavy rainfall forecast by the IMD, the District Collector has declared a holiday for all public and private schools in the Nellore district for the next two days (October 27th and 28th). \n\n This measure is taken to ensure the safety of students and staff. Online classes may be conducted at the discretion of the school management. Please stay indoors and stay safe.",
    },
    {
      id: 5,
      title: "University Academic Calendar Update - Nov 2025",
      category: "Updates",
      board: "AP",
      session: "2024-25",
      tags: ["Universities", "Calendar"],
      description: "Revised timetable for semester exams.",
      actions: ["Download Calendar"],
      publishedDate: new Date("2025-10-25"),
      fullContent: "The revised academic calendar for state universities has been published. The semester examinations previously scheduled for late October have been pushed to the second week of November to accommodate the missed working days. \n\n Students can download the detailed subject-wise timetable from their respective university websites. Practical exams will commence immediately after the theory exams.",
    },
  ],

  // Page details
  notificationsPage: {
    currentPage: 1,
    totalPages: 9,
    isLoading: false,
  },

  // Recently opened (same as recently viewed)
  recentlyOpened: [
    { id: 1, title: "AP Board Released New Circular - October 2025" },
    { id: 2, title: "Group-IV Exam Notification - Certificate Verification" },
    { id: 3, title: "NEET Counselling Instructions Updated - Round 2" },
  ],

  // Important links
  importantNotificationLinks: [
    { id: 1, label: "AP Government Notifications", url: "#" },
    { id: 2, label: "Exam Board Official Portal", url: "#" },
    { id: 3, label: "Medical Counselling Updates", url: "#" },
  ],

  // Tools
  notificationTools: [
    { id: 1, label: "Filter by Date", icon: "bi-calendar-event" },
    { id: 2, label: "Choose Category", icon: "bi-ui-checks-grid" },
    { id: 3, label: "Set Alerts", icon: "bi-bell" },
    { id: 4, label: "Save this filter", icon: "bi-bookmark" },
  ],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotificationsPage: (state, action) => {
      state.notificationsPage.currentPage = action.payload;
    },
    setNotificationsLoading: (state, action) => {
      state.notificationsPage.isLoading = action.payload;
    },
    addToRecentlyOpened: (state, action) => {
      const item = action.payload;

      // Remove if already exists
      state.recentlyOpened = state.recentlyOpened.filter(
        (x) => x.id !== item.id
      );

      // Add to top
      state.recentlyOpened.unshift({ id: item.id, title: item.title });

      // Keep last 5 only
      state.recentlyOpened = state.recentlyOpened.slice(0, 5);
    },
  },
});

export const {
  setNotificationsPage,
  setNotificationsLoading,
  addToRecentlyOpened,
} = notificationSlice.actions;

export default notificationSlice.reducer;
