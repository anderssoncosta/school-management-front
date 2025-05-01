import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  DocumentDuplicateIcon,
  FolderIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, Outlet, useLocation } from "react-router-dom";

const navigation = [
  { name: "Matriculas", href: "/", icon: DocumentDuplicateIcon, current: true },
  { name: "Cursos", href: "/cursos", icon: FolderIcon, current: false },
  { name: "Alunos", href: "/alunos", icon: UsersIcon, current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Fechar Sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    alt="Logo School Management"
                    src="/gestor_cursos.png"
                    className="h-8 w-auto"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => {
                          const isActive = item.href === location.pathname;

                          return (
                            <li key={item.name}>
                              <Link
                                to={item.href}
                                className={classNames(
                                  isActive
                                    ? "bg-gray-50 text-blue-600"
                                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600",
                                  "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                )}
                              >
                                <item.icon
                                  aria-hidden="true"
                                  className={classNames(
                                    isActive
                                      ? "text-blue-600"
                                      : "text-gray-400 group-hover:text-blue-600",
                                    "size-6 shrink-0"
                                  )}
                                />
                                {item.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
            <div className="flex justify-center h-50 shrink-0 items-center">
              <img
                alt="Logo School Management"
                src="/gestor_cursos.png"
                className="h-50 w-50 rounded-full mt-4"
              />
            </div>
            <div className="border-b border-gray-200 px-2" />
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => {
                      const isActive = item.href === location.pathname;

                      return (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            className={classNames(
                              isActive
                                ? "bg-gray-50 text-blue-600"
                                : "text-gray-700 hover:bg-gray-50 hover:text-blue-600",
                              "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className={classNames(
                                isActive
                                  ? "text-blue-600"
                                  : "text-gray-400 group-hover:text-blue-600",
                                "size-6 shrink-0"
                              )}
                            />
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-xs sm:px-6 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
          <div className="flex-1 text-sm/6 font-semibold text-gray-900">
            Dashboard
          </div>
        </div>

        <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
