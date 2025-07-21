import ButtonExamples from '../../../components/animated/button/Button.demo';
import TostaditaDemo from '../../../components/animated/toast/customToast.demo';
import Card from '../../../components/common/Card/Card.component';

const Playground = ({}: IPlayground): React.JSX.Element => {
  return (
    <div className="space-y-6 p-5">
      <h1 className="text-3xl font-bold">Playground</h1>
      <Card title="Botones" body={<ButtonExamples />} />
      <Card title="Tostadita" body={<TostaditaDemo />} />
    </div>
  );
};
interface IPlayground {}

export default Playground;
