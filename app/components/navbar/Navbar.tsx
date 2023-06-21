import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
        py-4
        border-b-[1px]
        "
      >
        <Container>
          <div className="flex relative flex-col items-center justify-between gap-5">
            <div className="flex flex-row items-center">
              <Logo />
            </div>
            <Search />
            <div className="absolute right-0">
              <UserMenu />
            </div>
          </div>
          {/* <div className="flex flex-row items-center justify-between gap-3 md:gap-0"></div> */}
        </Container>
      </div>
    </div>
  );
};
export default Navbar;
