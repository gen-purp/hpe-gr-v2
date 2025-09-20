import { useNavigate } from 'react-router-dom'
import { Shield } from 'lucide-react'

export function AdminLoginButton() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/admin/login')
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl z-50 flex items-center space-x-2 opacity-90 hover:opacity-100"
    >
      <Shield className="w-5 h-5" />
      <span className="font-medium">Admin Login</span>
    </button>
  )
}
