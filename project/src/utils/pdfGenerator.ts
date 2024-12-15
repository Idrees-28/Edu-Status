import { jsPDF } from 'jspdf';

interface NoDuesData {
  name: string;
  rollNo: string;
  department: string;
  year: number;
  semester: number;
  date: string;
}

interface FeesData {
  name: string;
  rollNo: string;
  date: string;
  tuition: number;
  bus: number;
  hostel: number;
  miscellaneous: number;
  total: number;
  paid: number;
  balance: number;
}

export async function generateNoDuesPDF(data: NoDuesData) {
  const doc = new jsPDF();
  
  // Add header
  doc.setFontSize(20);
  doc.text('No Dues Certificate', 105, 20, { align: 'center' });
  
  // Add college details
  doc.setFontSize(12);
  doc.text('EduStatus University', 105, 30, { align: 'center' });
  doc.text('(Approved by AICTE & Affiliated to Anna University)', 105, 35, { align: 'center' });
  
  // Add line
  doc.line(20, 40, 190, 40);
  
  // Add content
  doc.setFontSize(12);
  const content = [
    `This is to certify that ${data.name} (Roll No: ${data.rollNo})`,
    `of ${data.department} Department, studying in Year ${data.year}, Semester ${data.semester}`,
    'has no dues pending in any department of the college.',
    '',
    `Date: ${data.date}`,
    '',
    '',
    'Principal',
    'EduStatus University'
  ];
  
  let y = 60;
  content.forEach(line => {
    doc.text(line, 20, y);
    y += 10;
  });
  
  // Add signature placeholder
  doc.text('(Digital Signature)', 20, y + 10);
  
  return doc.output('blob');
}

export async function generateFeesPDF(data: FeesData) {
  const doc = new jsPDF();
  
  // Add header
  doc.setFontSize(20);
  doc.text('Fees Statement', 105, 20, { align: 'center' });
  
  // Add college details
  doc.setFontSize(12);
  doc.text('EduStatus University', 105, 30, { align: 'center' });
  doc.text('(Approved by AICTE & Affiliated to Anna University)', 105, 35, { align: 'center' });
  
  // Add line
  doc.line(20, 40, 190, 40);
  
  // Add student details
  doc.setFontSize(12);
  doc.text(`Name: ${data.name}`, 20, 50);
  doc.text(`Roll No: ${data.rollNo}`, 20, 60);
  doc.text(`Date: ${data.date}`, 20, 70);
  
  // Add fees breakdown
  const fees = [
    ['Tuition Fees:', `₹${data.tuition.toLocaleString()}`],
    ['Bus Fees:', `₹${data.bus.toLocaleString()}`],
    ['Hostel Fees:', `₹${data.hostel.toLocaleString()}`],
    ['Miscellaneous:', `₹${data.miscellaneous.toLocaleString()}`],
    ['Total:', `₹${data.total.toLocaleString()}`],
    ['Paid:', `₹${data.paid.toLocaleString()}`],
    ['Balance:', `₹${data.balance.toLocaleString()}`],
  ];
  
  let y = 90;
  fees.forEach(([label, value]) => {
    doc.text(label, 40, y);
    doc.text(value, 120, y);
    y += 10;
  });
  
  // Add signature
  doc.text('Principal', 20, y + 20);
  doc.text('EduStatus University', 20, y + 30);
  doc.text('(Digital Signature)', 20, y + 40);
  
  return doc.output('blob');
}