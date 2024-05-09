import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaletteEditor from "../components/PaletteEditor";
import ControlPanel from "../components/ControlPanel";
import { patternAction, scaleAction } from "../redux/actions";

export default function TopPage() {
  const dispath = useDispatch();
  const pattern = useSelector((state) => state.pattern);
  const palette = useSelector((state) => state.palette);
  const box = useSelector((state) => state.box);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [boxPattern, setBoxPattern] = useState([]);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const x = 0;
    const y = parseInt((palette.height - box.height) * scale);
    const boxList = [{ x, y, rotate: false }];
    dispath(patternAction(boxList));
  }, [box, dispath, palette, scale]);

  useEffect(() => {
    if (pattern) setBoxPattern([...pattern]);
  }, [pattern]);

  useEffect(() => {
    if (palette) {
      const scaleOfPalette = palette.height / palette.width;
      const scaleOfWindow = (window.innerHeight * 2) / window.innerWidth;
      let scale = 1;
      if (scaleOfPalette > scaleOfWindow) {
        scale = (window.innerHeight - 20) / palette.height;
        setWidth(palette.width * scale);
        setHeight(window.innerHeight - 20);
      } else {
        scale = (window.innerWidth / 2 - 20) / palette.width;
        setWidth(window.innerWidth / 2 - 20);
        setHeight(palette.height * scale);
      }
      setScale(scale);
      dispath(scaleAction(scale));
    }
  }, [dispath, palette]);

  return (
    <div className="container">
      <PaletteEditor
        width={width}
        height={height}
        pattern={boxPattern}
        scale={scale}
      />
      <ControlPanel />
    </div>
  );
}
