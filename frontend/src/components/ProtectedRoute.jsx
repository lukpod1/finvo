import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AUTH_USER_TOKEN_KEY } from '../utils/constants';

import { validateToken } from "../utils/Helpers";

function ProtectedRoute() {
  const auth = validateToken(localStorage.getItem(AUTH_USER_TOKEN_KEY));

  return (
    auth ? (
      <Outlet />
    ) : (
      <Navigate to="/signin" replace />
    )
  )
}

export default ProtectedRoute