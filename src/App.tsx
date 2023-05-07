import { useRef, useState } from "react";
import "./App.css";

function App() {
  const dragItem = useRef<any>();
  const dragOverItem = useRef<any>();

  const [selectedDragIndex, setSelectedDragIndex] = useState<{
    i: number;
    j: number;
  }>({
    i: -1,
    j: -1,
  });

  const [selectedDropIndex, setSelectedDropIndex] = useState<{
    i: number;
    j: number;
  }>({
    i: -1,
    j: -1,
  });
  const [colorMatrix, setColorMatrix] = useState<string[][]>([
    [
      "#ffcccc",
      "#ffe6cc",
      "#ffffcc",
      "#e6ffcc",
      "#ccffe6",
      "#ccffff",
      "#cce5ff",
      "#013366",
    ],
    [
      "#ff999a",
      "#ffcc99",
      "#ffff99",
      "#ccff99",
      "#99ff99",
      "#99ffcd",
      "#99ffcd",
      "#99ccff",
    ],
    [
      "#ff6666",
      "#ffb366",
      "#ffff67",
      "#b2ff66",
      "#66ff66",
      "#66ffb3",
      "#66ffff",
      "#66b2ff",
    ],
    [
      "#ff3333",
      "#ff9933",
      "#ffff33",
      "#99ff32",
      "#34ff32",
      "#34ff99",
      "#34ffff",
      "#3399fe",
    ],
  ]);

  const onDragStart = (i: number, j: number) => {
    setSelectedDragIndex({ i, j });
  };

  const onDragEnter = (i: number, j: number) => {
    setSelectedDropIndex({ i, j });
  };

  const onDragEnd = () => {
    const copyColorMatrix = [...colorMatrix];
    const dragElement =
      copyColorMatrix[selectedDragIndex.i][selectedDragIndex.j];
    const dropElement =
      copyColorMatrix[selectedDropIndex.i][selectedDropIndex.j];
    copyColorMatrix[selectedDropIndex.i][selectedDropIndex.j] = dragElement;
    copyColorMatrix[selectedDragIndex.i][selectedDragIndex.j] = dropElement;
    setColorMatrix([...copyColorMatrix]);
  };

  return (
    <div
      style={{
        padding: "10px 0 0 10px",
      }}
    >
      {colorMatrix.map((arr, i) => {
        return (
          <div
            style={{
              display: "flex",
            }}
            className="color-block-wrapper"
          >
            {arr.map((color, j) => {
              return (
                <div
                  draggable
                  key={`color ${i}${j}`}
                  className="color-block"
                  style={{
                    background: color,
                  }}
                  onDragStart={() => onDragStart(i, j)}
                  onDragEnter={() => onDragEnter(i, j)}
                  onDragEnd={onDragEnd}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default App;
