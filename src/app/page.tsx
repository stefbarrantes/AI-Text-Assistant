import Generator from "./components/Generator";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-center pt-10 text-2xl sm:text-3xl font-bold text-gray-900">
          LLM Playground
        </h1>
        <Generator />
      </main>
    </div>
  );
}
