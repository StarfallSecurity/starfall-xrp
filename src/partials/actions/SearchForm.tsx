import React, { useState } from 'react';
import { fetchWalletByAddress } from '../../services/network/wallet';
import Spinner from '../../pages/component/Spinner';

interface Props {
  placeholder?: string;
  onSearch?: Function;
}

const SearchForm: React.FC<Props> = ({ placeholder, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const spinnerStyle: React.CSSProperties = {
    position: 'absolute',
    top: '9px',
    left: '8px'
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await onSearch?.(searchTerm);
    } catch (error: any) {
      setLoading(false);
      setError(error?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSearch} className="relative">
        <label htmlFor="action-search" className="sr-only">
          Search
        </label>
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          id="action-search"
          className="form-input pl-9 focus:border-slate-300"
          type="search"
          placeholder={placeholder}
        />
        {loading ? ( // Show the Spinner when loading is true
          <Spinner size={20} style={spinnerStyle} />
        ) : (
          <button className="absolute inset-0 right-auto group" type="submit" aria-label="Search">
            <svg
              className="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 mr-2"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
              <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
            </svg>
          </button>
        )}
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
    </div>
  );
};

SearchForm.defaultProps = {
  placeholder: 'Search…',
  onSearch: () => {}
};

export default SearchForm;
