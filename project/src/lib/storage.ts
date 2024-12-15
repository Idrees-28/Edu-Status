// Temporary storage for form submissions and student data
const FORM_SUBMISSIONS_KEY = 'edu_status_form_submissions';
const STUDENT_DATA_KEY = 'edu_status_student_data';

interface FormSubmission {
  id: string;
  userId: string;
  type: 'noDues' | 'bonafide';
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  lastSubmission?: string;
}

interface StudentData {
  userId: string;
  fees: {
    tuition: number;
    bus: number;
    hostel: number;
    miscellaneous: number;
    total: number;
    paid: number;
    balance: number;
  };
  attendance: {
    totalDays: number;
    presentDays: number;
    absentDays: number;
    percentage: number;
    fine: number;
  };
}

export const getFormSubmissions = () => {
  const submissions = localStorage.getItem(FORM_SUBMISSIONS_KEY);
  return submissions ? JSON.parse(submissions) : [];
};

export const saveFormSubmission = (submission: Omit<FormSubmission, 'id' | 'submittedAt'>) => {
  const submissions = getFormSubmissions();
  
  // Check if user already submitted today
  const today = new Date().toISOString().split('T')[0];
  const existingSubmission = submissions.find(
    (s: FormSubmission) => 
      s.userId === submission.userId && 
      s.type === submission.type &&
      s.submittedAt.startsWith(today)
  );

  if (existingSubmission) {
    throw new Error('You have already submitted an application today');
  }

  const newSubmission = {
    ...submission,
    id: `${submission.type}_${Date.now()}`,
    submittedAt: new Date().toISOString(),
    status: 'approved' as const, // Auto-approve for demo
  };

  submissions.push(newSubmission);
  localStorage.setItem(FORM_SUBMISSIONS_KEY, JSON.stringify(submissions));
  return newSubmission;
};

export const getStudentData = (userId: string): StudentData => {
  const allData = localStorage.getItem(STUDENT_DATA_KEY);
  const studentData = allData ? JSON.parse(allData) : {};
  
  if (!studentData[userId]) {
    // Generate random data for new students
    const totalDays = 120;
    const absentDays = Math.floor(Math.random() * 20);
    const presentDays = totalDays - absentDays;
    const percentage = Math.round((presentDays / totalDays) * 100);

    studentData[userId] = {
      userId,
      fees: {
        tuition: 75000,
        bus: 15000,
        hostel: 45000,
        miscellaneous: 5000,
        total: 140000,
        paid: Math.round(Math.random() * 140000),
        balance: 0, // Will be calculated
      },
      attendance: {
        totalDays,
        presentDays,
        absentDays,
        percentage,
        fine: absentDays * 50, // ₹50 per day
      },
    };

    // Calculate balance
    studentData[userId].fees.balance = 
      studentData[userId].fees.total - studentData[userId].fees.paid;

    localStorage.setItem(STUDENT_DATA_KEY, JSON.stringify(studentData));
  }

  return studentData[userId];
};