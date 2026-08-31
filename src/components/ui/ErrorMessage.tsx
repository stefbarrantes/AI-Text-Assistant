type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
        !
      </div>

      <div>
        <p className="font-medium">Something went wrong</p>
        <p className="mt-0.5 text-red-600/80">{message}</p>
      </div>
    </div>
  );
}
