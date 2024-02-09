import SearchBar from "./SearchBar";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Navbar() {
  return (
    <div className=" w-full flex flex-col">
      <div className="flex justify-end items-center gap-5 m-5">
        <SearchBar className="shadow-xl hover:scale-105 duration-150"/>
        <Avatar className="border-2 border-black h-[7vh] w-auto shadow-xl">
            <AvatarImage src="https://picsum.photos/200"></AvatarImage>
            <AvatarFallback>Image</AvatarFallback>

        </Avatar>
      </div>
      <Separator className="w-full my-2" />
    </div>
  );
}
