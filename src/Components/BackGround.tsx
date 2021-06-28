import useSWR from 'swr';
import withSuspense from '../Util/withSuspense';

interface ImageOfTheDayResponse {
  images: {
    url: string;
    urlbase: string;
    copyright: string;
    copyrightlink: string;
  }[];
}

const transitionStyle = {
  transition: 'background 0.2s ease-in-out',
};

const useImageOfTheDay = () => {
  const oldValueString = localStorage.getItem('image-of-the-day');
  const oldValue = oldValueString ? JSON.parse(oldValueString) : undefined;
  const { data, error } = useSWR<ImageOfTheDayResponse>(
    `/api/image-of-the-day?count=1`,
    {
      refreshInterval: 6 * 60 * 1000,
      revalidateOnFocus: false,
      suspense: true,
      initialData: oldValue,
      revalidateOnMount: true,
    },
  );
  if (data && data !== oldValue) {
    localStorage.setItem('image-of-the-day', JSON.stringify(data));
  }
  const suffix =
    Math.min(window.screen.width, window.screen.height) >= 768
      ? '_1920x1080.jpg'
      : '_768x1366.jpg';
  const image = data?.images[0];
  const result = {
    ...image,
    url: image?.urlbase
      ? `https://www.bing.com/${image.urlbase}${suffix}`
      : undefined,
  };

  return {
    result: result,
    isLoading: !error && !data,
    isError: error,
  };
};

const BackgroundImage = () => {
  const {
    result: { url },
  } = useImageOfTheDay();
  return (
    <div
      className="bg-center bg-cover fixed bottom-0 left-0 top-0 right-0 transition"
      style={
        url
          ? { backgroundImage: `url(${url})`, ...transitionStyle }
          : { ...transitionStyle }
      }></div>
  );
};

export default withSuspense(BackgroundImage, false);
