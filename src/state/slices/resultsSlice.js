import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  resultsFilters: [
    { id: 1, label: 'All' },
    { id: 2, label: 'Schools' },
    { id: 3, label: 'Universities' },
    { id: 4, label: 'Govt Exams' },
    { id: 5, label: 'Medical' },
  ],
  resultsList: [
    {
      id: 1,
      title: 'Polytechnic Semester Results - Oct 2025',
      category: 'Universities',
      board: 'AP',
      session: '2024-25',
      tags: ['State Board', 'Published 2h ago', 'AP'],
      passPercentage: '72.4',
      description: 'Revaluation window from Oct 29-Nov 2. Help desks available at regional centers.',
      actions: ['View', 'Download PDF'],
      publishedDate: new Date('2025-10-27'),
      fullContent: 'The State Board of Technical Education and Training (SBTET), Andhra Pradesh, has declared the Polytechnic Semester Results for examinations held in October 2025. \n\n The overall pass percentage is 72.4%. Students can check their results using their PIN numbers on the official portal. Applications for revaluation and recounting will be accepted online from October 29th to November 2nd. Help desks have been set up at all government polytechnic colleges to assist students.',
    },
    {
      id: 2,
      title: 'Group-IV Merit List (Provisional)',
      category: 'Govt Exams',
      board: 'AP',
      session: '2024-25',
      tags: ['Govt Exams', 'Today', 'District'],
      description: 'Roll numbers shortlisted for certificate verification phase 1.',
      actions: ['Open', 'Cutoff'],
      publishedDate: new Date('2025-10-27'),
      fullContent: 'The AP Public Service Commission has released the provisional merit list for the Group-IV services recruitment exam. The list contains the roll numbers of candidates shortlisted for Phase 1 of certificate verification. \n\n Candidates are advised to check their roll numbers and download the verification schedule. The cutoff marks for various categories have also been published alongside the merit list. Original certificates must be produced during verification.',
    },
    {
      id: 3,
      title: 'NEET Counselling Round 2 Seat Allotment',
      category: 'Medical',
      board: 'AP',
      session: '2024-25',
      tags: ['Medical', 'Updated 1h', 'State'],
      description: 'Download allotment list and report to institutes before Nov 3.',
      actions: ['Allotment', 'Instructions'],
      publishedDate: new Date('2025-10-27'),
      fullContent: 'The seat allotment list for the second round of NEET UG counselling for state quota seats has been released. Candidates can now download their allotment letters from the official medical counselling website. \n\n All allotted candidates must report to their respective colleges on or before November 3rd, 2025, with all necessary documents and fees. Failure to report will result in forfeiture of the seat.',
    },
    {
      id: 4,
      title: 'SSC Supply Results - September 2025',
      category: 'Schools',
      board: 'AP',
      session: '2024-25',
      tags: ['Schools', 'Released', 'AP SSC'],
      description: 'Enter 10-digit hall ticket number to view detailed marks memo.',
      actions: ['Check', 'Marks Memo'],
      publishedDate: new Date('2025-10-26'),
      fullContent: 'The Board of Secondary Education, Andhra Pradesh (BSEAP), has announced the results for the SSC Advanced Supplementary Examinations held in September 2025. \n\n Students can view their subject-wise marks by entering their 10-digit hall ticket number on the official results portal. The digital marks memo is valid for immediate admission purposes until the original certificates are issued.',
    },
    {
      id: 5,
      title: 'Diploma Revaluation Results - Aug 2025',
      category: 'Universities',
      board: 'AP',
      session: '2024-25',
      tags: ['Revaluation', 'Now Live', 'AP SBTET'],
      description: 'Search by Pin/Reg No. Changes, if any, reflect in new consolidated marks.',
      actions: ['Search', 'Notification'],
      publishedDate: new Date('2025-10-25'),
      fullContent: 'The results for Diploma Revaluation for examinations conducted in August 2025 are now live. Students who applied for revaluation can check if there are any changes in their marks by searching with their PIN or Registration Number. \n\n Any changes in marks will be reflected in the new consolidated marks memo, which will be dispatched to the respective colleges within 15 days.',
    },
    {
      id: 6,
      title: 'Intermediate 1st Year Results - March 2025',
      category: 'Schools',
      board: 'AP',
      session: '2024-25',
      tags: ['Schools', 'Published 3h ago', 'AP BIE'],
      passPercentage: '68.2',
      description: 'Results declared for all streams. Download mark sheets from official portal.',
      actions: ['View', 'Download PDF'],
      publishedDate: new Date('2025-10-27'),
      fullContent: 'The Board of Intermediate Education, Andhra Pradesh (BIEAP), has declared the 1st Year Intermediate Results for the academic year 2024-25. The overall pass percentage for the general stream stands at 68.2%. \n\n Results for Vocational, General, and Bridge courses have been released simultaneously. Students can download their short memos from the BIEAP website. The revaluation schedule has also been notified.',
    },
    {
      id: 7,
      title: 'APPSC Group-2 Mains Results',
      category: 'Govt Exams',
      board: 'AP',
      session: '2024-25',
      tags: ['Govt Exams', 'Yesterday', 'State'],
      description: 'Merit list published. Document verification schedule to be announced soon.',
      actions: ['View Result', 'Merit List'],
      publishedDate: new Date('2025-10-26'),
      fullContent: 'The APPSC has published the results for the Group-2 Mains examination. The list of candidates provisionally selected for the next stage of the recruitment process is now available on the commission\'s website. \n\n The schedule for document verification and computer proficiency test (CPT) will be announced shortly. Candidates are advised to keep their hall tickets and original documents ready.',
    },
    {
      id: 8,
      title: 'Engineering 2nd Year Results - June 2025',
      category: 'Universities',
      board: 'AP',
      session: '2024-25',
      tags: ['Universities', 'Published 5h ago', 'JNTU'],
      passPercentage: '75.8',
      description: 'Regular and supply exam results available. Revaluation applications open.',
      actions: ['Check Result', 'Revaluation'],
      publishedDate: new Date('2025-10-27'),
      fullContent: 'JNTU has released the results for B.Tech 2nd Year Regular and Supplementary examinations held in June 2025. The pass percentage for this semester is recorded at 75.8%. \n\n Students can check their detailed results by logging into the student portal. The window for applying for revaluation and challenge valuation opens tomorrow and will remain open for one week.',
    },
  ],
  resultsPage: {
    currentPage: 1,
    totalPages: 9,
    isLoading: false,
  },
  recentlyViewed: [
    { id: 1, title: 'Group-IV Merit List (Provisional)' },
    { id: 2, title: 'SSC Supply Results - Sep 2025' },
    { id: 3, title: 'Diploma Revaluation Results - Aug 2025' },
  ],
  importantLinks: [
    { id: 1, label: 'AP SBTET Official Portal', url: '#' },
    { id: 2, label: 'AP SSC Results', url: '#' },
    { id: 3, label: 'NEET Counselling', url: '#' },
  ],
  resultTools: [
    { id: 1, label: 'Select Exam Date', icon: 'bi-calendar-event' },
    { id: 2, label: 'Choose Region / District', icon: 'bi-geo-alt' },
    { id: 3, label: 'Set Alerts', icon: 'bi-bell' },
    { id: 4, label: 'Save this filter', icon: 'bi-bookmark' },
  ],
};

const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setResultsPage: (state, action) => {
      state.resultsPage.currentPage = action.payload;
    },
    setResultsLoading: (state, action) => {
      state.resultsPage.isLoading = action.payload;
    },
    addToRecentlyViewed: (state, action) => {
      const result = action.payload;
      // Remove if already exists
      state.recentlyViewed = state.recentlyViewed.filter(item => item.id !== result.id);
      // Add to beginning
      state.recentlyViewed.unshift({ id: result.id, title: result.title });
      // Keep only last 5
      state.recentlyViewed = state.recentlyViewed.slice(0, 5);
    },
  },
});

export const {
  setResultsPage,
  setResultsLoading,
  addToRecentlyViewed
} = resultsSlice.actions;
export default resultsSlice.reducer;