import { Fragment, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { AUTH_USER_TOKEN_KEY, ENDPOINT_USERS } from '../utils/constants'
import instance from '../utils/axios'

function Navbar() {
  const navigate = useNavigate()

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
  }
  const handleLogout = () => {
    Auth.signOut({ global: true })
      .then(() => {
        localStorage.removeItem(AUTH_USER_TOKEN_KEY)
        navigate("/signin")
      }).catch((error) => {
        console.error("error", error.message)
      })
  }

  const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }

  const navigation = [
    { id: '1', name: 'Dashboard', path: '/dashboard', current: true },
    { id: '2', name: 'Transactions', path: '/transactions', current: false },
    { id: '3', name: 'Accounts', path: '/accounts', current: false },
  ]

  const userNavigation = [
    { id: '1', name: 'Your Profile', href: '#', action: undefined },
    { id: '2', name: 'Settings', href: '#', action: undefined },
    { id: '3', name: 'Sign out', href: '#', action: handleLogout },
  ]

  useEffect(() => {
    async function getCurrentUser() {
      const user = await Auth.currentUserInfo()
      return user.attributes.email
    }

    getCurrentUser().then((email) => {
      instance.get(ENDPOINT_USERS, { params: { email } })
        .then((response) => {
          if (response.status === 200) {
            console.log('response:', response.data)
            return response.data
          }
        })
    })
  }, [])

  return (
    <>
      <Disclosure as="nav" className="bg-indigo-800">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=500"
                      alt="Workflow"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <>
                          <NavLink
                            key={item.id}
                            to={item.path}
                            className={classNames(
                              item.current
                                ? 'bg-indigo-900 text-yellow-500'
                                : 'text-yellow-300 hover:bg-indigo-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </NavLink>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="bg-indigo-800 p-1 rounded-full text-indigo-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="max-w-xs bg-indigo-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.id}>
                              {({ active }) => (
                                <a
                                  onClick={item.action}
                                  href={item.path}
                                  className={classNames(
                                    active ? 'bg-indigo-100' : '',
                                    'block px-4 py-2 text-sm text-indigo-700'
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-indigo-800 inline-flex items-center justify-center p-2 rounded-md text-indigo-400 hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.id}
                    as="a"
                    href={item.path}
                    className={classNames(
                      item.current ? 'bg-indigo-900 text-white' : 'text-indigo-300 hover:bg-indigo-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-indigo-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">{user.name}</div>
                    <div className="text-sm font-medium leading-none text-indigo-400">{user.email}</div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto bg-indigo-800 flex-shrink-0 p-1 rounded-full text-indigo-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-800 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      onClick={item.action}
                      key={item.id}
                      as="a"
                      href={item.path}
                      className="block px-3 py-2 rounded-md text-base font-medium text-indigo-400 hover:text-white hover:bg-indigo-700"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Outlet />
    </>
  );
}

export default Navbar;