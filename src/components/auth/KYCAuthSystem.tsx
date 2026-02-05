/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, demoLogin } from '@/hooks/useAuth';
import {
  Eye,
  EyeOff,
  Car,
  Upload,
  Check,
  ArrowLeft,
  Shield,
  Camera,
  FileText,
  Phone,
  Mail,
  Lock,
  AlertTriangle,
  Clock,
  Globe,
  MapPin,
  CreditCard,
  Fingerprint,
  CheckCircle,
  RefreshCw,
  User,
  ShieldCheck,
  Crown
} from 'lucide-react';

interface KYCAuthSystemProps {
  initialView?: 'login' | 'register' | 'forgot' | 'kyc';
}

const KYCAuthSystem = ({ initialView = 'login' }: KYCAuthSystemProps) => {
  const [currentView, setCurrentView] = useState(initialView);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [kycStep, setKycStep] = useState(1);
  type UploadedFile = {
    name: string;
    uploaded: boolean;
    verified: boolean;
  };

  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFile | undefined>>({});
  // We only use the setter for prototype verification flow; ignore the state variable to avoid unused-var lint
  const [, setVerificationCodes] = useState<Record<string, string | undefined>>({});
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const [isAutoLogin, setIsAutoLogin] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const [securityScore, setSecurityScore] = useState(0);
  const [forgotForm, setForgotForm] = useState({ email: '' });
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false,
    twoFactorCode: ''
  });
  
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    agreeMarketing: false,
    country: '',
    referralCode: ''
  });
  
  const [kycForm, setKycForm] = useState({
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    nationality: '',
    occupation: '',
    sourceOfFunds: '',
    expectedTurnover: '',
    politicallyExposed: false,
    nationalIdNumber: '',
    nationalIdType: 'national-id',
    secondaryIdNumber: '',
    secondaryIdType: '',
    taxIdNumber: '',
    motherMaidenName: '',
    placeOfBirth: ''
  });

  const [verificationStatus, setVerificationStatus] = useState({
    email: 'pending',
    phone: 'pending',
    identity: 'pending',
    address: 'pending',
    biometric: 'pending'
  });

  // Auto-fill for prototype
  const autoFillData = () => {
    setIsAutoFilling(true);
    
    setTimeout(() => {
      setRegisterForm({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        password: 'SecurePass123!',
        confirmPassword: 'SecurePass123!',
        agreeTerms: true,
        agreeMarketing: false,
        country: 'US',
        referralCode: ''
      });

      setKycForm({
        dateOfBirth: '1990-05-15',
        address: '123 Main Street, Apt 4B',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'US',
        nationality: 'American',
        occupation: 'Software Engineer',
        sourceOfFunds: 'Employment',
        expectedTurnover: '50000-100000',
        politicallyExposed: false,
        nationalIdNumber: 'SSN-123-45-6789',
        nationalIdType: 'national-id',
        secondaryIdNumber: 'DL-NY-12345678',
        secondaryIdType: 'drivers-license',
        taxIdNumber: '123-45-6789',
        motherMaidenName: 'Smith',
        placeOfBirth: 'Boston, MA'
      });

      setUploadedFiles({
        national_id_front: { name: 'national_id_front.jpg', uploaded: true, verified: true },
        national_id_back: { name: 'national_id_back.jpg', uploaded: true, verified: true },
        secondary_id_front: { name: 'drivers_license_front.jpg', uploaded: true, verified: true },
        proof_of_address: { name: 'utility_bill.pdf', uploaded: true, verified: true },
        selfie_with_id: { name: 'selfie_verification.jpg', uploaded: true, verified: true },
        biometric_scan: { name: 'biometric_data.dat', uploaded: true, verified: true }
      });

      setIsAutoFilling(false);
      setSecurityScore(95);
    }, 1000);
  };

  // Note: demo login buttons call handleDemoLogin directly; autoFillLogin removed to avoid unused symbol

  const handleDemoFill = (role: 'moderator' | 'admin') => {
    // Just auto-fill the form fields with demo credentials
    const credentials = demoLogin[role];
    setLoginForm({
      email: credentials.email,
      password: credentials.password,
      rememberMe: true,
      twoFactorCode: ''
    });
  };

  const handleLogin = async () => {
    setIsAutoLogin(true);
    const success = await login({ email: loginForm.email, password: loginForm.password, rememberMe: loginForm.rememberMe });

    // If login succeeded, redirect based on email/role
    if (success) {
      try {
        // Determine role from email
        let redirectPath = '/main';
        if (loginForm.email === 'admin@autobid.com') {
          redirectPath = '/admin/dashboard';
        } else if (loginForm.email === 'moderator@autobid.com') {
          redirectPath = '/moderator/dashboard';
        }

        router.push(redirectPath);
      } catch {
        if (typeof window !== 'undefined') {
          // Fallback redirect based on email
          let redirectPath = '/main';
          if (loginForm.email === 'admin@autobid.com') {
            redirectPath = '/admin/dashboard';
          } else if (loginForm.email === 'moderator@autobid.com') {
            redirectPath = '/moderator/dashboard';
          }

          window.location.href = redirectPath;
        }
      }
    }

    setIsAutoLogin(false);
  };

  const handleFileUpload = (fileType: string) => {
    setUploadedFiles(prev => ({
      ...prev,
      [fileType]: { name: `${fileType}.jpg`, uploaded: true, verified: Math.random() > 0.2 }
    }));
  };

  const sendVerificationCode = (type: string) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCodes(prev => ({ ...prev, [type]: code }));
    setVerificationStatus(prev => ({ ...prev, [type]: 'sent' }));
    
    setTimeout(() => {
      setVerificationStatus(prev => ({ ...prev, [type]: 'verified' }));
    }, 3000);
  };

  const calculateSecurityScore = () => {
    let score = 0;
    const checks = [
      registerForm.password.length >= 8,
      /[A-Z]/.test(registerForm.password),
      /[a-z]/.test(registerForm.password),
      /[0-9]/.test(registerForm.password),
      /[^A-Za-z0-9]/.test(registerForm.password),
      registerForm.email.includes('@'),
      registerForm.phone.length > 10,
      Object.keys(uploadedFiles).length >= 3
    ];
    
    score = (checks.filter(Boolean).length / checks.length) * 100;
    setSecurityScore(Math.round(score));
  };

  useEffect(() => {
    const routes = {
      login: '/login',
      register: '/register', 
      forgot: '/forgot-password',
      kyc: '/register' // KYC is part of registration flow
    };
    
    if (routes[currentView] && routes[currentView] !== window.location.pathname) {
      router.push(routes[currentView]);
    }
  }, [currentView]);

  useEffect(() => {
    calculateSecurityScore();
  }, [calculateSecurityScore, registerForm, uploadedFiles]);

  const handleNavigation = (view: NonNullable<KYCAuthSystemProps['initialView']>) => {
    setCurrentView(view);
    
    // Optional: Update URL without page reload
    const routes: Record<string, string> = {
      login: '/login',
      register: '/register',
      forgot: '/forgot-password',
      kyc: '/register'
    };
    
    if (routes[view]) {
      window.history.pushState(null, '', routes[view]);
    }
  };

  const renderSecurityIndicator = () => (
    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs sm:text-sm font-medium text-gray-700">Security Score</span>
        <span className={`text-xs sm:text-sm font-bold ${securityScore >= 80 ? 'text-green-600' : securityScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
          {securityScore}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
        <div 
          className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${securityScore >= 80 ? 'bg-green-500' : securityScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
          style={{ width: `${securityScore}%` }}
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center mt-2 sm:space-x-4 space-y-1 sm:space-y-0 text-xs text-gray-500">
        <div className="flex items-center">
          <Shield className="h-3 w-3 mr-1 flex-shrink-0" />
          <span>Bank-grade encryption</span>
        </div>
        <div className="flex items-center">
          <Lock className="h-3 w-3 mr-1 flex-shrink-0" />
          <span>2FA enabled</span>
        </div>
      </div>
    </div>
  );

  const renderLogin = () => (
    <div className="w-full max-w-sm sm:max-w-md mx-auto mt-6 bg-white rounded-xl shadow-2xl p-6 sm:p-8">
      <div className="text-center mb-6 sm:mb-8">
        <div className="flex items-center justify-center mb-3 sm:mb-4">
          <Car className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mr-2" />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">AutoBid</h1>
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700">Secure Login</h2>
        <p className="text-sm text-gray-500 mt-1">Access your verified account</p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Mail className="h-4 w-4 inline mr-1" />
            Email Address
          </label>
          <input
            type="email"
            value={loginForm.email}
            onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            placeholder="Enter your verified email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Lock className="h-4 w-4 inline mr-1" />
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={loginForm.password}
              onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors pr-10 sm:pr-12"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 sm:top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" /> : <Eye className="h-4 w-4 sm:h-5 sm:w-5" />}
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={loginForm.rememberMe}
              onChange={(e) => setLoginForm({...loginForm, rememberMe: e.target.checked})}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <button
            type="button"
            onClick={() => handleNavigation('forgot')}
            className="text-sm text-green-600 hover:text-green-500 text-left sm:text-right"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="button"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm sm:text-base"
          onClick={() => handleLogin()}
        >
          Sign In Securely
        </button>

        {/* Demo account auto-fill buttons for prototype */}
        <div className="mt-6 border-t border-gray-200 pt-6">
          <p className="text-xs text-gray-500 text-center mb-3">Auto-fill Demo Credentials</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoFill('moderator')}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2.5 rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-medium text-sm flex items-center justify-center shadow-sm"
            >
              <ShieldCheck className="h-4 w-4 mr-2" />
              Moderator
            </button>

            <button
              type="button"
              onClick={() => handleDemoFill('admin')}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-2.5 rounded-lg hover:from-red-700 hover:to-red-800 transition-all font-medium text-sm flex items-center justify-center shadow-sm"
            >
              <Crown className="h-4 w-4 mr-2" />
              Admin
            </button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-3">
            Click to auto-fill login credentials, then click &quot;Sign In&quot;
          </p>
        </div>
      </div>

    </div>
  );

  const renderRegister = () => (
    <div className="w-full max-w-sm sm:max-w-md mx-auto mt-6 bg-white rounded-xl shadow-2xl p-6 sm:p-8">
      <div className="text-center mb-6 sm:mb-8">
        <div className="flex items-center justify-center mb-3 sm:mb-4">
          <Car className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mr-2" />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">AutoBid</h1>
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700">Create Account</h2>
        <p className="text-sm text-gray-500 mt-1">Join our secure auction community</p>
      </div>

      {renderSecurityIndicator()}

      {/* Auto-fill button for prototype */}
      <button
        onClick={autoFillData}
        disabled={isAutoFilling}
        className="w-full mb-4 sm:mb-6 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm flex items-center justify-center"
      >
        {isAutoFilling ? (
          <>
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            Auto-filling...
          </>
        ) : (
          <>
            <FileText className="h-4 w-4 mr-2" />
            Auto-fill for Demo
          </>
        )}
      </button>

      <div className="space-y-3 sm:space-y-4">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              value={registerForm.firstName}
              onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="John"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={registerForm.lastName}
              onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Mail className="h-4 w-4 inline mr-1" />
            Email Address
          </label>
          <input
            type="email"
            value={registerForm.email}
            onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
            className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Phone className="h-4 w-4 inline mr-1" />
            Phone Number
          </label>
          <input
            type="tel"
            value={registerForm.phone}
            onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
            className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={registerForm.password}
              onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors pr-10"
              placeholder="Create strong password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            Must include: 8+ chars, uppercase, lowercase, number, symbol
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={registerForm.confirmPassword}
              onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors pr-10"
              placeholder="Confirm password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={registerForm.agreeTerms}
              onChange={(e) => setRegisterForm({...registerForm, agreeTerms: e.target.checked})}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-0.5 flex-shrink-0"
            />
            <span className="ml-2 text-xs sm:text-sm text-gray-600">
              I agree to the <a href="#" className="text-green-600 hover:text-green-500">Terms of Service</a>, <a href="#" className="text-green-600 hover:text-green-500">Privacy Policy</a> and <a href="#" className="text-green-600 hover:text-green-500">KYC Requirements</a>
            </span>
          </label>
          <label className="flex items-start">
            <input
              type="checkbox"
              checked={registerForm.agreeMarketing}
              onChange={(e) => setRegisterForm({...registerForm, agreeMarketing: e.target.checked})}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-0.5 flex-shrink-0"
            />
            <span className="ml-2 text-xs sm:text-sm text-gray-600">
              I&apos;d like to receive marketing emails about new auctions
            </span>
          </label>
        </div>

        <button
          type="button"
          onClick={() => handleNavigation('kyc')}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm sm:text-base"
        >
          Continue to Verification
        </button>
      </div>

      {/* <div className="mt-4 sm:mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <button
            onClick={() => handleNavigation('login')}
            className="text-green-600 hover:text-green-500 font-medium"
          >
            Sign in
          </button>
        </p>
      </div> */}
    </div>
  );

  const renderKYC = () => (
    <div className="w-full max-w-sm sm:max-w-2xl mx-auto bg-white rounded-xl shadow-2xl p-6 sm:p-8">
      <div className="text-center mb-6 sm:mb-8">
        <div className="flex items-center justify-center mb-3 sm:mb-4">
          <Car className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mr-2" />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">AutoBid</h1>
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700">Identity Verification</h2>
        <p className="text-sm text-gray-500 mt-1">Complete KYC to secure your account</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center justify-center space-x-2 sm:space-x-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                kycStep >= step ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {kycStep > step ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : step}
              </div>
              {step < 4 && (
                <div className={`w-8 sm:w-16 h-1 ${kycStep > step ? 'bg-green-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-1 mt-2 text-xs text-gray-500 text-center">
          <span>Personal</span>
          <span>Documents</span>
          <span>Verification</span>
          <span>Complete</span>
        </div>
      </div>

      {kycStep === 1 && (
        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                value={kycForm.dateOfBirth}
                onChange={(e) => setKycForm({...kycForm, dateOfBirth: e.target.value})}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nationality
              </label>
              <select
                value={kycForm.nationality}
                onChange={(e) => setKycForm({...kycForm, nationality: e.target.value})}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              >
                <option value="">Select Nationality</option>
                <option value="American">American</option>
                <option value="Canadian">Canadian</option>
                <option value="British">British</option>
                <option value="German">German</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <MapPin className="h-4 w-4 inline mr-1" />
              Street Address
            </label>
            <input
              type="text"
              value={kycForm.address}
              onChange={(e) => setKycForm({...kycForm, address: e.target.value})}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="123 Main Street, Apt 4B"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                value={kycForm.city}
                onChange={(e) => setKycForm({...kycForm, city: e.target.value})}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="City"
              />
            </div>
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <select
                value={kycForm.state}
                onChange={(e) => setKycForm({...kycForm, state: e.target.value})}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              >
                <option value="">State</option>
                <option value="CA">California</option>
                <option value="NY">New York</option>
                <option value="TX">Texas</option>
                <option value="FL">Florida</option>
              </select>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code
              </label>
              <input
                type="text"
                value={kycForm.zipCode}
                onChange={(e) => setKycForm({...kycForm, zipCode: e.target.value})}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="12345"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Occupation
              </label>
              <input
                type="text"
                value={kycForm.occupation}
                onChange={(e) => setKycForm({...kycForm, occupation: e.target.value})}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="Software Engineer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Source of Funds
              </label>
              <select
                value={kycForm.sourceOfFunds}
                onChange={(e) => setKycForm({...kycForm, sourceOfFunds: e.target.value})}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              >
                <option value="">Select Source</option>
                <option value="Employment">Employment</option>
                <option value="Business">Business</option>
                <option value="Investment">Investment</option>
                <option value="Inheritance">Inheritance</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expected Annual Turnover
              </label>
              <select
                value={kycForm.expectedTurnover}
                onChange={(e) => setKycForm({...kycForm, expectedTurnover: e.target.value})}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              >
                <option value="">Select Range</option>
                <option value="0-25000">$0 - $25,000</option>
                <option value="25000-50000">$25,000 - $50,000</option>
                <option value="50000-100000">$50,000 - $100,000</option>
                <option value="100000-250000">$100,000 - $250,000</option>
                <option value="250000+">$250,000+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Place of Birth
              </label>
              <input
                type="text"
                value={kycForm.placeOfBirth}
                onChange={(e) => setKycForm({...kycForm, placeOfBirth: e.target.value})}
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                placeholder="Boston, MA"
              />
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800">PEP Declaration</h4>
                <label className="flex items-start mt-2">
                  <input
                    type="checkbox"
                    checked={kycForm.politicallyExposed}
                    onChange={(e) => setKycForm({...kycForm, politicallyExposed: e.target.checked})}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-0.5 flex-shrink-0"
                  />
                  <span className="ml-2 text-sm text-yellow-700">
                    I am a Politically Exposed Person (PEP) or related to one
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between pt-6 space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              onClick={() => handleNavigation('register')}
              className="px-4 sm:px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setKycStep(2)}
              className="px-4 sm:px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm sm:text-base"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {kycStep === 2 && (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-green-800">Document Requirements</h4>
                <p className="text-sm text-green-700 mt-1">
                  Upload clear, high-resolution photos. All documents must be valid and non-expired.
                </p>
              </div>
            </div>
          </div>

          {/* National ID Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-green-600" />
              National ID (Required)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID Type
                </label>
                <select
                  value={kycForm.nationalIdType}
                  onChange={(e) => setKycForm({...kycForm, nationalIdType: e.target.value})}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                >
                  <option value="national-id">National ID</option>
                  <option value="ssn">Social Security Card</option>
                  <option value="passport">Passport</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID Number
                </label>
                <input
                  type="text"
                  value={kycForm.nationalIdNumber}
                  onChange={(e) => setKycForm({...kycForm, nationalIdNumber: e.target.value})}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Enter ID number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { key: 'national_id_front', label: 'National ID (Front)', required: true },
                { key: 'national_id_back', label: 'National ID (Back)', required: true }
              ].map((doc) => (
                <div key={doc.key} className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-green-400 transition-colors">
                  {uploadedFiles[doc.key] ? (
                    <div className={`${uploadedFiles[doc.key]?.verified ? 'text-green-600' : 'text-yellow-600'}`}>
                      {uploadedFiles[doc.key]?.verified ? (
                        <CheckCircle className="h-8 sm:h-12 w-8 sm:w-12 mx-auto mb-2" />
                      ) : (
                        <Clock className="h-8 sm:h-12 w-8 sm:w-12 mx-auto mb-2" />
                      )}
                      <p className="font-medium text-sm">{uploadedFiles[doc.key]?.name}</p>
                      <p className="text-xs text-gray-500">
                        {uploadedFiles[doc.key]?.verified ? 'Verified' : 'Processing...'}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <Upload className="h-8 sm:h-12 w-8 sm:w-12 mx-auto mb-2 text-gray-400" />
                      <p className="font-medium text-gray-700 text-sm">{doc.label}</p>
                      {doc.required && <p className="text-xs text-red-500">Required</p>}
                      <button
                        type="button"
                        onClick={() => handleFileUpload(doc.key)}
                        className="mt-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        Upload
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Secondary ID Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-green-600" />
              Secondary ID (Required)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Secondary ID Type
                </label>
                <select
                  value={kycForm.secondaryIdType}
                  onChange={(e) => setKycForm({...kycForm, secondaryIdType: e.target.value})}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                >
                  <option value="">Select Secondary ID</option>
                  <option value="drivers-license">Driver&apos;s License</option>
                  <option value="passport">Passport</option>
                  <option value="military-id">Military ID</option>
                  <option value="state-id">State ID</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Secondary ID Number
                </label>
                <input
                  type="text"
                  value={kycForm.secondaryIdNumber}
                  onChange={(e) => setKycForm({...kycForm, secondaryIdNumber: e.target.value})}
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  placeholder="Enter secondary ID number"
                />
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-green-400 transition-colors mb-6">
              {uploadedFiles['secondary_id_front'] ? (
                <div className={`${uploadedFiles['secondary_id_front']?.verified ? 'text-green-600' : 'text-yellow-600'}`}>
                  {uploadedFiles['secondary_id_front']?.verified ? (
                    <CheckCircle className="h-8 sm:h-12 w-8 sm:w-12 mx-auto mb-2" />
                  ) : (
                    <Clock className="h-8 sm:h-12 w-8 sm:w-12 mx-auto mb-2" />
                  )}
                  <p className="font-medium text-sm">{uploadedFiles['secondary_id_front']?.name}</p>
                  <p className="text-xs text-gray-500">
                    {uploadedFiles['secondary_id_front']?.verified ? 'Verified' : 'Processing...'}
                  </p>
                </div>
              ) : (
                <div>
                  <Upload className="h-8 sm:h-12 w-8 sm:w-12 mx-auto mb-2 text-gray-400" />
                  <p className="font-medium text-gray-700 text-sm">Secondary ID (Front)</p>
                  <p className="text-xs text-red-500">Required</p>
                  <button
                    type="button"
                    onClick={() => handleFileUpload('secondary_id_front')}
                    className="mt-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    Upload
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Additional Documents */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-green-600" />
              Additional Verification
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { key: 'proof_of_address', label: 'Proof of Address', desc: 'Utility bill, bank statement (within 3 months)', required: true },
                { key: 'selfie_with_id', label: 'Selfie with ID', desc: 'Clear photo holding your ID next to your face', required: true }
              ].map((doc) => (
                <div key={doc.key} className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-400 transition-colors">
                  {uploadedFiles[doc.key] ? (
                        <div className={`${uploadedFiles[doc.key]?.verified ? 'text-green-600' : 'text-yellow-600'}`}>
                          {uploadedFiles[doc.key]?.verified ? (
                            <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                          ) : (
                            <Clock className="h-8 w-8 mx-auto mb-2" />
                          )}
                          <p className="font-medium text-sm">{uploadedFiles[doc.key]?.name}</p>
                          <p className="text-xs text-gray-500">
                            {uploadedFiles[doc.key]?.verified ? 'Verified' : 'Processing...'}
                          </p>
                        </div>
                      ) : (
                        <div>
                          {doc.key === 'selfie_with_id' ? (
                            <Camera className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                          ) : (
                            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                          )}
                          <p className="font-medium text-gray-700 text-sm">{doc.label}</p>
                          <p className="text-xs text-gray-500 mb-2">{doc.desc}</p>
                          {doc.required && <p className="text-xs text-red-500 mb-2">Required</p>}
                          <button
                            type="button"
                            onClick={() => handleFileUpload(doc.key)}
                            className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                          >
                            {doc.key === 'selfie_with_id' ? 'Take Photo' : 'Upload'}
                          </button>
                        </div>
                      )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between pt-6 space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              onClick={() => setKycStep(1)}
              className="px-4 sm:px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setKycStep(3)}
              className="px-4 sm:px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm sm:text-base"
            >
              Continue to Verification
            </button>
          </div>
        </div>
      )}

      {kycStep === 3 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-Factor Verification</h3>
            <p className="text-sm text-gray-600">Complete all verification steps to secure your account</p>
          </div>

          {/* Email Verification */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-green-600 mr-2" />
                <span className="font-medium text-gray-900">Email Verification</span>
              </div>
              {verificationStatus.email === 'verified' ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <Clock className="h-5 w-5 text-yellow-600" />
              )}
            </div>
            <p className="text-sm text-gray-600 mb-3">{registerForm.email}</p>
            {verificationStatus.email === 'pending' ? (
              <button
                onClick={() => sendVerificationCode('email')}
                className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                Send Verification Code
              </button>
            ) : verificationStatus.email === 'sent' ? (
              <div>
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 mb-2"
                  maxLength={6}
                />
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                    Verify Code
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    Resend Code
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center text-green-600 text-sm">
                <Check className="h-4 w-4 mr-1" />
                Email verified successfully
              </div>
            )}
          </div>

          {/* Phone Verification */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-green-600 mr-2" />
                <span className="font-medium text-gray-900">Phone Verification</span>
              </div>
              {verificationStatus.phone === 'verified' ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <Clock className="h-5 w-5 text-yellow-600" />
              )}
            </div>
            <p className="text-sm text-gray-600 mb-3">{registerForm.phone}</p>
            {verificationStatus.phone === 'pending' ? (
              <button
                onClick={() => sendVerificationCode('phone')}
                className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                Send SMS Code
              </button>
            ) : verificationStatus.phone === 'sent' ? (
              <div>
                <input
                  type="text"
                  placeholder="Enter 6-digit SMS code"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 mb-2"
                  maxLength={6}
                />
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                    Verify SMS
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    Resend SMS
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center text-green-600 text-sm">
                <Check className="h-4 w-4 mr-1" />
                Phone verified successfully
              </div>
            )}
          </div>

          {/* Biometric Verification */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Fingerprint className="h-5 w-5 text-green-600 mr-2" />
                <span className="font-medium text-gray-900">Biometric Verification</span>
              </div>
              {uploadedFiles['biometric_scan'] ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <Clock className="h-5 w-5 text-yellow-600" />
              )}
            </div>
            <p className="text-sm text-gray-600 mb-3">Facial recognition scan for enhanced security</p>
            {!uploadedFiles['biometric_scan'] ? (
              <button
                onClick={() => handleFileUpload('biometric_scan')}
                className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center justify-center sm:justify-start"
              >
                <Camera className="h-4 w-4 mr-2" />
                Start Biometric Scan
              </button>
            ) : (
              <div className="flex items-center text-green-600 text-sm">
                <Check className="h-4 w-4 mr-1" />
                Biometric scan completed
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-between pt-6 space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              onClick={() => setKycStep(2)}
              className="px-4 sm:px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setKycStep(4)}
              className="px-4 sm:px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm sm:text-base"
            >
              Complete Verification
            </button>
          </div>
        </div>
      )}

      {kycStep === 4 && (
        <div className="space-y-6 text-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              KYC Verification Complete!
            </h3>
            <p className="text-green-700">
              Your account has been successfully verified with our industry-standard security measures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <Shield className="h-8 w-8 text-green-600 mb-2" />
              <h4 className="font-medium text-gray-900 text-sm">Identity Verified</h4>
              <p className="text-xs text-gray-600">Multiple ID verification completed</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <Lock className="h-8 w-8 text-green-600 mb-2" />
              <h4 className="font-medium text-gray-900 text-sm">Multi-Factor Auth</h4>
              <p className="text-xs text-gray-600">Email, phone & biometric verified</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:col-span-2 lg:col-span-1">
              <Fingerprint className="h-8 w-8 text-green-600 mb-2" />
              <h4 className="font-medium text-gray-900 text-sm">AML Compliant</h4>
              <p className="text-xs text-gray-600">Anti-money laundering verified</p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
            <h4 className="font-medium text-blue-900 mb-3 text-center">What&apos;s Next?</h4>
            <div className="space-y-2 text-sm text-green-800">
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                <span>Access to all auction features</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                <span>Increased bidding limits</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                <span>Premium seller benefits</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                <span>24/7 priority support</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleNavigation('login')}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm sm:text-base"
          >
            Continue to login
          </button>
        </div>
      )}
    </div>
  );

  const renderForgotPassword = () => (
    <div className="w-full max-w-sm sm:max-w-md mx-auto bg-white rounded-xl shadow-2xl p-6 sm:p-8">
      <div className="text-center mb-6 sm:mb-8">
        <div className="flex items-center justify-center mb-3 sm:mb-4">
          <Car className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 mr-2" />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">AutoBid</h1>
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700">Reset Password</h2>
        <p className="text-sm text-gray-500 mt-1">Enter your email to reset your password</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={forgotForm.email}
            onChange={(e) => setForgotForm({...forgotForm, email: e.target.value})}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            placeholder="Enter your email"
          />
        </div>

        <button
          type="button"
          onClick={() => alert('Reset link would be sent to email')}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm sm:text-base"
        >
          Send Reset Link
        </button>
      </div>

      <div className="mt-4 sm:mt-6 text-center">
        <button
          onClick={() => handleNavigation('login')}
          className="text-green-600 hover:text-green-500 font-medium flex items-center justify-center mx-auto"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Login
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-gray-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="flex items-center justify-center min-h-screen">
        {currentView === 'login' && renderLogin()}
        {currentView === 'register' && renderRegister()}
        {currentView === 'forgot' && renderForgotPassword()}
        {currentView === 'kyc' && renderKYC()}
      </div>
    </div>
  );
};

export default KYCAuthSystem;
                