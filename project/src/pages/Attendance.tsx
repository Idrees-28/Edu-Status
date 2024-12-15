import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getStudentData } from '../lib/storage';
import { toast } from 'react-hot-toast';
import { BackButton } from '../components/BackButton';

export function Attendance() {
  const [loading, setLoading] = useState(false);
  const [attendanceData, setAttendanceData] = useState<ReturnType<typeof getStudentData>['attendance'] | null>(null);
  const { user } = useAuth();

  const checkAttendance = async () => {
    try {
      setLoading(true);
      if (!user?._id) throw new Error('User not authenticated');
      const studentData = getStudentData(user._id);
      setAttendanceData(studentData.attendance);
    } catch (error) {
      console.error('Failed to fetch attendance data:', error);
      toast.error('Failed to fetch attendance data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <BackButton />
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Attendance Management</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <button
          onClick={checkAttendance}
          disabled={loading}
          className="w-full mb-6 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          {loading ? 'Loading...' : 'Check Attendance'}
        </button>

        {attendanceData && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Total Working Days</div>
                <div className="text-2xl font-bold mt-1">{attendanceData.totalDays}</div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Days Present</div>
                <div className="text-2xl font-bold text-green-600 mt-1">
                  {attendanceData.presentDays}
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Days Absent</div>
                <div className="text-2xl font-bold text-red-600 mt-1">
                  {attendanceData.absentDays}
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Attendance Percentage</div>
                <div className={`text-2xl font-bold mt-1 ${
                  attendanceData.percentage >= 75 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {attendanceData.percentage}%
                </div>
              </div>
            </div>

            {attendanceData.fine > 0 && (
              <div className="p-4 bg-red-50 rounded-lg">
                <div className="text-sm text-red-600">Fine Amount</div>
                <div className="text-2xl font-bold text-red-600 mt-1">
                  ₹{attendanceData.fine.toLocaleString()}
                </div>
                <p className="text-sm text-red-500 mt-2">
                  Fine calculated at ₹50 per day of absence
                </p>
              </div>
            )}

            <button
              onClick={() => toast.success('Download functionality will be implemented soon!')}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-primary text-primary rounded-md hover:bg-primary/5"
            >
              Download Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
}