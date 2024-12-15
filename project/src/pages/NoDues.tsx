import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { Input } from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { saveFormSubmission } from '../lib/storage';
import { BackButton } from '../components/BackButton';

const noDuesSchema = z.object({
  rollNo: z.string().regex(/^CB\d{4}$/, 'Invalid roll number format'),
  department: z.string().min(1, 'Department is required'),
  year: z.number().min(1).max(4),
  semester: z.number().min(1).max(8),
  reason: z.string().min(10, 'Please provide a detailed reason'),
});

type NoDuesForm = z.infer<typeof noDuesSchema>;

export function NoDues() {
  const [loading, setLoading] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoDuesForm>({
    resolver: zodResolver(noDuesSchema),
    defaultValues: {
      rollNo: user?.rollNo || '',
      year: 3,
      semester: 5,
    },
  });

  const onSubmit = async (data: NoDuesForm) => {
    try {
      setLoading(true);
      if (!user?._id) throw new Error('User not authenticated');

      await saveFormSubmission({
        userId: user._id,
        type: 'noDues',
        status: 'pending',
      });

      toast.success('No Dues application submitted successfully!');
      setShowDownload(true);
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <BackButton />
      <h1 className="text-3xl font-bold text-gray-900 mb-8">No Dues Application</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Roll Number"
            {...register('rollNo')}
            error={errors.rollNo?.message}
            disabled={!!user?.rollNo}
          />
          
          <Input
            label="Department"
            {...register('department')}
            error={errors.department?.message}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Year"
              type="number"
              {...register('year', { valueAsNumber: true })}
              error={errors.year?.message}
            />
            
            <Input
              label="Semester"
              type="number"
              {...register('semester', { valueAsNumber: true })}
              error={errors.semester?.message}
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Reason for No Dues
            </label>
            <textarea
              {...register('reason')}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              rows={4}
            />
            {errors.reason && (
              <p className="text-sm text-red-500">{errors.reason.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>

        {showDownload && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <p className="text-green-800 font-medium">Application Status: Approved</p>
            <p className="mt-2 text-sm text-green-600">
              Your No Dues application has been approved. You can download the certificate now.
            </p>
            <button
              className="mt-4 w-full flex justify-center py-2 px-4 border border-green-600 text-green-600 rounded-md hover:bg-green-50"
              onClick={() => toast.success('Download functionality will be implemented soon!')}
            >
              Download Certificate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}