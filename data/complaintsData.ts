import { Complaint } from '../types';

export let complaintsData: Complaint[] = [
  { 
    id: 1, 
    title: "Issue with Library Wi-Fi", 
    submittedBy: "R. Kumar", 
    role: "Student", 
    date: "2024-07-20", 
    status: "In Review", 
    details: "The Wi-Fi in the central library is very slow and disconnects frequently. It's frustrating when trying to study.",
    sentiment: "Frustrated" 
  },
  { 
    id: 2, 
    title: "Broken Projector in Hall-B", 
    submittedBy: "Dr. Ben Carter", 
    role: "Faculty", 
    date: "2024-07-19", 
    status: "In Review", 
    details: "The projector in Hall-B is not working at all. This is an emergency as I have a seminar tomorrow. Please fix this immediately!",
    sentiment: "Urgent" 
  },
  { 
    id: 3, 
    title: "Canteen Cleanliness", 
    submittedBy: "P. Sharma", 
    role: "Student", 
    date: "2024-07-22", 
    status: "Raised", 
    details: "Tables in the canteen are not being cleaned regularly after lunch hours. The situation is awful and unsanitary.",
    sentiment: "Frustrated" 
  },
  { 
    id: 4, 
    title: "Request for new books", 
    submittedBy: "Ms. Maria Garcia", 
    role: "Faculty", 
    date: "2024-07-15", 
    status: "Resolved", 
    details: "It would be helpful to have the 'Advanced Algorithms' book for the new semester.",
    sentiment: "Suggestion" 
  },
  {
    id: 5,
    title: "Leaking AC in Room 301",
    submittedBy: "S. Verma",
    role: "Student",
    date: "2024-07-23",
    status: "Raised",
    details: "Water is dripping from the AC unit onto the desks. This is a critical issue and needs to be fixed ASAP.",
    sentiment: "Urgent"
  },
];