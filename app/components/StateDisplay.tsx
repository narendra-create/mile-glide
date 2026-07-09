"use client";

import React from "react";
import { motion } from "motion/react";
import { AlertCircle, FileSearch, RefreshCcw } from "lucide-react";
import Link from "next/link";

interface StateDisplayProps {
  type?: "error" | "empty";
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
}

export function StateDisplay({
  type = "error",
  title,
  message,
  actionLabel,
  onAction,
  actionHref,
}: StateDisplayProps) {
  const isError = type === "error";

  const defaultTitle = isError ? "Something went wrong" : "No Data Found";
  const defaultMessage = isError
    ? "We encountered an error while processing your request. Please try again."
    : "There doesn't seem to be anything here right now.";
  const defaultAction = isError ? "Try Again" : "Refresh";

  const Icon = isError ? AlertCircle : FileSearch;
  const iconBg = isError
    ? "bg-red-100 text-red-500 dark:bg-red-500/10 dark:text-red-400"
    : "bg-blue-100 text-blue-500 dark:bg-blue-500/10 dark:text-blue-400";

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else if (!actionHref) {
      window.location.reload();
    }
  };

  const buttonContent = (
    <>
      <RefreshCcw className="w-4 h-4" />
      {actionLabel || defaultAction}
    </>
  );

  const buttonClass =
    "inline-flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 font-medium";

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center w-full">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center max-w-md bg-white border border-gray-100 rounded-3xl shadow-sm dark:bg-[#0a0a0a] dark:border-gray-800 p-8"
      >
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${iconBg}`}
        >
          <Icon className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title || defaultTitle}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          {message || defaultMessage}
        </p>

        {actionHref ? (
          <Link href={actionHref} className={buttonClass}>
            {buttonContent}
          </Link>
        ) : (
          <button onClick={handleAction} className={buttonClass}>
            {buttonContent}
          </button>
        )}
      </motion.div>
    </div>
  );
}
