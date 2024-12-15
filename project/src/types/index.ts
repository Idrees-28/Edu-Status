export interface User {
  _id: string;
  name: string;
  email: string;
  rollNo?: string;
  role: 'admin' | 'student';
}

export interface Student {
  _id: string;
  name: string;
  rollNo: string;
  email: string;
  year: number;
  semester: number;
  department: string;
  attendance: {
    totalDays: number;
    presentDays: number;
    absentDays: number;
    percentage: number;
    fine: number;
  };
  fees: {
    tuition: number;
    bus: number;
    hostel: number;
    miscellaneous: number;
    total: number;
    paid: number;
    balance: number;
  };
  applications: {
    noDues: {
      status: 'pending' | 'approved' | 'rejected' | null;
      lastApplied: Date | null;
    };
    bonafide: {
      status: 'pending' | 'approved' | 'rejected' | null;
      lastApplied: Date | null;
      purpose?: string;
    };
  };
}