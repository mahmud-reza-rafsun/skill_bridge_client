"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CategoryPostForm({ token }: { token: string }) {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ name, slug }),
            });

            const result = await res.json();

            if (res.ok && result.success) {
                setName("");
                setSlug("");
                router.refresh();
            } else {
                alert(result.message || "Something went wrong");
            }
        } catch (error) {
            console.error("Post Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 bg-slate-50 dark:bg-zinc-900 p-6 rounded-xl border">
            <Input
                placeholder="Category Name"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                    setSlug(e.target.value.toLowerCase().replace(/\s+/g, "_").replace(/[^\w-]+/g, ""));
                }}
                disabled={loading}
                required
            />
            <Input
                placeholder="Slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                disabled={loading}
                required
            />
            <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 cursor-pointer"
                disabled={loading}
            >
                {loading ? "Adding..." : "Add Category"}
            </Button>
        </form>
    );
}