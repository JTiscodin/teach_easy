import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ThumbnailUploader({ getThumbnail }) {
  const fileRef = useRef();
  const [thumbnail, setThumbnail] = useState();
  const [previewURL, setPreviewURL] = useState("");

  useEffect(() => {
    getThumbnail(thumbnail);
  }, [thumbnail]);

  const uploadThumbnail = (e) => {
    e.preventDefault();
    fileRef.current.click();
  };

  const handleChange = (e) => {
    const files = e.target.files;

    if (files.length !== 0) {
      setThumbnail(files[0]);
      const url = URL.createObjectURL(files[0]);
      setPreviewURL(url);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-[30vw]">
      <input
        ref={fileRef}
        onChange={handleChange}
        type="file"
        id="thumbnail"
        className="hidden"
      />
      <Button className="w-[10vw]" onClick={uploadThumbnail}>
        Pick a thumbnail
      </Button>
      <div className=" w-auto h-auto overflow-hidden rounded-2xl bg-slate-900 ">
        <Image
          width={400}
          height={400}
          alt=""
          className="w-96 h-96 object-cover"
          src={previewURL}
        />
      </div>
    </div>
  );
}
