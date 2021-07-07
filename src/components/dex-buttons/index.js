import { Col, ButtonGroup, Button } from "react-bootstrap";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setActiveDex } from "../../redux/dex";
import "./index.scss";

const DesktopDexes = () => {
  const { dexes, selectedDex } = useSelector((state) => state.dexes);
  const dispatch = useDispatch();

  return (
    <Col>
      <ButtonGroup className="mb-2 action-btns">
        {dexes.map((dex) => (
          <Button
            key={dex.id}
            id={dex.id === selectedDex ? "active-btn" : ""}
            onClick={() => dispatch(setActiveDex({ selectedDex: dex.id }))}
          >
            {dex.name}
          </Button>
        ))}
      </ButtonGroup>
    </Col>
  );
};

export const MobileDexes = () => {
  const { dexes, selectedDex } = useSelector((state) => state.dexes);
  const dispatch = useDispatch();

  return (
    <ButtonGroup className="mobile-action-btns">
      {dexes.map((dex) => (
        <Button
          key={dex.id}
          id={dex.id === selectedDex ? "active-btn" : ""}
          onClick={() => dispatch(setActiveDex({ selectedDex: dex.id }))}
        >
          {dex.name}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default DesktopDexes;
