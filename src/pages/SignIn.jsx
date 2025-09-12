import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    rememberMe: false
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('') // 'success' or 'error'
  const navigate = useNavigate()

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        navigate('/dashboard') // Redirect to dashboard if already logged in
      }
    }
    checkUser()
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) {
        setMessage(error.message)
        setMessageType('error')
      } else {
        setMessage('Successfully signed in!')
        setMessageType('success')
        // Navigate to dashboard after successful login
        setTimeout(() => navigate('/dashboard'), 1000)
      }
    } catch (error) {
      setMessage('An unexpected error occurred')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (!formData.firstName || !formData.lastName) {
      setMessage('Please fill in all required fields')
      setMessageType('error')
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            full_name: `${formData.firstName} ${formData.lastName}`
          }
        }
      })

      if (error) {
        setMessage(error.message)
        setMessageType('error')
      } else {
        setMessage('Check your email for the confirmation link!')
        setMessageType('success')
        
        // If user is created successfully, also create a profile record
        if (data.user) {
          await createUserProfile(data.user)
        }
      }
    } catch (error) {
      setMessage('An unexpected error occurred')
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  // Function to create user profile in separate table
  const createUserProfile = async (user) => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .insert([
          {
            user_id: user.id,
            email: user.email,
            first_name: formData.firstName,
            last_name: formData.lastName,
            full_name: `${formData.firstName} ${formData.lastName}`,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
      
      if (error) {
        console.error('Error creating user profile:', error)
      }
    } catch (error) {
      console.error('Error creating user profile:', error)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      })
      
      if (error) {
        setMessage('Error signing in with Google')
        setMessageType('error')
      }
    } catch (error) {
      setMessage('An unexpected error occurred')
      setMessageType('error')
    }
  }

  const handleFacebookSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      })
      
      if (error) {
        setMessage('Error signing in with Facebook')
        setMessageType('error')
      }
    } catch (error) {
      setMessage('An unexpected error occurred')
      setMessageType('error')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-8 w-full max-w-md border border-gray-700">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            {isSignUp ? 'Create Account' : 'Login'}
          </h2>
          {message && (
            <div className={`p-3 rounded mb-4 text-sm ${
              messageType === 'success' 
                ? 'bg-green-900 text-green-100 border border-green-700' 
                : 'bg-red-900 text-red-100 border border-red-700'
            }`}>
              {message}
            </div>
          )}
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleFacebookSignIn}
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Login with Facebook
          </button>
          
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition duration-200"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Login with Google
          </button>
        </div>

        <div className="text-center text-gray-400 mb-6">
          <span>or</span>
        </div>

        {/* Form */}
        <form onSubmit={isSignUp ? handleSignUp : handleSignIn} className="space-y-4">
          {isSignUp && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="John"
                  required={isSignUp}
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="Doe"
                  required={isSignUp}
                />
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              required
              minLength={6}
            />
          </div>
          
          {!isSignUp && (
            <div className="flex items-center justify-between">
              <label className="flex items-center text-gray-300">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="mr-2 rounded"
                />
                <span className="text-sm">Remember Me</span>
              </label>
              <button
                type="button"
                className="text-sm text-blue-400 hover:text-blue-300"
                onClick={() => setMessage('Password reset functionality coming soon!')}
              >
                Forgot Password?
              </button>
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded font-medium transition duration-200 ${
              loading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Log In')}
          </button>
        </form>
        
        {/* Toggle between Sign In and Sign Up */}
        <div className="text-center mt-6">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp)
              setMessage('')
              setFormData({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                rememberMe: false
              })
            }}
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            {isSignUp 
              ? 'Already have an account? Sign In' 
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignIn