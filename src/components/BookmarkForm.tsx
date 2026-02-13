'use client'

import React, { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function BookmarkForm() {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    const supabase = createClient()

    const isValidUrl = (urlString: string) => {
        try {
            new URL(urlString)
            return true
        } catch {
            return false
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage(null)

        if (!title.trim() || !url.trim()) {
            setMessage({ type: 'error', text: 'Title and URL are required.' })
            return
        }

        if (!isValidUrl(url)) {
            setMessage({ type: 'error', text: 'Please enter a valid URL (e.g., https://example.com).' })
            return
        }

        setLoading(true)

        try {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                throw new Error('You must be logged in to add bookmarks.')
            }

            const { error } = await supabase
                .from('bookmarks')
                .insert([
                    {
                        title: title.trim(),
                        url: url.trim(),
                        user_id: user.id
                    }
                ])

            if (error) throw error

            setTitle('')
            setUrl('')
            setMessage({ type: 'success', text: 'Bookmark added successfully!' })

            // Clear success message after 3 seconds
            setTimeout(() => setMessage(null), 3000)
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || 'Failed to add bookmark.' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add New Bookmark</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="e.g., Google"
                    />
                </div>
                <div>
                    <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
                    <input
                        type="url"
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="https://example.com"
                    />
                </div>

                {message && (
                    <div className={`p-3 rounded-md text-sm ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {message.text}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}
            transition-colors duration-200`}
                >
                    {loading ? 'Adding...' : 'Add Bookmark'}
                </button>
            </form>
        </div>
    )
}
