import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { Input } from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import { saveFormSubmission } from '../lib/storage';
import { BackButton } from '../components/BackButton';

const bonafideSchema = z.object({
  rollNo: z.string().regex(/^CB\d{4}$/, 'Invalid roll number format'),
  purpose: z.string().min(10, 'Please provide a detailed purpose'),
});

type BonafideForm = z.infer<typeof bonafideSchema>;

export function Bonafide() {
  const [loading, setLoading] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BonafideForm>({
    resolver: zodResolver(bonafideSchema),
    defaultValues: {
      rollNo: user?.rollNo || '',
    },
  });

  const onSubmit = async (data: BonafideForm) => {
    try {
      setLoading(true);
      if (!user?._id) throw new Error('User not authenticated');

      await saveFormSubmission({
        userId: user._id,
        type: 'bonafide',
        status: 'pending',
      });

      toast.success('Bonafide application submitted successfully!');
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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Bonafide Certificate Request</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Roll Number"
            {...register('rollNo')}
            error={errors.rollNo?.message}
            disabled={!!user?.rollNo}
          />
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Purpose of Certificate
            </label>
            <textarea
              {...register('purpose')}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              rows={4}
              placeholder="Please specify the purpose for requesting the certificate..."
            />
            {errors.purpose && (
              <p className="text-sm text-red-500">{errors.purpose.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>

        {showDownload && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <p className="text-green-800 font-medium">Application Status: Approved</p>
            <p className="mt-2 text-sm text-green-600">
              Your Bonafide certificate request has been approved. You can download the certificate now.
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