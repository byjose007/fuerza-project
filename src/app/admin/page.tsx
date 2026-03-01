import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

// /admin → si ya estás logueado vas al dashboard, si no al login
export default async function AdminIndexPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
        redirect('/admin/dashboard')
    } else {
        redirect('/admin/login')
    }
}
