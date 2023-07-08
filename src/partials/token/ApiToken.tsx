import React, { useState } from 'react';
import { getFormattedDate } from '../../utils/Utils';

interface Props {
  token: string;
  created: string;
  deleteTokens: Function;
}

const ApiToken: React.FC<Props> = ({ token, created, deleteTokens }) => {
  const [showToken, setShowToken] = useState<boolean>(false);
  function shortenToken(digits: number = 4) {
    return `****${token.substring(token?.length - digits)}`;
  }
  return (
    <div className="p-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
      <div className="grid grid-cols-12 items-center gap-x-2">
        {/* Card */}
        <div className="col-span-6 order-1 sm:order-none sm:col-span-3 flex items-center space-x-4 lg:sidebar-expanded:col-span-6 xl:sidebar-expanded:col-span-3">
          <svg className="shrink-0" width="32" height="24" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient x1="1.829%" y1="100%" x2="100%" y2="2.925%" id="c1-a">
                <stop stopColor="#475569" offset="0%" />
                <stop stopColor="#1E293B" offset="100%" />
                <stop stopColor="#9FA1FF" offset="100%" />
              </linearGradient>
            </defs>
            <g fill="none" fillRule="evenodd">
              <rect fill="url(#c1-a)" width="32" height="24" rx="3" />
              <ellipse
                fill="#E61C24"
                fillRule="nonzero"
                cx="12.522"
                cy="12"
                rx="5.565"
                ry="5.647"
              />
              <ellipse
                fill="#F99F1B"
                fillRule="nonzero"
                cx="19.432"
                cy="12"
                rx="5.565"
                ry="5.647"
              />
              <path
                d="M15.977 7.578A5.667 5.667 0 0 0 13.867 12c0 1.724.777 3.353 2.11 4.422A5.667 5.667 0 0 0 18.087 12a5.667 5.667 0 0 0-2.11-4.422Z"
                fill="#F26622"
                fillRule="nonzero"
              />
            </g>
          </svg>
          <div className="flex">
            <div className="text-xs">{showToken ? token : shortenToken()}</div>
            <button
              className={`mx-4 ${showToken ? 'hidden' : 'block'}`}
              onClick={() => setShowToken(!showToken)}
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                <path d="M14.574 5.67a13.292 13.292 0 0 1 1.298 1.842 1 1 0 0 1 0 .98C15.743 8.716 12.706 14 8 14a6.391 6.391 0 0 1-1.557-.2l1.815-1.815C10.97 11.82 13.06 9.13 13.82 8c-.163-.243-.39-.56-.669-.907l1.424-1.424ZM.294 15.706a.999.999 0 0 1-.002-1.413l2.53-2.529C1.171 10.291.197 8.615.127 8.49a.998.998 0 0 1-.002-.975C.251 7.29 3.246 2 8 2c1.331 0 2.515.431 3.548 1.038L14.293.293a.999.999 0 1 1 1.414 1.414l-14 14a.997.997 0 0 1-1.414 0ZM2.18 8a12.603 12.603 0 0 0 2.06 2.347l1.833-1.834A1.925 1.925 0 0 1 6 8a2 2 0 0 1 2-2c.178 0 .348.03.512.074l1.566-1.566C9.438 4.201 8.742 4 8 4 5.146 4 2.958 6.835 2.181 8Z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="col-span-6 order-2 sm:order-none sm:col-span-3 text-left sm:text-center lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
          <div className="text-sm font-medium text-slate-800 truncate">
            {getFormattedDate(created)}
          </div>
        </div>
        <div className="col-span-6 order-2 sm:order-none sm:col-span-2 text-right lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
          <div className="text-xs inline-flex font-medium bg-emerald-100 text-emerald-600 rounded-full text-center px-2.5 py-1">
            Active
          </div>
        </div>
        <div className="col-span-6 order-2 sm:order-none sm:col-span-2 text-right lg:sidebar-expanded:hidden xl:sidebar-expanded:block">
          <button onClick={() => deleteTokens(token)}>
            <svg className="w-4 h-4 fill-current text-rose-500 shrink-0" viewBox="0 0 16 16">
              <path d="M5 7h2v6H5V7zm4 0h2v6H9V7zm3-6v2h4v2h-1v10c0 .6-.4 1-1 1H2c-.6 0-1-.4-1-1V5H0V3h4V1c0-.6.4-1 1-1h6c.6 0 1 .4 1 1zM6 2v1h4V2H6zm7 3H3v9h10V5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiToken;
