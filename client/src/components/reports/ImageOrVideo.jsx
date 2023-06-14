import { useEffect, useState } from "react";

const ImageOrVideo = ({ data }) => {
  const [video, setVideo] = useState(false);
  const [image, setImage] = useState(false);
  useEffect(() => {
    if (["mp4"].includes(data.split(".")[1])) {
      setVideo(true);
    } else if (["jpeg", "jpg", "png"].includes(data.split(".")[1])) {
      setImage(true);
    }
  }, []);
  return (
    <>
      {video && (
        <video
          controls
          className="imageVideo"
          src={`https://ilikemia.com/api/${data}`}
        />
      )}
      {image && (
        <img className="imageVideo" src={`https://ilikemia.com/api/${data}`} />
      )}
    </>
  );
};
export default ImageOrVideo;
