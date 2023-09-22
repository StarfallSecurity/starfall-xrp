import React, { useMemo, useState } from 'react';

import useUser from '../../hooks/useUser';
import Image from '../../images/user-avatar-80.png';
import { NavLink } from 'react-router-dom';

const AccountPanel: React.FC = () => {
  const { data: userData, isLoading } = useUser();

  const { username } = userData || {};

  const userInfo = useMemo(() => {
    return [
      { label: 'Username', value: username },
      { label: 'Email', value: username },
      { label: 'Created At', value: '' },
      { label: 'Last Login', value: '' }
    ];
  }, [userData]);

  const renderUserInfo = () => {
    return userInfo.map((item, index) => {
      return (
        <li
          key={`${item.label}-${index}`}
          className="md:flex md:justify-between md:items-center py-3 border-b border-slate-200"
        >
          {/* Left */}
          <div className="text-sm text-slate-800 font-medium">{item.label}</div>
          {/* Right */}
          <div className="text-sm text-slate-800ml-4">
            <span className="mr-3">{item.value}</span>
            {/* <a className="font-medium text-indigo-500 hover:text-indigo-600" href="#0">
              Edit
            </a> */}
          </div>
        </li>
      );
    });
  };

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="grow">
      {/* Panel body */}
      <div className="p-6 space-y-6">
        <h2 className="text-2xl text-slate-800 font-bold mb-5">My Account</h2>
        {/* Picture */}
        <section>
          <div className="flex items-center">
            <div className="mr-4">
              <img
                className="w-20 h-20 rounded-full"
                src={Image}
                width="80"
                height="80"
                alt="User upload"
              />
            </div>
            {/* <button className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white">Change</button> */}
          </div>
        </section>
        <ul>
          {renderUserInfo()}
          <li className="md:flex md:justify-between md:items-center py-3 border-b border-slate-200">
            {/* Left */}
            <div className="text-sm text-slate-800 font-medium">API Tokens</div>
            {/* Right */}
            <div className="text-sm text-slate-800ml-4">
              <NavLink
                end
                to="/dashboard/api-tokens"
                className={`flex items-center px-2.5 py-2 rounded whitespace-nowrap bg-indigo-50`}
              >
                View
              </NavLink>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AccountPanel;
