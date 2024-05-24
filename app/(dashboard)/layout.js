import Sidebar from '@/components/SideBar';
import { FaBarsStaggered } from 'react-icons/fa6';

export const metadata = {
  title: 'GPTQuerious Dashboard',
  description: 'GPTQuerious Dashboard'
};

export default function layout({ children }) {
  return (
    <main className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <label
          htmlFor="my-drawer-2"
          className="drawer-button lg:hidden fixed top-6 right-4 "
        >
          <FaBarsStaggered className="w-8 h-8" />
        </label>
        <div className="px-8 py-12 min-h-screen bg-base-200">{children}</div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <Sidebar />
      </div>
    </main>
  );
}
