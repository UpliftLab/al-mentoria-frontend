import Button from '../features/button/Button';
import DirectionalButton from '../features/button/DirectionalButton';

const Mentors = () => (
  <div className="bg-lime-500">
    Mentors Page
    <Button onClick={() => {}} child="Meow" isWhite />
    <DirectionalButton left onClick={() => {}} />
  </div>
);

export default Mentors;
