"use client";

import { useState } from "react";

import { fakeCourseData } from "@/lib/fakeData";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

export default function SearchBar({ className }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <Popover  open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={className} asChild>
        <Button
          onBlur={() => {
            setValue("");
          }}
          variant="outline"
          aria-expanded={open}
          className={` min-w-[200px]`}
        >
          {value
            ? fakeCourseData.find((e) => e.title.toLowerCase() === value)?.title
            : "Search.."}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder="Seach for courses" />
          <CommandEmpty>No Courses found</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-[30vh]">
              {fakeCourseData.map((e, i) => {
                return (
                  <CommandItem
                    value={e.title}
                    key={i}
                    onSelect={(currentValue) => {
                      console.log(currentValue);
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <div>{e.title}</div>
                  </CommandItem>
                );
              })}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>

    // <Command className="rounded-lg border shadow-md h-[30vh] my-2 mx-5">
    //   <CommandInput placeholder="Type" />
    //   <CommandList>
    //     <CommandEmpty>No results found.</CommandEmpty>

    //     {fakeCourseData.map((each, i) => {
    //       return (
    //         <CommandItem key={i}>
    //           {" "}
    //           <div>{each.title}</div>
    //         </CommandItem>
    //       );
    //     })}
    //   </CommandList>
    // </Command>
  );
}
