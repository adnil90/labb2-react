import { type FormEvent } from "react";

type Props = {
  value: string;
  loading?: boolean;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export function SearchForm({ value, loading, onChange, onSubmit }: Props) {
  return (
    <form
      onSubmit={onSubmit}
      aria-label="City search"
      className="search-form"
    >
      <label
        htmlFor="q"
        className="search-label"
      >
        City
      </label>
      <input
        id="q"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Stockholm"
        autoComplete="off"
        className="search-input"
      />
      <button
        type="submit"
        disabled={!!loading}
        aria-disabled={!!loading}
        className="search-button"
      >
        Search
      </button>
    </form>
  );
}
