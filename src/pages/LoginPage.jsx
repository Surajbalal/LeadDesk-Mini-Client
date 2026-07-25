import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Shield, Lock, Mail, Loader2, ArrowLeft } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';
import { ROUTES } from '../lib/constants';

export default function LoginPage() {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = location.state?.from?.pathname || ROUTES.ADMIN_DASHBOARD;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await login(data);
      toast.success(res.message || 'Login successful!');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || 'Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillSeedCredentials = () => {
    setValue('email', 'admin@leaddesk.com');
    setValue('password', 'Admin@123');
    toast.success('Seed credentials filled into form');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500 selection:text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-6">
        <Link
          to={ROUTES.HOME}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 items-center justify-center text-indigo-400 shadow-xl">
            <Shield className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Admin Authentication</h2>
          <p className="text-sm text-slate-400">Sign in to manage lead pipeline & status flow</p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="admin-email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Admin Email <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  id="admin-email"
                  type="email"
                  placeholder="admin@leaddesk.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address',
                    },
                  })}
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-950 border ${
                    errors.email ? 'border-rose-500' : 'border-slate-800 focus:ring-indigo-500 focus:border-indigo-500'
                  } rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all`}
                />
              </div>
              {errors.email && <p className="mt-1.5 text-xs text-rose-400 font-medium">{errors.email.message}</p>}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="admin-password" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  id="admin-password"
                  type="password"
                  placeholder="••••••••"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-950 border ${
                    errors.password ? 'border-rose-500' : 'border-slate-800 focus:ring-indigo-500 focus:border-indigo-500'
                  } rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all`}
                />
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-rose-400 font-medium">{errors.password.message}</p>}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign In to Admin Portal</span>
              )}
            </button>
          </form>

          {/* Helper Seed Hint */}
          <div className="pt-4 border-t border-slate-800 text-center space-y-2">
            <p className="text-xs text-slate-500">Default Seed Credentials:</p>
            <p className="text-xs text-slate-400 font-mono bg-slate-950 py-1.5 px-3 rounded-lg border border-slate-800">
              admin@leaddesk.com / Admin@123
            </p>
            <button
              type="button"
              onClick={handleFillSeedCredentials}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 underline underline-offset-4 transition-colors cursor-pointer"
            >
              Auto-fill Seed Credentials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
