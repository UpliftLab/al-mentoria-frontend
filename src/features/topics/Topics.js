import Topic from './Topic';

const Topics = () => {
  let topicsArr = new Array(10).fill(0);
  topicsArr = topicsArr.map((_, i) => [i, `Topic ${i}`]);

  return (
    <div>
      {
        topicsArr.map(([topic, i]) => (
          <Topic key={i} text={topic} />
        ))
      }
    </div>
  );
};

export default Topics;
