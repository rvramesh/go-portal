import withSuspense from '../../Util/withSuspense';
import useImageOfTheDay from './useImageOfTheDay';

const transitionStyle = {
  transition: 'background 0.2s ease-in-out',
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
