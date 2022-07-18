import AddTopicForm from '../features/topics/AddTopicFrom';
import Topics from '../features/topics/Topics';

const TopicsPage = () => (
  <section className="relative flex flex-col p-12 gap-6 justify-start w-full h-full bg-lime-600">
    <AddTopicForm />
    <Topics />
  </section>
);

export default TopicsPage;
