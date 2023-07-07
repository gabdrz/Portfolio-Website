import { useState, useEffect, useRef } from "react";

export const useBubblePositions = () => {
  const bubbleContainerRef = useRef();
  const bubbleSize = 50; // replace with your desired bubble size

  const calculateRowsAndColumns = (clientWidth, clientHeight) => {
    const minNumRows = 2; // Minimum number of rows
    const maxNumRows = 3; // Maximum number of rows
    const fullWidth = clientWidth;
    const fullHeight = clientHeight;

    let numRows = Math.floor(fullHeight / bubbleSize);
    numRows = Math.max(numRows, minNumRows);
    numRows = Math.min(numRows, maxNumRows);

    let numColumns = Math.floor(fullWidth / bubbleSize);

    return { numRows, numColumns };
  };

  const getGridPosition = (row, column, numColumns, numRows, clientWidth, clientHeight) => {
    const padding = 5;
    const availableWidth = clientWidth - 2 * padding;
    const availableHeight = clientHeight - 2 * padding;
    const xSpacing = availableWidth / (numColumns + 1);
    const ySpacing = availableHeight / (numRows + 1);
    const centerRow = Math.floor(numRows / 2);

    // Calculate y value based on row index
    let y = padding + row * ySpacing;
    if (row < centerRow) {
      y += (centerRow - row) * ySpacing / 2;
    } else if (row > centerRow) {
      y -= (row - centerRow) * ySpacing / 2;
    }

    return {
      x: padding + column * xSpacing,
      y: y,
    };
  };

  const getBubblePositions = (length, clientWidth, clientHeight) => {
    const { numRows, numColumns } = calculateRowsAndColumns(clientWidth, clientHeight);

    const gridPositions = Array.from({ length: length }, (_, index) => {
      const row = Math.floor(index / numColumns);
      const column = index % numColumns;
      return getGridPosition(row, column, numColumns, numRows, clientWidth, clientHeight);
    });

    return gridPositions;
  };

  const [bubblePositions, setBubblePositions] = useState(
    getBubblePositions(13, bubbleContainerRef.current?.clientWidth || 0, bubbleContainerRef.current?.clientHeight || 0)
  );

  useEffect(() => {
    const handleResize = () => {
      setBubblePositions(getBubblePositions(13, bubbleContainerRef.current.clientWidth, bubbleContainerRef.current.clientHeight));
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts.
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { bubblePositions, bubbleContainerRef };
};
