import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { patternAction } from "../redux/actions";
import Box from "./Box";

const PaletteEditor = ({ width, height, pattern, scale }) => {
  const dispath = useDispatch();
  const box = useSelector((state) => state.box);
  const palette = useSelector((state) => state.palette);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentItemIndex, setCurrentItemIndex] = useState(-1);

  const isOverlapPoint = (x, y, rect) => {
    if (
      x >= rect.x1 + 2 &&
      x <= rect.x2 - 2 &&
      y >= rect.y1 + 2 &&
      y <= rect.y2 - 2
    )
      return true;
    return false;
  };

  const checkError = (n) => {
    const x1 = pattern[n].x;
    const y1 = pattern[n].y;
    const x2 = parseInt(
      x1 + (!pattern[n].rotate ? box.width : box.height) * scale
    );
    const y2 = parseInt(
      y1 + (pattern[n].rotate ? box.width : box.height) * scale
    );
    const item1 = pattern.find(
      (item, index) =>
        index !== n &&
        isOverlapPoint(x1, y1, {
          x1: item.x,
          y1: item.y,
          x2: parseInt(
            item.x + (!item.rotate ? box.width : box.height) * scale
          ),
          y2: parseInt(item.y + (item.rotate ? box.width : box.height) * scale),
        })
    );
    const item2 = pattern.find(
      (item, index) =>
        index !== n &&
        isOverlapPoint(x1, y2, {
          x1: item.x,
          y1: item.y,
          x2: parseInt(
            item.x + (!item.rotate ? box.width : box.height) * scale
          ),
          y2: parseInt(item.y + (item.rotate ? box.width : box.height) * scale),
        })
    );
    const item3 = pattern.find(
      (item, index) =>
        index !== n &&
        isOverlapPoint(x2, y1, {
          x1: item.x,
          y1: item.y,
          x2: parseInt(
            item.x + (!item.rotate ? box.width : box.height) * scale
          ),
          y2: parseInt(item.y + (item.rotate ? box.width : box.height) * scale),
        })
    );
    const item4 = pattern.find(
      (item, index) =>
        index !== n &&
        isOverlapPoint(x2, y2, {
          x1: item.x,
          y1: item.y,
          x2: parseInt(
            item.x + (!item.rotate ? box.width : box.height) * scale
          ),
          y2: parseInt(item.y + (item.rotate ? box.width : box.height) * scale),
        })
    );
    if (item1 || item2 || item3 || item4) return true;
    return false;
  };

  const handleRotate = (n) => {
    const temp = [...pattern];
    temp[n].rotate = !temp[n].rotate;
    dispath(patternAction(temp));
  };

  const handleDragStart = (e) => {
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    const x = pattern[currentItemIndex].x - startPos.x + e.clientX;
    const y = pattern[currentItemIndex].y - startPos.y + e.clientY;
    setStartPos({ x: e.clientX, y: e.clientY });
    const temp = [...pattern];
    temp[currentItemIndex].x = x;
    temp[currentItemIndex].y = y;
    dispath(patternAction(temp));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const x0 = pattern[currentItemIndex].x;
    const y0 = pattern[currentItemIndex].y;
    const temp = [...pattern];
    if (x0 > palette.width * scale) {
      temp.splice(currentItemIndex, 1);
      dispath(patternAction(temp));
      return;
    }
    if (checkError(currentItemIndex)) return;
    const w = parseInt(box.width * scale);
    const h = parseInt(box.height * scale);
    const x1 = parseInt(x0 / w) * w;
    const y1 = parseInt(y0 / h) * h;
    const x2 = parseInt(x0 / h) * h;
    const y2 = parseInt(y0 / w) * w;
    const x = x0 - x1 > x0 - x2 ? x2 : x1;
    const y = y0 - y1 > y0 - y2 ? y2 : y1;
    if (x0 > palette.width * scale) {
      temp.splice(currentItemIndex, 1);
      dispath(patternAction(temp));
    } else {
      temp[currentItemIndex].x = x > 0 ? x : 0;
      temp[currentItemIndex].y = y > 0 ? y : 0;
      dispath(patternAction(temp));
    }
  };

  return (
    <div className="palette-container">
      <div
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="palette"
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        {pattern.map((item, index) => (
          <Box
            key={index}
            top={item.y}
            left={item.x}
            width={
              !item.rotate
                ? parseInt(box.width * scale - 10)
                : parseInt(box.height * scale - 10)
            }
            height={
              item.rotate
                ? parseInt(box.width * scale - 10)
                : parseInt(box.height * scale - 10)
            }
            onClick={() => handleRotate(index)}
            onDragStart={() => setCurrentItemIndex(index)}
            error={checkError(index)}
            text={`${Math.round(
              item.x / scale + (!item.rotate ? box.width : box.height) / 2 + 0.4
            )}, ${Math.round(
              item.y / scale + (item.rotate ? box.width : box.height) / 2 + 0.4
            )}`}
          />
        ))}
      </div>
    </div>
  );
};

PaletteEditor.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  pattern: PropTypes.array.isRequired,
  scale: PropTypes.number.isRequired,
};

export default PaletteEditor;
