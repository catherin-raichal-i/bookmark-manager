'use client'

import React, { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import BookmarkCard from './BookmarkCard'

interface Bookmark {
    id: string
    user_id: string
    title: string
    url: string
    created_at: string
}

interface BookmarkListProps {
    initialBookmarks: Bookmark[]
    userId: string
}

export default function BookmarkList({ initialBookmarks, userId }: BookmarkListProps) {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks)
    const supabase = createClient()

    useEffect(() => {
        // Sync initial state if it changes from parent (e.g. initial server fetch)
        setBookmarks(initialBookmarks)

        const channel = supabase
            .channel('realtime-bookmarks')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'bookmarks',
                    filter: `user_id=eq.${userId}`,
                },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        setBookmarks((prev) => [payload.new as Bookmark, ...prev])
                    } else if (payload.eventType === 'DELETE') {
                        setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== payload.old.id))
                    }
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [initialBookmarks, userId, supabase])

    if (bookmarks.length === 0) {
        return (
            <div className="text-center py-12">
                <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        vectorEffect="non-scaling-stroke"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2h-1m-4 0h4"
                    />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No bookmarks</h3>
                <p className="mt-1 text-sm text-gray-500">
                    Get started by adding your first bookmark above.
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bookmarks.map((bookmark) => (
                <React.Fragment key={bookmark.id}>
                    <BookmarkCard
                        {...bookmark}
                        onDelete={(id) => {
                            // Fallback if realtime fails or is slow, though logic above handles it.
                            setBookmarks((prev) => prev.filter(b => b.id !== id))
                        }}
                    />
                </React.Fragment>
            ))}
        </div>
    )
}
