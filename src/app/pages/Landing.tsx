"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Phone,
  MessageSquare,
  Users,
  Settings,
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 1 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("create");
  const { scrollYProgress } = useScroll();

  const features = [
    {
      icon: Phone,
      title: "Voice Agents",
      description:
        "Create AI agents with customizable voices for phone interactions.",
    },
    {
      icon: MessageSquare,
      title: "Chat Agents",
      description:
        "Deploy chatbots with advanced language understanding capabilities.",
    },
    {
      icon: Users,
      title: "Multi-Language",
      description: "Create agents that can communicate in multiple languages.",
    },
    {
      icon: Settings,
      title: "Easy Setup",
      description:
        "Intuitive interface for setting up and managing your AI agents.",
    },
  ];

  const steps = [
    {
      title: "Select an Agent",
      description: "Set up your AI agent with custom voices and prompts.",
    },
    {
      title: "Configure Settings",
      description: "Customize behavior, language, and interaction styles.",
    },
    {
      title: "Start chatting",
      description:
        "Chat with your agent and track its performance in real-time.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.header
          className="flex justify-between items-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          <div className="text-3xl font-bold">AgentMaster</div>
          <div className="space-x-4">
            <Button
              variant="ghost"
              className="text-white hover:text-white/80"
              asChild
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button
              className="bg-white text-purple-600 hover:bg-white/90"
              asChild
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </motion.header>

        <motion.section
          className="text-center mb-24"
          // initial="initial"
          // animate="animate"
          // variants={stagger}
        >
          <motion.h1
            className="text-5xl font-extrabold mb-6 leading-tight"
            // variants={fadeIn}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Revolutionize Customer Interactions
            <br />
            with AI-Powered Agents
          </motion.h1>
          <motion.p
            className="text-xl mb-8 max-w-2xl mx-auto"
            // variants={fadeIn}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Create, customize, and deploy intelligent AI agents for seamless
            calls and chats.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-white/90"
              asChild
            >
              <Link href="/dashboard">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.section>

        <motion.section
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <motion.h2
            className="text-3xl font-bold mb-8 text-center"
            variants={fadeIn}
          >
            Powerful Features
          </motion.h2>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={stagger}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300">
                  <CardContent className="p-6">
                    <feature.icon className="h-8 w-8 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/80">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          className="mb-24"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.h2
            className="text-3xl font-bold mb-8 text-center"
            variants={fadeIn}
          >
            How It Works
          </motion.h2>
          <Tabs
            defaultValue="create"
            className="w-full max-w-3xl mx-auto"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-3 bg-white/10 rounded-full p-1">
              {steps.map((step, index) => (
                <TabsTrigger
                  key={index}
                  value={step.title.toLowerCase().split(" ")[0]}
                  className="rounded-full data-[state=active]:bg-white data-[state=active]:text-purple-600"
                >
                  {`Step ${index + 1}`}
                </TabsTrigger>
              ))}
            </TabsList>
            {steps.map((step, index) => (
              <TabsContent
                key={index}
                value={step.title.toLowerCase().split(" ")[0]}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8 text-center"
                  >
                    <h3 className="text-2xl font-semibold mb-4">
                      {step.title}
                    </h3>
                    <p className="text-white/80 mb-6">{step.description}</p>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-3xl font-bold">{index + 1}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
            ))}
          </Tabs>
        </motion.section>

        <motion.section
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ scale: scrollYProgress }}
          // initial="initial"
          // animate="animate"
          // variants={stagger}
        >
          <motion.h2 className="text-3xl font-bold mb-4" variants={fadeIn}>
            Ready to Transform Your Customer Interactions?
          </motion.h2>
          <motion.p className="text-xl mb-8" variants={fadeIn}>
            Join thousands of businesses leveraging AI agents for enhanced
            customer experiences.
          </motion.p>
          <motion.div variants={fadeIn}>
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-white/90"
              asChild
            >
              <Link href="/signup">Start Your Free Trial</Link>
            </Button>
          </motion.div>
        </motion.section>
      </div>

      <motion.footer
        className="bg-purple-800/30 backdrop-blur-sm py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="container mx-auto px-4 text-center text-white/80">
          <p>&copy; 2024 AgentMaster. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  );
}
