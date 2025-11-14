'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8000/api/v1";

export type UserRole = 'admin' | 'core' | 'employee';

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
}

export const verifySession = cache(async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) {
        redirect('/login');
    }

    try {
        const response = await fetch(`${BACKEND_URL}/auth/verify/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Invalid token');
        }

        const user: User = await response.json();
        return { user };
    } catch (error) {
        redirect('/login');
    }
});

// Helper function to check if user has required role
export async function requireRole(allowedRoles: UserRole[]) {
    const { user } = await verifySession();

    if (!allowedRoles.includes(user.role)) {
        redirect('/unauthorized');
    }

    return { user };
}
