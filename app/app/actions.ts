'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import OpenAI from 'openai'

// Initialize OpenAI conditionally to avoid runtime crash if key is missing during build
const openai = process.env.OPENAI_API_KEY
    ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    : null

/**
 * Helper to authenticate user and return supabase client + user
 * Adheres to DRY principle.
 */
async function getAuthenticatedUser() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }
    return { supabase, user }
}

export async function createNote(formData: FormData) {
    const { supabase, user } = await getAuthenticatedUser()

    // Safe extraction with fallback to empty string or null check
    const title = formData.get('title')?.toString()
    const content = formData.get('content')?.toString()

    if (!title || !content) {
        return { error: 'Title and content are required' }
    }

    const { error } = await supabase.from('notes').insert({
        title,
        content,
        user_id: user.id,
    })

    if (error) {
        console.error('Error creating note:', error)
        return { error: 'Failed to create note' }
    }

    revalidatePath('/')
    return { success: true }
}

export async function deleteNote(id: string) {
    const { supabase } = await getAuthenticatedUser()

    if (!id) return { error: 'Note ID is required' }

    const { error } = await supabase.from('notes').delete().eq('id', id)

    if (error) {
        console.error('Error deleting note:', error)
        return { error: 'Failed to delete note' }
    }

    revalidatePath('/')
    return { success: true }
}

export async function summarizeNotes() {
    const { supabase, user } = await getAuthenticatedUser()

    if (!openai) {
        return { error: 'OpenAI API key not configured' }
    }

    const { data: notes, error } = await supabase
        .from('notes')
        .select('content')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching notes:', error)
        return { error: 'Failed to fetch notes' }
    }

    if (!notes || notes.length === 0) {
        return { error: 'No notes to summarize' }
    }

    // Explicit typing would be better if we imported the type, 
    // but for now we infer content is string based on the select.
    // Using explicit Optional Chaining for safety.
    const allContent = notes.map((note: { content: string }) => note.content).join('\n\n')

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant that summarizes notes concisely. Provide a summary of the following notes.',
                },
                { role: 'user', content: allContent },
            ],
            model: 'gpt-3.5-turbo',
        })

        // Clean Code: Null safe access
        const summary = completion.choices?.[0]?.message?.content

        if (!summary) {
            return { error: 'Failed to generate summary content' }
        }

        return { success: true, summary }
    } catch (error) {
        console.error('OpenAI API error:', error)
        return { error: 'Failed to generate summary' }
    }
}
