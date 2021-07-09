import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import pair from "../../../assets/images/pair.svg";
import { LpTokenIconView } from "../../token-selector";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedLpTokenPair } from "../../../redux/unwrap";
import Dexes, { MobileDexes } from "../../dex-buttons";

import { constants } from "../../../utils";

const SelectLpToken = (props) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
  });

  if (width < constants.width.mobile) return <MobileWrapper {...props} />;
  return <DesktopWrapper {...props} />;
};

const DesktopWrapper = ({ lpTokenPairs }) => {
  const { dexes, selectedDex } = useSelector((state) => state.dexes);
  const dexName = dexes[selectedDex].name;
  return (
    <>
      <div className="main-wrapper-header ">
        <span className="main-header-text">Remix LP Tokens</span>
        <span className="remix-dex">
          Your <span className="dex-name">{dexName}</span> LP Tokens
          <span className="remix-dex-btns">
            <Dexes />
          </span>
        </span>
      </div>
      <div className="main-wrapper-interface">
        <div className="input-token-section">
          <div className="token-label">Select LP Tokens to Remix</div>
          <div>
            {lpTokenPairs.map((pair, idx) => (
              <DesktopLpTokens lpPair={pair} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const MobileWrapper = ({ lpTokenPairs }) => {
  return (
    <div className="main-wrapper-interface">
      <div className="input-token-section">
        <div className="token-label">Select LP Tokens to Remix</div>
        <MobileDexes />
        <div>
          {lpTokenPairs.map((pair, idx) => (
            <MobileLpTokens lpPair={pair} idx={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

const DesktopLpTokens = ({ lpPair, idx }) => {
  const dispatch = useDispatch();
  const { lpToken1, lpToken2 } = lpPair;
  const lpPairName = lpToken1.tokenSymbol + "/" + lpToken2.tokenSymbol;
  const { dexes, selectedDex } = useSelector((state) => state.dexes);
  const dexName = dexes[selectedDex].name;
  return (
    <Row
      className="remix-row"
      onClick={() => {
        dispatch(
          setSelectedLpTokenPair({
            selectedLpTokenPair: idx,
            selectedDex: selectedDex,
          })
        );
      }}
    >
      <Col className="remix-tokens">
        <LpTokenIconView tokenIcon={lpToken1.tokenIcon} tokenIconSize={45} />
        <img
          className="remix-pair-icon"
          src={pair}
          width="16"
          height="16"
          alt="pair"
        />
        <LpTokenIconView tokenIcon={lpToken2.tokenIcon} tokenIconSize={45} />
      </Col>
      <Col>
        <div className="remix-pair-text">{lpPairName}</div>
        <div className="remix-pair-dex">4.5324 {dexName} LP Tokens</div>
      </Col>
      <Col className="remix-pair-amount">$4,623.42</Col>
    </Row>
  );
};

const MobileLpTokens = ({ lpPair, idx }) => {
  const dispatch = useDispatch();
  const { lpToken1, lpToken2 } = lpPair;
  const lpPairName = lpToken1.tokenSymbol + "/" + lpToken2.tokenSymbol;
  const { dexes, selectedDex } = useSelector((state) => state.dexes);
  const dexName = dexes[selectedDex].name;
  return (
    <Row
      className="remix-row"
      onClick={() => {
        dispatch(
          setSelectedLpTokenPair({
            selectedLpTokenPair: idx,
            selectedDex: selectedDex,
          })
        );
      }}
    >
      <Col className="remix-tokens">
        <LpTokenIconView tokenIcon={lpToken1.tokenIcon} tokenIconSize={45} />
        <img
          className="remix-pair-icon"
          src={pair}
          width="16"
          height="16"
          alt="pair"
        />
        <LpTokenIconView tokenIcon={lpToken2.tokenIcon} tokenIconSize={45} />
      </Col>
      <Col>
        <div className="remix-pair-text">{lpPairName}</div>
        <div className="remix-pair-amount">$4,623.42</div>
      </Col>
      <Col className="remix-pair-dex">4.5324 {dexName} LP Tokens</Col>
    </Row>
  );
};
export default SelectLpToken;
