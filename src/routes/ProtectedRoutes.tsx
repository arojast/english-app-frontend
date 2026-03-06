import { Navigate } from 'react-router-dom'

interface Props {
    children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
    const isAuth = localStorage.getItem('isAuth')

    if (!isAuth || isAuth !== 'true') {
        return <Navigate to="/" replace />
    }

    return <>{children}</>
}
