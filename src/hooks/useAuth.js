"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useAuth() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isTutor, setIsTutor] = useState(true);

  const login = useCallback((uid, role) => {
    setUserId(uid);
    setIsLoggedIn(true);
    if(role === "tutor"){
        setIsTutor(true)
    }
    router.push(`/${uid}/dashboard`);
  }, [router]);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  return { userId,isLoggedIn, login, logout, isTutor };
}
