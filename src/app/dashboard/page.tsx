import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import BookmarkForm from '@/components/BookmarkForm'
import BookmarkList from '@/components/BookmarkList'

export default async function DashboardPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/')
    }

    const { data: bookmarks } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <div className="md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        My Bookmarks
                    </h2>
                </div>
            </div>

            <BookmarkForm />

            <BookmarkList
                initialBookmarks={bookmarks || []}
                userId={user.id}
            />
        </div>
    )
}
