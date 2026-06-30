"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, AlertCircle, Info, XCircle, X } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastProps {
  id: string;
  title?: string;
  message: string;
  type?: ToastType;
}

interface ToastContextType {
  addToast: (toast: Omit<ToastProps, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = useCallback((toast: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);

    setTimeout(() => {
      removeToast(id);
    }, 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col gap-3 max-w-sm w-full p-4 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem = ({ toast, onRemove }: { toast: ToastProps; onRemove: () => void }) => {
  const styles = {
    success: {
      icon: <CheckCircle className="text-green-500" size={16} />,
      bg: "bg-green-500/10",
      border: "border-green-500/20",
    },
    error: {
      icon: <XCircle className="text-red-500" size={16} />,
      bg: "bg-red-500/10",
      border: "border-red-500/20",
    },
    warning: {
      icon: <AlertCircle className="text-amber-500" size={16} />,
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    info: {
      icon: <Info className="text-blue-500" size={16} />,
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
  };

  const currentType = toast.type || "info";
  const style = styles[currentType];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      layout
      className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-4 shadow-2xl flex items-start gap-3 pointer-events-auto w-full"
    >
      <div
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${style.bg} ${style.border}`}
      >
        {style.icon}
      </div>
      <div className="flex-1 min-w-0 pt-1">
        {toast.title && (
          <h3 className="text-white font-serif text-[15px] leading-none mb-1.5">
            {toast.title}
          </h3>
        )}
        <p className="text-[#a09b96] text-[13px] font-sans leading-relaxed break-words">
          {toast.message}
        </p>
      </div>
      <button
        onClick={onRemove}
        className="shrink-0 p-1 text-[#7a7570] hover:text-white transition-colors"
        title="Close"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
};
