'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { createNote } from '@/app/actions'

export function CreateNote() {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        const form = event.currentTarget
        const formData = new FormData(form)

        try {
            const result = await createNote(formData)
            if (result?.error) {
                alert(`Error: ${result.error}`)
            } else {
                setIsOpen(false)
                form.reset() // Use preserved form reference
            }
        } catch (e) {
            console.error(e)
            alert(`An error occurred: ${e instanceof Error ? e.message : String(e)}`)
        } finally {
            setIsLoading(false)
        }
    }

    if (!isOpen) {
        return <Button onClick={() => setIsOpen(true)}>+ New Note</Button>
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Create New Note</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" required placeholder="Note title" disabled={isLoading} />
                    </div>
                    <div>
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            name="content"
                            required
                            placeholder="Write your note here..."
                            className="h-32"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} disabled={isLoading}>Cancel</Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Creating...' : 'Create Note'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
