"use client";

import { Operation } from "@/app/types";

export const OPERATIONS: { value: Operation; label: string }[] = [
  { value: "summarize", label: "Summarize" },
  { value: "rewrite", label: "Rewrite" },
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
];

interface OperationSelectorProps {
  value: Operation;
  onChange: (operation: Operation) => void;
}

export default function OperationSelector({
  value,
  onChange,
}: OperationSelectorProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="operation" className="text-sm font-medium text-gray-700">
        Operation
      </label>
      <select
        id="operation"
        value={value}
        onChange={(e) => onChange(e.target.value as Operation)}
        className="w-full sm:w-56 p-2.5 text-base text-gray-900 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {OPERATIONS.map((op) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>
    </div>
  );
}
