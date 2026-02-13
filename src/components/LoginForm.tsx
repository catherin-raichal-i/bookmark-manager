'use client'

import React from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LoginForm() {
    const supabase = createClient()

    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        })
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900">
                    Welcome to BookmarkManager
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Save and organize your favorite links seamlessly.
                </p>
            </div>

            <button
                onClick={handleLogin}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-md hover:shadow-lg max-w-sm"
            >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg
                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>
                Continue with Google
            </button>

            <p className="mt-2 text-xs text-center text-gray-500">
                Secure authentication powered by Supabase.
            </p>
        </div>
    )
}
