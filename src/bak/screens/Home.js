import React from 'react';
import { useMachine } from '@xstate/react';
import { Link } from 'react-router-dom';

////////////////////////////////////////////////////////////////////////////////////////////////////

import { restauranReviewSiteMachine } from '../review-restaurant-site-machine';

////////////////////////////////////////////////////////////////////////////////////////////////////

import { ReactComponent as MainImage } from '../main.svg';

////////////////////////////////////////////////////////////////////////////////////////////////////

function Home({ machine }) {
  const [current, send] = machine;

  React.useEffect(() => {
    send('REQUEST');

    return () => send('CANCEL');
  }, [send]);

  return (
    <div className="w-full h-screen">
      <div className="flex flex-col w-full h-full">
        <div className="flex-1">
          <div className="w-full h-full p-6">
            <MainImage className="w-full h-auto" />
            <div className="text-4xl font-bold leading-none text-center my-8">
              Find the best restaurants, cafés, and bars
            </div>
            <p className="text-center mb-8">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus officiis magnam
              facilis praesentium maiores architecto maxime? Debitis impedit soluta voluptatem
              distinctio, velit numquam alias inventore et ea itaque similique illo!
            </p>
            <div className="text-center">
              {false ? (
                <Link to="/places">
                  <button
                    className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 border-b-4 border-indigo-700 hover:border-indigo-500 rounded"
                    type="button"
                    onClick={() => {}}
                  >
                    Go to the Searcher
                  </button>
                </Link>
              ) : (
                <button
                  className="bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-2 px-4 border-b-4 border-indigo-700 hover:border-indigo-500 rounded"
                  type="button"
                  onClick={() => {}}
                >
                  Use my location
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;