"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X } from "lucide-react";

export default function TerminalEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ command: string; output: string | React.ReactNode }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle the ~ or ` key to toggle
      if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    let output: string | React.ReactNode = "";
    const cmd = input.trim().toLowerCase();

    if (cmd === "whoami") {
      output = (
        <span className="text-primary bg-primary/10 px-1 rounded">
          meet-khandelwal backend-engineer ar-vr-enthusiast learner
        </span>
      );
    } else if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else if (cmd === "help") {
      output = "Available commands: whoami, clear, help, exit";
    } else if (cmd === "exit") {
      setIsOpen(false);
      setInput("");
      return;
    } else {
      output = `Command not found: ${cmd}`;
    }

    setHistory((prev) => [...prev, { command: input, output }]);
    setInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 container mx-auto max-w-4xl pointer-events-none"
        >
          <div className="glass-panel border-t border-r border-l rounded-t-xl bg-black/80 backdrop-blur-xl h-64 flex flex-col overflow-hidden pointer-events-auto font-mono text-sm shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
            
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <TerminalIcon className="w-4 h-4" /> root@meet-portfolio ~
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-white transition-colors"
                title="Close Terminal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div 
              className="flex-1 p-4 overflow-y-auto flex flex-col gap-2 custom-scrollbar text-gray-300"
              onClick={() => inputRef.current?.focus()}
            >
              <div className="text-secondary mb-2">Type 'help' to see available commands. Try 'whoami'</div>
              
              {history.map((entry, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-accent">{">"}</span>
                    <span>{entry.command}</span>
                  </div>
                  <div className="ml-4 text-gray-400">{entry.output}</div>
                </div>
              ))}

              <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-1">
                <span className="text-secondary">{">"}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="bg-transparent border-none outline-none flex-1 text-white placeholder-gray-600"
                  spellCheck="false"
                  autoComplete="off"
                />
              </form>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
