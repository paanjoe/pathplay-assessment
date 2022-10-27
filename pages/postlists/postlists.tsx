
import Image from "next/image";
import { Player } from '@lottiefiles/react-lottie-player';

const fetchImage = async () => {
  
}

function Postlists(fakeText) {
  return (
    <div className="flex flex-col items-center pt-10 pb-2">
      <a
        href={`postlists/${fakeText.id}`}
        className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          ID: { fakeText.id }
        </h5>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Album ID: { fakeText.userProfileId }
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          { fakeText.title }
        </p>
        <h3 className="text-xl pt-5 pb-5 text-yellow-400">Image...</h3>
        <div>
          <Image
          src={fakeText.url}
          alt={"Sample Picture"}
          width={800}
          height={800}
          ></Image>
        </div>
        <h3 className="text-xl pt-5 pb-5 text-yellow-400">Lottie Files with Player...</h3>
        <Player src="https://assets1.lottiefiles.com/packages/lf20_myejiggj.json"
        loop
        autoplay
        />
      </a>
    </div>
  );
}

export default Postlists;
