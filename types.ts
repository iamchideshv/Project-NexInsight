export enum Role {
  Admin = 'Admin',
  Faculty = 'Faculty',
  Student = 'Student',
  None = 'None',
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePicture: string;
}

export interface StaffProfile extends UserProfile {
  doj: string;
  experience: string;
  qualification: string;
}

export interface StudentProfile extends UserProfile {
  rollNumber: string;
  department: string;
  year: number;
  attendancePercentage: number;
}

// New Types for Attendance and Marks
export interface Student {
  id: string;
  name:string;
  department: string;
  year: number;
  section: string;
}

export interface AttendanceRecord {
  studentId: string;
  subjectCode: string;
  date: string; // YYYY-MM-DD
  status: 'Present' | 'Absent';
}

export interface Subject {
  code: string;
  name: string;
}

export interface MarksRecord {
  studentId: string;
  subjectCode: string;
  cat1: number;
  cat2: number;
  internal: number;
  maxMarks: 50;
  attendancePercentage?: number;
  remarks?: string;
  status: 'Draft' | 'Published';
}

// New Type for Complaints
export type Sentiment = 'Urgent' | 'Frustrated' | 'Suggestion';
export type ComplaintStatus = 'Raised' | 'In Review' | 'Resolved';

export interface Complaint {
  id: number;
  title: string;
  submittedBy: string;
  role: 'Student' | 'Faculty';
  date: string;
  status: ComplaintStatus;
  details: string;
  sentiment: Sentiment;
}

// New Type for Lost and Found
export type LostAndFoundStatus = 'Claimed' | 'Unclaimed';
export interface LostAndFoundItem {
  id: number;
  name: string;
  type: 'Lost' | 'Found';
  description: string;
  date: string;
  location: string;
  status: LostAndFoundStatus;
  image: string;
  claimedByEmail?: string;
  claimedByPhone?: string;
}


// New Type for On Duty Requests
export type OnDutyStatus = 'Pending' | 'Approved' | 'Rejected';

export interface OnDutyRequest {
  id: number;
  reason: string;
  date: string; // YYYY-MM-DD
  hours: number[]; // Array of period indices (0-6)
  status: OnDutyStatus;
}

// New Type for Faculty Data
export interface FacultyMember {
  name: string;
  designation: string;
  email: string;
  phone: string;
  qualification: string;
  specialization: string;
  photoUrl: string;
}