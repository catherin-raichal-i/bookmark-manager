import LoginForm from '@/components/LoginForm'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
        <LoginForm />
      </div>
      <div className="mt-8 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Bookmark Manager. All rights reserved.
      </div>
    </div>
  )
}
