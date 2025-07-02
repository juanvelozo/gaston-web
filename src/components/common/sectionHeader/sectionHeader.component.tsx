import { DollarCircle, Home, List, Plus, UserCircle } from 'iconoir-react';
import { Button } from '../../animated/button/Button.component';
import { PrivateRouteConfig, PrivateRoutesType } from '../../navigation/Navbar/Navbar.component';
import { useNavigate } from 'react-router-dom';

const SectionHeader = ({ bgColor, left, right, title }: ISectionHeader): React.JSX.Element => {
  const navigate = useNavigate();
  return (
    <div>
      <div className={`bg-[${bgColor}] p-6 rounded-b-3xl`}>
        <div className="flex gap-2 justify-between items-center my-4">
          {left}
          <div className="flex gap-2 items-center">
            <h1 className="text-3xl font-bold text-white">{title}</h1>
          </div>
          {right}
        </div>
      </div>
    </div>
  );
};
interface ISectionHeader {
  bgColor?: string;
  title?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export default SectionHeader;
