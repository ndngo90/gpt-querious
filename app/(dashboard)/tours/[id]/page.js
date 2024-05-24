import TourInfo from '@/components/TourInfo';
import { getSingleTour } from '@/utils/actions';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';

const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;

const SingleTourPage = async ({ params }) => {
  const tour = await getSingleTour(params.id);

  const { data } = await axios(`${url}${tour.city}`);
  const tourImage = data?.results[0]?.urls?.raw;
  if (!tour) {
    redirect('/tours');
  }
  return (
    <div>
      <Link href="/tours" className="btn btn-secondary mb-12">
        back to tours
      </Link>
      {tourImage ? (
        <div>
          <Image
            src={tourImage}
            width={300}
            height={300}
            className="rounded-xl shadow-xl mb-16 h-96 w-96 object-cover"
            alt={tour.title}
            priority
          />
        </div>
      ) : null}
      <TourInfo tour={tour} />
    </div>
  );
};
export default SingleTourPage;
