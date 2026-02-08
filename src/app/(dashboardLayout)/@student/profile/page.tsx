"use client";

import { Mail, ShieldCheck, User as UserIcon, Camera } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { authClient } from "@/lib/auth-client";

export default function UserProfile() {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    if (!user) {
        return (
            <div className="flex items-center justify-center p-10">
                <div className="w-8 h-8 relative transform rotate-45"><div className="absolute bg-orange-600 w-3.5 h-3.5 animate-ping" style={{ top: 0, left: 0, animationDuration: "1.2s" }}></div><div className="absolute bg-orange-600 w-3.5 h-3.5 animate-ping" style={{ top: 0, right: 0, animationDuration: "1.2s", animationDelay: "0.15s" }}></div><div className="absolute bg-orange-600 w-3.5 h-3.5 animate-ping" style={{ bottom: 0, right: 0, animationDuration: "1.2s", animationDelay: "0.3s" }}></div><div className="absolute bg-orange-600 w-3.5 h-3.5 animate-ping" style={{ bottom: 0, left: 0, animationDuration: "1.2s", animationDelay: "0.45s" }}></div></div>
            </div>
        );
    }

    return (
        <Card className="max-w-md mx-auto overflow-hidden rounded-[2.5rem] border-zinc-200 dark:border-zinc-800 shadow-2xl bg-white dark:bg-zinc-950">
            {/* Header Background */}
            <div className="h-24 bg-gradient-to-r from-orange-400 to-rose-400 dark:from-orange-600 dark:to-rose-600" />

            <CardContent className="relative pt-0">
                {/* Profile Picture */}
                <div className="relative -top-12 flex justify-center">
                    <div className="relative">
                        <Avatar className="h-24 w-24 border-4 border-white dark:border-zinc-950 shadow-xl">
                            <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                            <AvatarFallback className="bg-zinc-100 dark:bg-zinc-800 text-2xl font-bold">
                                {user.name?.charAt(0) || "U"}
                            </AvatarFallback>
                        </Avatar>
                        <button className="absolute bottom-0 right-0 p-1.5 bg-white dark:bg-zinc-800 rounded-full border border-zinc-200 dark:border-zinc-700 shadow-sm hover:scale-110 transition-transform">
                            <Camera className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
                        </button>
                    </div>
                </div>

                {/* User Info */}
                <div className="text-center -mt-8 space-y-4">
                    <div>
                        <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50">
                            {user.name}
                        </h3>
                        <Badge variant="secondary" className="mt-1 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-none px-3">
                            <ShieldCheck className="w-3 h-3 mr-1" />
                            {(user as any).role}
                        </Badge>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-zinc-100 dark:border-zinc-900">
                        <div className="flex items-center justify-center gap-2 text-zinc-600 dark:text-zinc-400 text-sm">
                            <Mail className="w-4 h-4" />
                            <span>{user.email}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-zinc-500 dark:text-zinc-500 text-xs italic">
                            <UserIcon className="w-4 h-4" />
                            <span>Unique ID: {user.id?.substring(0, 8)}...</span>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <button className="w-full mt-6 py-3 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 rounded-2xl font-bold text-sm transition-all hover:opacity-90 active:scale-[0.98]">
                    Edit Profile
                </button>
            </CardContent>
        </Card>
    );
}