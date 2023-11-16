"use client";
import useSearchModal from "@/app/hooks/useSearchModal";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const searchModal = useSearchModal();

  return (
    <div
      onClick={searchModal.open}
      className=" border-[1px] w-full md:w-auto py-2 rounded-md shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">Where?</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
          When?
        </div>
        <div className="flex flex-row text-sm pl-6 pr-2 items-center gap-3">
          <div className="hidden sm:block font-semibold">Headcount?</div>
          <div className="p-2 bg-[#01BAEF] rounded-md text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
