import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Download } from 'lucide-react';
import { getStudentData } from '../lib/storage';
import { toast } from 'react-hot-toast';
import { BackButton } from '../components/BackButton';

export function Fees() {
  const [loading, setLoading] = useState(false);
  const [feesData, setFeesData] = useState<ReturnType<typeof getStudentData>['fees'] | null>(null);
  const { user } = useAuth();

  const checkFees = async () => {
    try {
      setLoading(true);
      if (!user?._id) throw new Error('User not authenticated');
      const studentData = getStudentData(user._id);
      setFeesData(studentData.fees);
    } catch (error) {
      console.error('Failed to fetch fees data:', error);
      toast.error('Failed to fetch fees data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <BackButton />
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Fees Balance</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <button
          onClick={checkFees}
          disabled={loading}
          className="w-full mb-6 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {loading ? 'Checking...' : 'Check Fees Balance'}
        </button>

        {feesData && (
          <div className="space-y-6">
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Tuition Fees:</span>
                <span className="font-medium">₹{feesData.tuition.toLocaleString()}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Bus Fees:</span>
                <span className="font-medium">₹{feesData.bus.toLocaleString()}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Hostel Fees:</span>
                <span className="font-medium">₹{feesData.hostel.toLocaleString()}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Miscellaneous:</span>
                <span className="font-medium">₹{feesData.miscellaneous.toLocaleString()}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 p-4 bg-primary/10 rounded-lg font-medium">
                <span className="text-primary">Total Fees:</span>
                <span>₹{feesData.total.toLocaleString()}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 p-4 bg-green-50 rounded-lg">
                <span className="text-green-600">Amount Paid:</span>
                <span className="font-medium">₹{feesData.paid.toLocaleString()}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 p-4 bg-red-50 rounded-lg">
                <span className="text-red-600">Balance:</span>
                <span className="font-medium">₹{feesData.balance.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => toast.success('Download functionality will be implemented soon!')}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-primary text-primary rounded-md hover:bg-primary/5"
            >
              <Download size={16} />
              Download Statement
            </button>
          </div>
        )}
      </div>
    </div>
  );
}