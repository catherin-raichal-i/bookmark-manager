'use client'

import React from 'react'
import { createClient } from '@/lib/supabase/client'

interface BookmarkProps {
    id: string
    title: string
    url: string
    created_at: string
    onDelete?: (id: string) => void
}

export default function BookmarkCard({ id, title, url, created_at, onDelete }: BookmarkProps) {
    const supabase = createClient()
    const [isDeleting, setIsDeleting] = React.useState(false)

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this bookmark?')) return

        setIsDeleting(true)

        // Optimistic update: Remove from UI immediately
        if (onDelete) onDelete(id)

        const { error } = await supabase.from('bookmarks').delete().eq('id', id)

        if (error) {
            alert('Error deleting bookmark')
            setIsDeleting(false)
            // Ideally we would revert the optimistic update here if we had full state management,
            // but for this simple app, we just alert.
        }
    }

    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col justify-between h-full">
            <div className="px-4 py-5 sm:p-6 flex-grow ">
                <h3 className="text-lg leading-6 font-medium text-gray-900 truncate" title={title}>
                    {title}
                </h3>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-sm text-indigo-600 hover:text-indigo-900 hover:underline break-all block"
                >
                    {url}
                </a>
                <div className="mt-4 text-xs text-gray-400">
                    Added on {mounted ? new Date(created_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    }) : ''}
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end">
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors duration-200"
                >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </div>
    )
}
