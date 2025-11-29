import { Student, AttendanceRecord } from '../types';

export const mockStudents: Student[] = [
  { id: '22AIDS001', name: 'Aravind Kumar', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '22AIDS002', name: 'Karthikeyan R', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '22AIDS003', name: 'Divya Lakshmi', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '22AIDS004', name: 'Praveen Raj', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '22AIDS005', name: 'Nithya Shree', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '22AIDS006', name: 'Hariharan M', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '22AIDS007', name: 'Keerthana V', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '22AIDS008', name: 'Vignesh S', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '22AIDS009', name: 'Sandhya Devi', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '22AIDS010', name: 'Santhosh Kumar', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '22AIDS011', name: 'Meena Priya', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '22AIDS012', name: 'Rajeshwari G', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '22AIDS013', name: 'Balaji R', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '22AIDS014', name: 'Kavitha Devi', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '22AIDS015', name: 'Manoj Kumar', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '22AIDS016', name: 'Revathi L', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '22AIDS017', name: 'Surya Narayanan', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '22AIDS018', name: 'Shruthi Raj', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '22AIDS019', name: 'Gokul Krishnan', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '22AIDS020', name: 'Swathi R', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '22AIDS021', name: 'Ajay Kumar', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '22AIDS022', name: 'Deepika Rani', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '22AIDS023', name: 'Saravanan K', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '22AIDS024', name: 'Monisha Devi', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '22AIDS025', name: 'Dinesh Kumar', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '22AIDS026', name: 'Lakshmi Priya', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '22AIDS027', name: 'Arun Prasad', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '22AIDS028', name: 'Bhuvaneshwari', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '22AIDS029', name: 'Yogesh R', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '22AIDS030', name: 'Gayathri Devi', department: 'Artificial Intelligence & Data Science', year: 2, section: 'A' },
  { id: '21AIDS001', name: 'Vishnu Priyan', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '21AIDS002', name: 'Harini S', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '21AIDS003', name: 'Naveen Kumar', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '21AIDS004', name: 'Soundarya M', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '21AIDS005', name: 'Kishore Raj', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '21AIDS006', name: 'Anitha Lakshmi', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '21AIDS007', name: 'Siva Karthik', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '21AIDS008', name: 'Priyadharshini', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '21AIDS009', name: 'Ashwin Raj', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '21AIDS010', name: 'Ranjitha M', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '21AIDS011', name: 'Vasanth Kumar', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '21AIDS012', name: 'Shalini Devi', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '21AIDS013', name: 'Lokesh K', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '21AIDS014', name: 'Krithika S', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '21AIDS015', name: 'Senthil Nathan', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '21AIDS016', name: 'Aishwarya Raj', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '21AIDS017', name: 'Raghul Kumar', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '21AIDS018', name: 'Nivedha L', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '21AIDS019', name: 'Bharath Raj', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '21AIDS020', name: 'Sneha Lakshmi', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '21AIDS021', name: 'Varun Raj', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '21AIDS022', name: 'Lavanya Devi', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '21AIDS023', name: 'Dhanush K', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '21AIDS024', name: 'Haritha R', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '21AIDS025', name: 'Sakthi Prasath', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '21AIDS026', name: 'Vidhya Lakshmi', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '21AIDS027', name: 'Gowtham Raj', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '21AIDS028', name: 'Janani M', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '21AIDS029', name: 'Arunkumar S', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '21AIDS030', name: 'Keerthika R', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '20AIDS001', name: 'Dinesh Babu', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS002', name: 'Anitha R', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS003', name: 'Harish Kumar', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS004', name: 'Swetha M', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS005', name: 'Mohan Raj', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS006', name: 'Priya Dharshini', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS007', name: 'Vimal Kumar', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS008', name: 'Sowmiya R', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS009', name: 'Ramesh K', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS010', name: 'Sneha Rani', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS011', name: 'Haritha Devi', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS012', name: 'Vinoth Kumar', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS013', name: 'Dharani R', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS014', name: 'Arthi S', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS015', name: 'Naveena Devi', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS016', name: 'Saran Raj', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS017', name: 'Pavithra M', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS018', name: 'Gokul Raj', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS019', name: 'Sanjay Kumar', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS020', name: 'Deepa Lakshmi', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS021', name: 'Pranav K', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS022', name: 'Kaviya R', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS023', name: 'Rajkumar S', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS024', name: 'Divakar M', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS025', name: 'Monika Devi', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS026', name: 'Arthi Lakshmi', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS027', name: 'Siva Raj', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS028', name: 'Krishnan M', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS029', name: 'Gowri Devi', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS030', name: 'Prasanth R', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS031', name: 'Meenakshi S', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS032', name: 'Balasubramani', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS033', name: 'Kiruthika Devi', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS034', name: 'Rahul Raj', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS035', name: 'Tharani M', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS036', name: 'Yogesh Kumar', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS037', name: 'Varsha R', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS038', name: 'Vishal K', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS039', name: 'Kowsalya Devi', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  { id: '20AIDS040', name: 'Sathish Kumar', department: 'Artificial Intelligence & Data Science', year: 4, section: 'A' },
  // Adding old mock students to ensure other data (like marks) still works.
  { id: '22AIDS050', name: 'R. Kumar', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '22AIDS051', name: 'P. Sharma', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '22AIDS052', name: 'S. Verma', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '22AIDS053', name: 'A. Gupta', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
  { id: '22AIDS054', name: 'V. Singh', department: 'Artificial Intelligence & Data Science', year: 3, section: 'A' },
];

// Helper function to generate records for a specific student (used for detailed view)
const generateRecords = (): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const subjects = ['AI', 'ALG', 'DM', 'JP LAB', 'DEV'];
  const today = new Date();
  const studentId = '22AIDS050'; // Hardcoded for the student detailed view demo

  for (let i = 0; i < 90; i++) { // 90 days of records
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;

    subjects.forEach(subjectCode => {
      // Simulate 5 periods a day
      if (Math.random() > 0.3) { // Not all subjects every day
        const status = Math.random() > 0.1 ? 'Present' : 'Absent'; // 10% absent rate
        records.push({
          studentId,
          subjectCode,
          date: date.toISOString().split('T')[0],
          status,
        });
      }
    });
  }
  return records;
};

export const attendanceRecords: AttendanceRecord[] = generateRecords();
