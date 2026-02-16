'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12">
            <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
            <p className="text-red-500 mb-8 max-w-md text-center bg-red-50 p-4 rounded-md">
                {error.message || 'An unexpected error occurred'}
            </p>
            <div className="flex gap-4">
                <Button onClick={() => reset()}>Try again</Button>
                <Button variant="outline" onClick={() => window.location.reload()}>Reload Page</Button>
            </div>
        </div>
    )
}
