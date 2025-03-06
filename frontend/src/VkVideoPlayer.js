import React from 'react';

const VkVideoPlayer = ({ link }) => {
  const getVideoId = (url) => {
    const match = url.match(/video(-?\d+_\d+)/);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(link);
  
  if (!videoId) {
    return <p>Ошибка: Неверная ссылка на видео</p>;
  }

  return (
    <iframe
      src={`https://vk.com/video_ext.php?oid=${videoId.split('_')[0]}&id=${videoId.split('_')[1]}&hd=2`}
      width="400"
      height="300"
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen
      title={`VK Video ${videoId}`}
    />
  );
};

export default VkVideoPlayer;
