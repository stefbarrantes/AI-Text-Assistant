"use client";

import { Operation } from "@/types/types";
import OperationSelector from "../OperationSelector";
import SubmitButton from "../ui/SubmitButton";
import TextInput from "../ui/TextInput";

type GeneratorFormProps = {
  operation: Operation;
  text: string;
  loading: boolean;
  onOperationChange: (operation: Operation) => void;
  setText: (value: string) => void;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
};

export default function GeneratorForm({
  operation,
  text,
  loading,
  onOperationChange,
  setText,
  onSubmit,
}: GeneratorFormProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            What would you like to do?
          </label>

          <OperationSelector value={operation} onChange={onOperationChange} />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="generator-text"
              className="text-sm font-medium text-slate-700"
            >
              Your text
            </label>

            <span className="text-xs text-slate-400">
              {text.length} characters
            </span>
          </div>

          <TextInput
            id="generator-text"
            value={text}
            onChange={(value) => setText(value)}
            placeholder="Paste or type your text here..."
            rows={7}
            disabled={loading}
          />
        </div>

        <div className="flex justify-end">
          <SubmitButton
            label="Generate"
            loadingLabel="Generating"
            loading={loading}
            disabled={!text.trim()}
          />
        </div>
      </form>
    </div>
  );
}
