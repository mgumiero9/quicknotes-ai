'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { deleteNote } from '@/app/actions'
import { Trash2 } from 'lucide-react'

interface DeleteNoteProps {
    id: string
}

export function DeleteNote({ id }: DeleteNoteProps) {
    const [isDeleting, setIsDeleting] = useState(false)

    async function handleDelete() {
        if (confirm('Are you sure you want to delete this note?')) {
            setIsDeleting(true)
            try {
                const result = await deleteNote(id)
                if (result?.error) {
                    alert(result.error)
                }
            } catch (e) {
                console.error(e)
                alert('An error occurred while deleting the note')
            } finally {
                setIsDeleting(false)
            }
        }
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
            {isDeleting ? 'Deleting...' : <Trash2 className="h-4 w-4" />}
        </Button>
    )
}
