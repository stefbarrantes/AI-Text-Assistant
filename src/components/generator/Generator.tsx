"use client";

import GeneratorForm from "@/components/generator/GeneratorForm";
import ResponseDisplay from "@/components/generator/ResponseDisplay";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useGenerator } from "@/hooks/useGenerator";

export default function Generator() {
  const {
    operation,
    text,
    response,
    loading,
    error,
    setOperation,
    setText,
    generate,
  } = useGenerator();

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    generate();
  }

  return (
    <main className="min-h-screen w-full bg-slate-50">
      <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <header className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
            AI Writing Assistant
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Transform your text
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Choose an operation, paste your text, and let AI do the heavy
            lifting.
          </p>
        </header>

        <GeneratorForm
          operation={operation}
          text={text}
          loading={loading}
          onOperationChange={setOperation}
          setText={setText}
          onSubmit={handleSubmit}
        />

        {error && <ErrorMessage message={error} />}

        {response && <ResponseDisplay response={response} />}
      </div>
    </main>
  );
}
