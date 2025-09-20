import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = () => {
      const adminLoggedIn = sessionStorage.getItem('adminLoggedIn')
      setIsAuthenticated(adminLoggedIn === 'true')
      
      if (adminLoggedIn !== 'true') {
        navigate('/admin/login')
      }
    }

    checkAuth()
  }, [navigate])

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
