"use client";

export default function CategoryCard({ category }: { category: any }) {
    return (
        <div className="p-5 bg-white dark:bg-black border dark:border-zinc-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-lg">{category.name}</h3>
                    <p className="text-xs text-orange-500 font-mono mt-1">slug: {category.slug}</p>
                </div>
            </div>
        </div>
    );
}