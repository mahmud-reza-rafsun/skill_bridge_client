// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";
// import { Clock, BookOpen, DollarSign, User, Briefcase, ChevronRight } from "lucide-react";

// export default function BecomeTutor() {
//     const router = useRouter();
//     const [loading, setLoading] = useState(false);
//     const [availability, setAvailability] = useState({
//         saturday: ["", ""],
//         sunday: ["", ""],
//         monday: ["", ""],
//     });

//     const handleTimeChange = (day: string, index: number, value: string) => {
//         setAvailability((prev: any) => ({
//             ...prev,
//             [day]: prev[day].map((t: string, i: number) => (i === index ? value : t)),
//         }));
//     };

//     // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     //     e.preventDefault();
//     //     setLoading(true);

//     //     const formData = new FormData(e.currentTarget);
//     //     const finalData = {
//     //         categoryName: formData.get("categoryName") as string,
//     //         bio: formData.get("bio") as string,
//     //         hourlyRate: Number(formData.get("hourlyRate")),
//     //         subject: (formData.get("subjects") as string)
//     //             .split(",")
//     //             .map(s => s.trim())
//     //             .filter(s => s !== ""),
//     //         availability: availability
//     //     };

//     //     try {
//     //         const res = await becomeATutorSerive.becomeTutor(finalData);
//     //         if (res) {
//     //             toast.success("Success! Your tutor profile is ready.");
//     //             router.push("/dashboard");
//     //         }
//     //     } catch (error: any) {
//     //         toast.error(error.message || "Something went wrong");
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };

//     return (
//         <div className="max-w-2xl mx-auto p-3 bg-white dark:bg-zinc-950 rounded-xl border-zinc-200 border dark:border-zinc-800">
//             {/* Header Section */}
//             <div className="mb-5">
//                 <h2 className="text-3xl font-gray-900 font-bold text-zinc-900 dark:text-white leading-none">
//                     Tutor <span className="text-orange-500">Profile</span>
//                 </h2>
//             </div>

//             {/* <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Category Name */}
//             <div className="space-y-2">
//                 <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-2">
//                     <Briefcase size={14} className="text-orange-500" /> Category Name
//                 </label>
//                 <div className="relative group">
//                     <select
//                         name="categoryName"
//                         required
//                         defaultValue=""
//                         className="flex h-12 w-full appearance-none rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 px-4 text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer text-zinc-900 dark:text-zinc-100"
//                     >
//                         <option value="" disabled>Select a category</option>
//                         <option value="web-dev">Web Development</option>
//                         <option value="ai-ml">AI / Machine Learning</option>
//                         <option value="data-science">Data Science</option>
//                         <option value="app-dev">App Development</option>
//                         <option value="ui-ux">UI/UX Design</option>
//                         <option value="cyber-security">Cyber Security</option>
//                     </select>

//                     {/* Custom Arrow Icon */}
//                     <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 group-focus-within:text-orange-500 transition-colors">
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="16" height="16"
//                             viewBox="0 0 24 24" fill="none"
//                             stroke="currentColor" strokeWidth="2"
//                             strokeLinecap="round" strokeLinejoin="round"
//                         >
//                             <path d="m6 9 6 6 6-6" />
//                         </svg>
//                     </div>
//                 </div>
//             </div>

//             {/* Bio */}
//             <div className="space-y-2">
//                 <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-2">
//                     <User size={14} className="text-orange-500" /> Professional Bio
//                 </label>
//                 <textarea
//                     name="bio"
//                     required
//                     placeholder="Tell students about your experience, teaching style, and expertise..."
//                     className="flex min-h-[120px] w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 p-4 text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none"
//                 />
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Hourly Rate */}
//                 <div className="space-y-2">
//                     <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-2">
//                         <DollarSign size={14} className="text-orange-500" /> Hourly Rate ($)
//                     </label>
//                     <div className="relative">
//                         <input
//                             name="hourlyRate"
//                             type="number"
//                             required
//                             placeholder="30"
//                             className="flex h-12 w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 px-4 text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
//                         />
//                     </div>
//                 </div>

//                 {/* Subjects */}
//                 <div className="space-y-2">
//                     <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-2">
//                         <BookOpen size={14} className="text-orange-500" /> Subjects
//                     </label>
//                     <input
//                         name="subjects"
//                         type="text"
//                         required
//                         placeholder="Next.js, Tailwind, Prisma"
//                         className="flex h-12 w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 px-4 text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
//                     />
//                 </div>
//             </div>

//             {/* Availability Section */}
//             <div className="space-y-4 pt-6 border-t border-zinc-100 dark:border-zinc-900">
//                 <div className="flex items-center justify-between">
//                     <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
//                         <Clock size={14} /> Weekly Availability
//                     </h3>
//                 </div>

//                 {['saturday', 'sunday', 'monday'].map((day) => (
//                     <div key={day} className="group flex flex-col sm:flex-row sm:items-center gap-4 bg-zinc-50 dark:bg-zinc-900/40 p-4 rounded-2xl border border-transparent hover:border-orange-500/20 transition-all">
//                         <span className="w-24 text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-orange-500 transition-colors">{day}</span>
//                         <div className="flex flex-1 items-center gap-3">
//                             <input
//                                 type="text"
//                                 placeholder="10 AM"
//                                 value={availability[day as keyof typeof availability][0]}
//                                 onChange={(e) => handleTimeChange(day, 0, e.target.value)}
//                                 className="flex-1 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 text-xs font-medium outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
//                             />
//                             <span className="text-zinc-400 font-bold text-[10px]">TO</span>
//                             <input
//                                 type="text"
//                                 placeholder="04 PM"
//                                 value={availability[day as keyof typeof availability][1]}
//                                 onChange={(e) => handleTimeChange(day, 1, e.target.value)}
//                                 className="flex-1 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 text-xs font-medium outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
//                             />
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Submit Button */}
//             <button
//                 type="submit"
//                 disabled={loading}
//                 className="group relative w-full mt-6 bg-zinc-900 dark:bg-orange-500 text-white dark:text-zinc-950 font-black py-4 rounded-[1.2rem] hover:bg-orange-500 dark:hover:bg-orange-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-xs flex items-center justify-center gap-2 overflow-hidden shadow-xl"
//             >
//                 <span className="relative z-10 flex items-center gap-2">
//                     {loading ? "Processing..." : "Complete Setup"}
//                     {!loading && <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />}
//                 </span>
//             </button>
//         </form> */}
//         </div >
//     );
// }