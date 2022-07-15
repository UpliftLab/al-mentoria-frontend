import { useState } from 'react';
import {
  FaFacebookF,
  FaGithub,
  FaHeart,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import {
  BiMenu,
  BiUserPlus,
  BiLogInCircle,
  BiLogOutCircle,
} from 'react-icons/bi';
import { DiReact, DiRor } from 'react-icons/di';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import NavbarLink from './NavbarLink';
import SocialLink from './SocialLink';
import userSlice from '../user/userSlice';

const Header = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { name, isLoggedIn, role } = useSelector((state) => state.user);
  const headerClasses = 'z-30 fixed lg:relative flex h-full w-52 flex-col border-r-2 border-gray-100 bg-white py-4 transition lg:translate-x-0';

  return (
    <header
      id="header"
      className={headerClasses + (open ? '' : ' -translate-x-52')}
    >
      <Link
        to="/"
        className="h-1/5 font-serif text-2xl font-bold text-center p-3"
      >
        <img
          src="/almentoria-full-logo.svg"
          className="w-24 m-auto"
          alt="al mentoria"
        />
      </Link>
      <nav className="flex grow flex-col pl-4">
        <ul className="flex flex-col">
          <li>
            <NavbarLink title="Mentors" to="/mentors" />
          </li>
          {isLoggedIn && (
            <li>
              <NavbarLink title="Reservations" to="/reservations" />
            </li>
          )}
          {role === 'admin' && (
            <>
              <li>
                <NavbarLink title="Add Mentor" to="/mentors/new" />
              </li>
              <li>
                <NavbarLink title="Topics" to="/topics" />
              </li>
              <li>
                <NavbarLink title="Add Topic" to="/topics/new" />
              </li>
            </>
          )}

          <li className="flex flex-col gap-1 mt-4 font-bold">
            {isLoggedIn ? (
              <>
                <p
                  className="px-4 text-xs font-normal items-center"
                  to="/signup"
                >
                  {`Signed in as ${name}!`}
                </p>
                <button
                  className="flex gap-4 pt-1 pb-3 px-4 items-center hover:text-red-600 transition-colors"
                  type="button"
                  onClick={() => {
                    dispatch(userSlice.actions.signOut());
                    toast.success('Successfully signed out');
                  }}
                >
                  <BiLogOutCircle />
                  <span>Sign out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  className="flex gap-4 py-3 px-4 items-center hover:text-lime-500 transition-colors"
                  title=""
                  to="/signin"
                >
                  <BiLogInCircle />
                  <span>Sign in</span>
                </Link>

                <Link
                  className="flex gap-4 py-3 px-4 items-center hover:text-lime-500 transition-colors"
                  to="/signup"
                >
                  <BiUserPlus />
                  <span>Sign up</span>
                </Link>
              </>
            )}
          </li>
        </ul>
      </nav>
      <div className="flex flex-col gap-1 items-center">
        <ul className="flex">
          <li>
            <SocialLink to="blah" icon={<FaTwitter className="w-4 h-4" />} />
          </li>
          <li>
            <SocialLink to="blah" icon={<FaFacebookF className="w-4 h-4" />} />
          </li>
          <li>
            <SocialLink to="blah" icon={<FaInstagram className="w-4 h-4" />} />
          </li>
          <li>
            <SocialLink to="blah" icon={<FaGithub className="w-4 h-4" />} />
          </li>
          <li>
            <SocialLink to="blah" icon={<FaYoutube className="w-4 h-4" />} />
          </li>
        </ul>
        <p className="text-xs flex items-center gap-1">
          <FaHeart title="Built with love" />
          +
          <DiRor title="Built with Rails" />
          +
          <DiReact title="Built with Reactjs" />
        </p>
      </div>
      <button
        id="menu-toggler"
        type="button"
        className="absolute top-0 p-2 -right-[3.125rem] bg-white/90 lg:hidden hover:text-lime-600"
        onClick={() => setOpen(!open)}
      >
        <BiMenu className="w-8 h-8" />
      </button>
    </header>
  );
};

export default Header;
