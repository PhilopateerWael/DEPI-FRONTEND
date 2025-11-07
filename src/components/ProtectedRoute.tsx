import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../store/store'

const ProtectedRoute = ({ children, adminOnly }: { children: ReactNode, adminOnly?: boolean }) => {
    const authSlice = useSelector((state: RootState) => state.auth)
    const isAuth = authSlice.user !== null

    if (!isAuth) {
        return <Navigate to={"/register"} />
    } else if (isAuth && adminOnly) {
        return authSlice.user?.isAdminstartor ? children : <Navigate to={"/"} />
    } else {
        return children
    }
}

export default ProtectedRoute