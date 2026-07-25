import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Send, Loader2, User, Mail, DollarSign, MessageSquare } from 'lucide-react';
import { BUDGET_OPTIONS } from '../lib/constants';
import api from '../lib/axios';

export default function LeadForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      budget: '',
      message: '',
    },
  });

  const messageValue = watch('message') || '';

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await api.post('/leads/createLead', data);
      toast.success(response.data.message || 'Lead submitted successfully! We will get back to you soon.');
      reset();
    } catch (error) {
      toast.error(error.message || 'Failed to submit lead. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6"
    >
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-white tracking-tight">Request a Proposal</h3>
        <p className="text-slate-400 text-sm">
          Fill out the form below and our team will get back to you within 24 hours.
        </p>
      </div>

      <div className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              {...register('name', {
                required: 'Full name is required',
                minLength: { value: 1, message: 'Full name is required' },
              })}
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-950 border ${
                errors.name ? 'border-rose-500/80 focus:ring-rose-500' : 'border-slate-800 focus:ring-indigo-500 focus:border-indigo-500'
              } rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all`}
            />
          </div>
          {errors.name && <p className="mt-1.5 text-xs text-rose-400 font-medium">{errors.name.message}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Work Email <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              id="email"
              type="email"
              placeholder="john@company.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address',
                },
              })}
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-950 border ${
                errors.email ? 'border-rose-500/80 focus:ring-rose-500' : 'border-slate-800 focus:ring-indigo-500 focus:border-indigo-500'
              } rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all`}
            />
          </div>
          {errors.email && <p className="mt-1.5 text-xs text-rose-400 font-medium">{errors.email.message}</p>}
        </div>

        {/* Budget Range Field */}
        <div>
          <label htmlFor="budget" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Estimated Budget <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
            <select
              id="budget"
              {...register('budget', {
                required: 'Please select a budget range',
                validate: (value) => BUDGET_OPTIONS.includes(value) || 'Please select a valid budget option',
              })}
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-950 border ${
                errors.budget ? 'border-rose-500/80 focus:ring-rose-500' : 'border-slate-800 focus:ring-indigo-500 focus:border-indigo-500'
              } rounded-xl text-slate-100 text-sm focus:outline-none focus:ring-2 transition-all appearance-none`}
            >
              <option value="" disabled>Select your budget range...</option>
              {BUDGET_OPTIONS.map((option) => (
                <option key={option} value={option} className="bg-slate-900 text-slate-100">
                  {option}
                </option>
              ))}
            </select>
          </div>
          {errors.budget && <p className="mt-1.5 text-xs text-rose-400 font-medium">{errors.budget.message}</p>}
        </div>

        {/* Message Field */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="message" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Project Description <span className="text-rose-500">*</span>
            </label>
            <span className="text-[11px] text-slate-500">
              {messageValue.length}/10 chars min
            </span>
          </div>
          <div className="relative">
            <MessageSquare className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
            <textarea
              id="message"
              rows={4}
              placeholder="Tell us about your project requirements, goals, and timeline..."
              {...register('message', {
                required: 'Message is required',
                minLength: { value: 10, message: 'Message must be at least 10 characters long' },
              })}
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-950 border ${
                errors.message ? 'border-rose-500/80 focus:ring-rose-500' : 'border-slate-800 focus:ring-indigo-500 focus:border-indigo-500'
              } rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all resize-none`}
            />
          </div>
          {errors.message && <p className="mt-1.5 text-xs text-rose-400 font-medium">{errors.message.message}</p>}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-5 bg-linear-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold rounded-xl text-sm shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-white" />
            <span>Submitting Lead...</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            <span>Submit Lead</span>
          </>
        )}
      </button>
    </form>
  );
}
