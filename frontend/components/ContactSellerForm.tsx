'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import api from '@/lib/api';
import { Mail, Phone, User, MessageSquare } from 'lucide-react';

interface ContactSellerFormProps {
  listingId: string;
  listingTitle: string;
}

export default function ContactSellerForm({ listingId, listingTitle }: ContactSellerFormProps) {
  const { user, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : '',
    email: user?.email || '',
    phone: '',
    message: `I'm interested in ${listingTitle}. Please contact me with more details.`,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [reportData, setReportData] = useState({
    reason: '',
    details: '',
  });
  const [isReporting, setIsReporting] = useState(false);
  const [reportStatus, setReportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [hasReported, setHasReported] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const reportKey = `listing-report-submitted-${listingId}`;
    setHasReported(localStorage.getItem(reportKey) === 'true');
  }, [listingId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await api.listings.contactSeller(listingId, formData);
      
      setSubmitStatus('success');
      setFormData(prev => ({ ...prev, message: '', phone: '' }));
    } catch (error) {
      console.error('Failed to send inquiry:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReportChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    setReportData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (hasReported) {
      return;
    }

    if (!isAuthenticated) {
      setReportStatus('error');
      return;
    }

    setIsReporting(true);
    setReportStatus('idle');

    try {
      await api.listings.report(listingId, {
        reason: reportData.reason,
        details: reportData.details || undefined,
      });

      setReportStatus('success');
      setReportData({ reason: '', details: '' });
      setHasReported(true);

      if (typeof window !== 'undefined') {
        const reportKey = `listing-report-submitted-${listingId}`;
        localStorage.setItem(reportKey, 'true');
      }
    } catch (error) {
      console.error('Failed to submit listing report:', error);

      const responseMessage = (error as any)?.response?.data?.message;
      const normalizedMessage = Array.isArray(responseMessage)
        ? responseMessage.join(' ')
        : String(responseMessage || '');

      if (normalizedMessage.toLowerCase().includes('active report')) {
        setHasReported(true);
        setReportStatus('success');

        if (typeof window !== 'undefined') {
          const reportKey = `listing-report-submitted-${listingId}`;
          localStorage.setItem(reportKey, 'true');
        }
      } else {
        setReportStatus('error');
      }
    } finally {
      setIsReporting(false);
    }
  };

  return (
    <div className="lux-card p-6">
      <h3 className="text-2xl font-semibold text-[#1C1A17] mb-6">Contact Seller</h3>
      
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
          <p className="text-green-800 text-sm font-medium">
            Message sent successfully! The seller will contact you soon.
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-800 text-sm font-medium">
            Failed to send message. Please try again.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#5F5448] mb-1">
            <User className="inline w-4 h-4 mr-1" />
            Your Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="lux-input"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#5F5448] mb-1">
            <Mail className="inline w-4 h-4 mr-1" />
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="lux-input"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#5F5448] mb-1">
            <Phone className="inline w-4 h-4 mr-1" />
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="lux-input"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#5F5448] mb-1">
            <MessageSquare className="inline w-4 h-4 mr-1" />
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="lux-input resize-none"
            placeholder="I'm interested in this property..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full lux-button disabled:opacity-50"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        {!isAuthenticated && (
          <p className="text-xs text-[#7A6E60] text-center">
            <a href="/login" className="text-[#C9A96A] hover:text-[#B78F4A] underline">
              Sign in
            </a>{' '}
            to save your information for future inquiries
          </p>
        )}
      </form>

      <div className="mt-6 pt-6 border-t border-[#E8E1D7]">
        <h4 className="text-lg font-semibold text-[#1C1A17] mb-3">Report Listing</h4>

        {hasReported && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-blue-800 text-sm font-medium">
              You already submitted a report for this listing.
            </p>
          </div>
        )}

        {reportStatus === 'success' && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl">
            <p className="text-green-800 text-sm font-medium">Report submitted. Our team will review it.</p>
          </div>
        )}

        {reportStatus === 'error' && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-800 text-sm font-medium">
              {!isAuthenticated ? 'Please sign in to report this listing.' : 'Failed to submit report. Please try again.'}
            </p>
          </div>
        )}

        <form onSubmit={handleReportSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-[#5F5448] mb-1">Reason *</label>
            <select
              name="reason"
              value={reportData.reason}
              onChange={handleReportChange}
              required
              disabled={hasReported || isReporting}
              className="lux-input"
            >
              <option value="">Select a reason</option>
              <option value="Spam or scam">Spam or scam</option>
              <option value="Misleading details">Misleading details</option>
              <option value="Inappropriate content">Inappropriate content</option>
              <option value="Duplicate listing">Duplicate listing</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5F5448] mb-1">Details</label>
            <textarea
              name="details"
              value={reportData.details}
              onChange={handleReportChange}
              rows={3}
              disabled={hasReported || isReporting}
              className="lux-input resize-none"
              placeholder="Share additional details"
            />
          </div>

          <button
            type="submit"
            disabled={hasReported || isReporting}
            className="w-full lux-button-secondary disabled:opacity-50"
          >
            {hasReported ? 'Report Submitted' : isReporting ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </div>
  );
}
