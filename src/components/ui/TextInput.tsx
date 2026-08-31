type TextInputProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

export default function TextInput({
  id,
  value,
  onChange,
  placeholder = "Enter your text...",
  rows = 5,
  disabled = false,
  onKeyDown,
}: TextInputProps) {
  return (
    <textarea
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-[15px] leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:opacity-60"
    />
  );
}
