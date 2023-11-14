"use client";

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  console.log(currentUser);
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
        py-4
        border-b-[1px]
        "
      >
        <Container>
          <div className="flex relative flex-col items-center justify-between gap-4">
            <div className="flex flex-row items-center">
              <Logo />
            </div>
            <Search />
            <div className="absolute right-0">
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
          {/* <div className="flex flex-row items-center justify-between gap-3 md:gap-0"></div> */}
        </Container>
      </div>
    </div>
  );
};
export default Navbar;
