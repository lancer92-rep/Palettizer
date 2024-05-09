import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paletteAction, boxAction, patternAction } from "../redux/actions";

export default function ControlPanel() {
  const dispath = useDispatch();
  const palette = useSelector((state) => state.palette);
  const box = useSelector((state) => state.box);
  const pattern = useSelector((state) => state.pattern);
  const scale = useSelector((state) => state.scale);
  const [paletteWidth, setPaletteWidth] = useState(0);
  const [paletteHeight, setPaletteHeight] = useState(0);
  const [boxWidth, setBoxWidth] = useState(0);
  const [boxHeight, setBoxHeight] = useState(0);

  const setPalette = () => {
    dispath(paletteAction({ width: paletteWidth, height: paletteHeight }));
  };

  const setBox = () => {
    dispath(boxAction({ width: boxWidth, height: boxHeight }));
  };

  const checkOverlap = (rect1, rect2) => {
    if (rect1.x2 - 2 < rect2.x1 || rect1.x1 > rect2.x2 - 2) return true;
    if (rect1.y2 - 2 < rect2.y1 || rect1.y1 > rect2.y2 - 2) return true;
    return false;
  };

  const insertBox = () => {
    const rows = parseInt(palette.height / box.height);
    const cols = parseInt(palette.width / box.width);
    let stop = false;
    for (let row = 0; row < rows; row++) {
      if (stop) break;
      for (let col = 0; col < cols; col++) {
        const rect = {
          x1: parseInt(col * box.width * scale),
          y1: parseInt(row * box.height * scale),
          x2: parseInt((col + 1) * box.width * scale),
          y2: parseInt((row + 1) * box.height * scale),
        };
        const item = pattern.find(
          (item) =>
            !checkOverlap(rect, {
              x1: item.x,
              y1: item.y,
              x2: parseInt(
                item.x + (!item.rotate ? box.width : box.height) * scale
              ),
              y2: parseInt(
                item.y + (item.rotate ? box.width : box.height) * scale
              ),
            })
        );
        if (!item) {
          stop = true;
          const temp = [...pattern, { x: rect.x1, y: rect.y1, rotate: false }];
          dispath(patternAction(temp));
          break;
        }
      }
    }
  };

  useEffect(() => {
    if (palette) {
      setPaletteWidth(palette.width);
      setPaletteHeight(palette.height);
    }
    if (box) {
      setBoxWidth(box.width);
      setBoxHeight(box.height);
    }
  }, [box, palette]);

  return (
    <div className="control-panel">
      <div className="input-group">
        <label>Palette size</label>
        <input
          type="number"
          value={paletteWidth}
          onChange={(e) => setPaletteWidth(Number(e.target.value))}
        />
        X
        <input
          type="number"
          value={paletteHeight}
          onChange={(e) => setPaletteHeight(Number(e.target.value))}
        />
        <button type="button" onClick={setPalette}>
          Change
        </button>
      </div>
      <div className="input-group">
        <label>Box size</label>
        <input
          type="number"
          value={boxWidth}
          onChange={(e) => setBoxWidth(Number(e.target.value))}
        />
        X
        <input
          type="number"
          value={boxHeight}
          onChange={(e) => setBoxHeight(Number(e.target.value))}
        />
        <button type="button" onClick={setBox}>
          Change
        </button>
      </div>
      <div className="input-group">
        <button type="button" onClick={insertBox}>
          Weiteres Paket
        </button>
      </div>
      <div className="result">{JSON.stringify(pattern)}</div>
    </div>
  );
}
