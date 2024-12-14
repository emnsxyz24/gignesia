import penIcon from "../assets/icons/pen.png";
import webIcon from "../assets/icons/webprog.png";
import videoIcon from "../assets/icons/video-editor.png";
import voiceIcon from "../assets/icons/voice-over.png";

const LandingPagecard = () => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <div className="flex text-center justify-center items-center w-[20rem] bg-[#F2F2F2] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img className="rounded-t-lg mx-auto p-5" src={penIcon} alt="" width={180} />
          <div className="p-5">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Design Grafis
            </h5>
          </div>
        </a>
      </div>
      <div className="flex text-center justify-center items-center w-[20rem] bg-[#F2F2F2] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img className="rounded-t-lg mx-auto p-5" src={webIcon} alt="" width={180} />
          <div className="p-5">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Website & Pemrograman
            </h5>
          </div>
        </a>
      </div>
      <div className="flex text-center justify-center items-center w-[20rem] bg-[#F2F2F2] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img className="rounded-t-lg mx-auto p-5" src={videoIcon} alt="" width={180} />
          <div className="p-5">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Video Editor
            </h5>
          </div>
        </a>
      </div>
      <div className="flex text-center justify-center items-center w-[20rem] bg-[#F2F2F2] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img className="rounded-t-lg mx-auto p-5" src={voiceIcon} alt="" width={180} />
          <div className="p-5">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Voice Over
            </h5>
          </div>
        </a>
      </div>
    </div>
  );
};
export default LandingPagecard;
