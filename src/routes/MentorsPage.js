import MentorsList from '../features/mentors/mentorsList';

const Mentors = () => (
  <section className="w-full h-full flex flex-col justify-center">
    <h1 className="text-3xl font-bold uppercase text-black text-center">
      Our Mentors
    </h1>
    <p className="text-center text-gray-400 font-bold">
      Choose a mentor to see details and reserve an appointment
    </p>

    <hr className="mx-auto border-t-4 border-dotted w-32 my-8" />

    <div className="grid place-content-center">
      <MentorsList />
    </div>
  </section>
);

export default Mentors;
