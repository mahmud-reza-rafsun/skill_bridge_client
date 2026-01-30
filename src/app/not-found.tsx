import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-blue-600">404</h1>
                <h2 className="text-3xl font-semibold text-gray-800 mt-4">
                </h2>
                <p className="text-gray-600 mt-2 mb-8">
                </p>

                <Link
                    href="/"
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg"
                >
                    Back to Home
                </Link>
            </div>

            <div className="mt-12 text-gray-400">
                <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="浸9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
        </div>
    );
}