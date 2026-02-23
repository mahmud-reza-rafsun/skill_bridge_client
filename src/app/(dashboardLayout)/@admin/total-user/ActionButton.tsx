"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { UserRoundX, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { env } from '@/env'

const BACKEND_URL = env.NEXT_PUBLIC_BACKEND_URL;

export default function ActionButton({ userId, currentStatus }: { userId: string, currentStatus: string }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState(currentStatus)

    useEffect(() => {
        setStatus(currentStatus)
    }, [currentStatus])

    const isBanned = status === 'banned'

    const handleBanUser = async (id: string) => {
        if (isBanned) return;

        setIsLoading(true)
        try {
            const response = await fetch(`${BACKEND_URL}/api/admin/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    status: 'banned'
                })
            })

            if (response.ok) {
                setStatus('banned')
                router.refresh()
            } else {
                const errorData = await response.json()
                console.error("Failed:", errorData)
            }
        } catch (error) {
            console.error("Error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <Button
                onClick={() => handleBanUser(userId)}
                disabled={isLoading || isBanned}
                className={`cursor-pointer text-white ${isBanned ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'}`}
            >
                {isLoading ? (
                    <Loader2 className="animate-spin text-xl" />
                ) : (
                    <UserRoundX className='text-xl' />
                )}
            </Button>
        </div>
    )
}