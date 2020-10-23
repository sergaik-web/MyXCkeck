import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import Auth from '../../Components/Auth/Auth';
import Navbar from './Navbar/Navbar';
import Header from '../../Components/Header/Header';
import './Main.scss';
import { setUserTimer } from '../../Actions/Actions';

// const Main: React.FC = (state) => {
// const { userName }: any = state;

// if (!userName) {
//   return <Auth />;
// }
interface mainProps {
  timer: string;
  setUserTimer: any;
}

const Main: React.FC<mainProps> = (props) => {
  // eslint-disable-next-line no-shadow
  const { timer, setUserTimer } = props;
  const [isWalk, setIsWalk] = useState(false);

  useEffect(() => {
    const checkedStorage = localStorage.getItem('timer');
    if (!checkedStorage) {
      localStorage.setItem('timer', timer);
    } else {
      setUserTimer(localStorage.getItem('timer'));
    }
  }, []);

  useEffect(() => {
    let myTimer: number | NodeJS.Timeout | undefined;
    const setTimeInStore = () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [day, hour, min, sec] = timer.split(':').map((item) => +item);
    };
    if (isWalk) {
      myTimer = setInterval(setTimeInStore, 1000);
    }
    return () => clearInterval(myTimer as NodeJS.Timeout);
  }, [isWalk, setUserTimer]);

  const clickHendler = () => {
    if (isWalk) {
      localStorage.setItem('timer', timer);
    }
    setIsWalk(!isWalk);
  };

  return (
    <div className="main">
      <Header />
      <div className="main-content">
        <div className="ant-row" style={{ margin: '0 -12px' }}>
          <div
            className="ant-col ant-col-xs-24 ant-col-sm-12 ant-col-md-10 ant-col-lg-8"
            style={{ padding: '0 12px', marginBottom: '15px' }}
          >
            <Navbar />
            <div>
              <h1>{`Timer: ${timer}`}</h1>
              <button style={{ padding: '10px' }} onClick={clickHendler} onKeyDown={clickHendler}>
                {isWalk ? 'End Walk' : 'I Walk'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state: any) {
  return {
    timer: state.timer,
  };
}

const mapDispatchToProps = { setUserTimer };

export default connect(mapStateToProps, mapDispatchToProps)(Main);
