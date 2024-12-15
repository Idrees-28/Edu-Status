import { useNavigate } from 'react-router-dom';
import { FileText, FileCheck, CreditCard, Calendar } from 'lucide-react';
import { Card } from '../components/ui/Card';

export function Dashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'No Dues',
      description: 'Apply for No Dues certificate and track your application status',
      icon: <FileText className="h-6 w-6" />,
      action: {
        label: 'Apply Now',
        onClick: () => navigate('/no-dues'),
      },
      imageSrc: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=2070',
    },
    {
      title: 'Bonafide',
      description: 'Request Bonafide certificate for various purposes',
      icon: <FileCheck className="h-6 w-6" />,
      action: {
        label: 'Apply Now',
        onClick: () => navigate('/bonafide'),
      },
      imageSrc: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=2070',
    },
    {
      title: 'Fees Balance',
      description: 'Check your fees status and download payment details',
      icon: <CreditCard className="h-6 w-6" />,
      action: {
        label: 'Check Balance',
        onClick: () => navigate('/fees'),
      },
      imageSrc: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2070',
    },
    {
      title: 'Attendance',
      description: 'View your attendance records and manage absences',
      icon: <Calendar className="h-6 w-6" />,
      action: {
        label: 'Manage',
        onClick: () => navigate('/attendance'),
      },
      imageSrc: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=2070',
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Welcome to EduStatus</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
}