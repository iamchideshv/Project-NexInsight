
export interface Period {
  subject: string;
  faculty: string;
  type?: 'LAB' | 'TUTORIAL' | 'THEORY' | 'OTHER';
}

export const timeSlots = [
  "9:15-10:05", "10:05-10:55", "11:10-12:00", "12:00-12:50",
  "1:45-2:35", "2:35-3:25", "3:40-4:30"
];

const facultyMap: { [key: string]: string } = {
  DM: "Mrs. M. Bharathi",
  JP: "Mr. Jagadeesh",
  AI: "Mrs. M. Parvathi",
  ALG: "Ms. S. Shanmugapriya",
  DEV: "Dr. K. Lalitha, Dr. P. Karunakaran",
  "SAS-II": "Mr. R. Shankar, Ms. K. Abirami",
  IC: "Mrs. M. Senthamarai",
  NPTEL: "Mrs. T. Indhumathi",
  GATE: "Mr. C. Balasubramaniam",
  LIB: "Mrs. M. Parvathi",
  "AI LAB": "Mrs. M. Parvathi",
  "ALG LAB": "Ms. S. Shanmugapriya",
  "JP LAB": "Mr. Jagadeesh",
  "DEV LAB": "Dr. K. Lalitha",
  "DM(T)": "Mrs. M. Bharathi",
};

const getPeriod = (subject: string): Period | null => {
  if (subject === "-") return null;
  const faculty = facultyMap[subject] || "N/A";
  const type = subject.includes("LAB") ? 'LAB' : subject.includes("(T)") ? 'TUTORIAL' : 'THEORY';
  return { subject, faculty, type };
};

export const timetableData = {
  department: "AI&DS",
  semester: "III",
  section: "A",
  schedule: {
    MON: [getPeriod("AI LAB"), getPeriod("AI LAB"), getPeriod("AI LAB"), getPeriod("AI LAB"), getPeriod("ALG"), getPeriod("DEV"), getPeriod("DM(T)")],
    TUE: [getPeriod("ALG LAB"), getPeriod("ALG LAB"), getPeriod("ALG LAB"), getPeriod("ALG LAB"), getPeriod("GATE"), getPeriod("SAS-II"), getPeriod("NPTEL")],
    WED: [getPeriod("ALG"), getPeriod("DM"), getPeriod("DEV"), getPeriod("AI"), getPeriod("SAS-II"), getPeriod("LIB"), getPeriod("-")],
    THU: [getPeriod("JP LAB"), getPeriod("JP LAB"), getPeriod("ALG"), getPeriod("IC"), getPeriod("DM"), getPeriod("DEV LAB"), getPeriod("-")],
    FRI: [getPeriod("AI"), getPeriod("DM"), getPeriod("JP LAB"), getPeriod("JP LAB"), getPeriod("-"), getPeriod("-"), getPeriod("-")],
  }
};
