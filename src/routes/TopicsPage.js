import AddTopicForm from '../features/topics/AddTopicFrom';
import Topics from '../features/topics/Topics';

const TopicsPage = () => (
  <section className="relative flex flex-col p-4 sm:p-12 gap-12 justify-start w-full min-h-full bg-lime-600">
    <AddTopicForm />
    <Topics />
  </section>
);

export default TopicsPage;
