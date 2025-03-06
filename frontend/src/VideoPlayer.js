import React from "react";

const VideoPlayer = ({ link, title }) => {
  let embedUrl = "";

  if (link.includes("vkvideo.ru")) {
    const url = new URL(link);
    const videoId = url.pathname.split("/video-")[1];

    if (videoId) {
      embedUrl = `https://vk.com/video_ext.php?oid=-${videoId.split("_")[0]}&id=${videoId.split("_")[1]}&hd=2`;
    }
  }

  return embedUrl ? (
    <iframe
      width="640"
      height="360"
      src={embedUrl}
      frameBorder="0"
      allowFullScreen
      title={title}
    ></iframe>
  ) : (
    <a href={link} target="_blank" rel="noopener noreferrer">
      Смотреть видео
    </a>
  );
};

export default VideoPlayer;

