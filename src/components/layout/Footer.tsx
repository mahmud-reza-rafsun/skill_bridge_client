"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Footer = () => {
  const footerLinks = {
    "Skill Bridge": [
      { name: "Home", href: "/" },
      {
        name: "About",
        type: "modal",
        title: "About Skill Bridge",
        content: "Skill Bridge is a leading global learning platform dedicated to narrowing the gap between ambitious learners and industry experts. Founded in 2024, we provide high-quality mentorship and structured learning paths to help professionals excel in the ever-evolving tech landscape."
      },
      {
        name: "Pricing",
        type: "modal",
        title: "Flexible Learning Plans",
        content: "We offer transparent pricing designed for every stage of your career. From free introductory modules to premium 1-on-1 mentorship programs, our plans are crafted to ensure maximum ROI for your professional development."
      },
      {
        name: "Mentors",
        type: "modal",
        title: "Our Expert Mentors",
        content: "Our mentors are industry veterans from top global companies. They don't just teach; they provide real-world insights, code reviews, and career guidance to help you navigate your professional journey with confidence."
      },
    ],
    Learning: [
      {
        name: "All Courses",
        type: "modal",
        title: "Explore Our Curriculum",
        content: "Browse through hundreds of courses ranging from Full-Stack Development and AI to UI/UX Design and Product Management. Every course is project-based, ensuring you build a portfolio while you learn."
      },
      {
        name: "Learning Paths",
        type: "modal",
        title: "Guided Learning Paths",
        content: "Stop wondering what to learn next. Our curated paths provide a step-by-step roadmap from beginner to job-ready professional, focusing on the most in-demand skills in today's market."
      },
      {
        name: "Student Stories",
        type: "modal",
        title: "Alumni Success Stories",
        content: "Thousands of students have transformed their careers through Skill Bridge. Read about how our graduates landed roles at Fortune 500 companies and launched successful startups."
      },
      {
        name: "Community",
        type: "modal",
        title: "Global Learning Community",
        content: "Learning is better together. Join our exclusive Discord and Slack channels to network with peers, participate in hackathons, and collaborate on open-source projects."
      },
    ],
    Resources: [
      {
        name: "FAQs",
        type: "modal",
        title: "Frequently Asked Questions",
        content: "Find quick answers regarding enrollment, certificate validation, scholarship opportunities, and technical support. We are here to ensure your learning experience is seamless."
      },
      {
        name: "Quick Start",
        type: "modal",
        title: "Onboarding Guide",
        content: "New to Skill Bridge? Our Quick Start guide helps you set up your profile, choose your first path, and connect with your mentor in less than 5 minutes."
      },
      {
        name: "Documentation",
        type: "modal",
        title: "Technical Documentation",
        content: "Access comprehensive guides on using our integrated IDE, submitting assignments, and utilizing our API for custom learning integrations."
      },
      {
        name: "User Guide",
        type: "modal",
        title: "Platform User Manual",
        content: "A complete manual covering all platform features, from tracking your progress and managing subscriptions to scheduling 1-on-1 sessions with mentors."
      },
    ],
    Support: [
      {
        name: "Help Center",
        type: "modal",
        title: "24/7 Help Center",
        content: "Our dedicated support team is available around the clock to assist you with any billing or technical issues. Your success is our top priority."
      },
      {
        name: "Terms of Service",
        type: "modal",
        title: "Terms & Conditions",
        content: "By using Skill Bridge, you agree to our policies on academic integrity, intellectual property rights, and fair usage of our resources to maintain a high-quality environment for all."
      },
      {
        name: "Privacy Policy",
        type: "modal",
        title: "Privacy & Data Security",
        content: "We employ industry-standard encryption to protect your personal data. We never sell your information, and you have full control over your data privacy settings at all times."
      },
      { name: "Contact", type: "contact" },
    ],
  };

  const socialLinks = [
    {
      label: "Twitter",
      href: "https://x.com/rafsun_dev",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
      )
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/rafsun-dev/",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93-1.11 0-1.62.77-1.62 1.93V19h-3v-9h2.93v1.3a2.93 2.93 0 012.71-1.55c1.8 0 3.36 1.08 3.36 3.93z" /></svg>
      )
    },
    {
      label: "GitHub",
      href: "https://github.com/mahmud-reza-rafsun",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
      )
    }
  ];

  return (
    <footer className="w-full bg-background border-t border-orange-500/10">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8 py-16">

          <div className="col-span-full lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 justify-center lg:justify-start">
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 bg-orange-500 rounded-sm"></span>
                <span className="w-2.5 h-2.5 bg-orange-500/50 rounded-sm"></span>
              </div>
              <span className="text-xl font-bold">Skill Bridge</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-8 text-center lg:text-left max-w-xs">
              Empowering learners worldwide through quality education and expert mentorship. Build your future with us.
            </p>
            <div className="flex justify-center lg:justify-start">
              <ContactFormModal>
                <Button className="rounded-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white border-none h-10 px-6 transition-all duration-300">
                  Contact us
                </Button>
              </ContactFormModal>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="text-left">
              <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-6">
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    {link.type === "modal" ? (
                      <ContentModal title={link.title!} content={link.content!}>
                        <button className="text-sm cursor-pointer text-muted-foreground hover:text-orange-500 transition-colors text-left">
                          {link.name}
                        </button>
                      </ContentModal>
                    ) : link.type === "contact" ? (
                      <ContentModal
                        title="Contact Support"
                        content="You can contact us via form for any queries, but you must be logged into your account to access the contact form. Please log in first."
                      >
                        <button className="text-sm cursor-pointer text-muted-foreground hover:text-orange-500 transition-colors text-left">
                          {link.name}
                        </button>
                      </ContentModal>
                    ) : (
                      <Link
                        href={link.title || "/"}
                        className="text-sm text-muted-foreground hover:text-orange-500 transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-8 border-t border-orange-500/10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <span className="text-sm text-muted-foreground">
            © 2026 <span className="text-orange-500 font-semibold">Skill Bridge</span>. All rights reserved.
          </span>

          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 cursor-pointer h-10 rounded-full bg-muted flex justify-center items-center text-muted-foreground hover:bg-orange-500/10 hover:text-orange-500 transition-all duration-300 shadow-sm"
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Sub-components for Modals ---

const ContentModal = ({ title, content, children }: { title: string; content: string; children: React.ReactNode }) => (
  <Dialog>
    <DialogTrigger>{children}</DialogTrigger>
    <DialogContent className="sm:max-w-md rounded-[2.5rem] border-orange-500/20">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold text-orange-500">{title}</DialogTitle>
        <DialogDescription className="pt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {content}
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
);

// This is only for the "Contact us" main button in Footer
const ContactFormModal = ({ children }: { children: React.ReactNode }) => (
  <Dialog>
    <DialogTrigger>{children}</DialogTrigger>
    <DialogContent className="sm:max-w-lg rounded-[2.5rem] p-8 border-orange-500/20">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">Get in Touch</DialogTitle>
        <DialogDescription>
          Have questions? Send us a message and our team will get back to you within 24 hours.
        </DialogDescription>
      </DialogHeader>
      <form className="space-y-4 mt-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-4">
          <Input placeholder="First Name" className="rounded-xl border-zinc-200 dark:border-zinc-800 focus:border-orange-500" />
          <Input placeholder="Last Name" className="rounded-xl border-zinc-200 dark:border-zinc-800 focus:border-orange-500" />
        </div>
        <Input type="email" placeholder="Email Address" className="rounded-xl border-zinc-200 dark:border-zinc-800 focus:border-orange-500" />
        <Textarea placeholder="How can we help you today?" className="rounded-xl border-zinc-200 dark:border-zinc-800 focus:border-orange-500 min-h-[120px]" />
        <Button className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white rounded-xl h-12 font-semibold">
          Send Message
        </Button>
      </form>
    </DialogContent>
  </Dialog>
);

export default Footer;