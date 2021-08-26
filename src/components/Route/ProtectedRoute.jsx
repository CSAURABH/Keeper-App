import React , { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export const ProtectedRoute = ({ Component }) => {

    const history = useHistory()

    useEffect(() => {
        (!localStorage.getItem('refresh')) && history.push('/register')

    } , [])

    return (
        <div>
            <Component />
        </div>
    )
}
