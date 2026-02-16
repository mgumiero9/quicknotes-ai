'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { summarizeNotes } from '@/app/actions'
import { Sparkles } from 'lucide-react'

export default function AISummary() {
    const [summary, setSummary] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    async function handleSummarize() {
        setIsLoading(true)
        setSummary(null)
        try {
            const result = await summarizeNotes()
            if (result.error) {
                alert(result.error)
            } else if (result.summary) {
                setSummary(result.summary)
            }
        } catch (e) {
            console.error(e)
            alert('An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <Button
                variant="secondary"
                onClick={handleSummarize}
                disabled={isLoading}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white"
            >
                {isLoading ? (
                    'Summarizing...'
                ) : (
                    <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        AI Summarize
                    </>
                )}
            </Button>

            {summary && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-indigo-600" />
                                AI Summary
                            </h2>
                            <Button variant="ghost" size="sm" onClick={() => setSummary(null)}>Close</Button>
                        </div>
                        <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                            {summary}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}