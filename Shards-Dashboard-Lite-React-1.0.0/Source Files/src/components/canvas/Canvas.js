import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

const Canvas = props => {
  const [scale, SetScale] = useState(1);
  const canvasRef = useRef(null);

  const defineScale = (x, y, userX, userY) => {
    var xScale = userX / x;
    var yScale = userY / y;

    if (xScale < yScale) {
      SetScale(xScale);
      return xScale;
    } else {
      SetScale(yScale);
      return yScale;
    }
  };

  const drawBorders = (ctx, layout, thisScale) => {
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.rect(
      layout.upperLeft[0] * thisScale + 5,
      layout.upperLeft[1] * thisScale + 5,
      layout.bottonRigh[0] * thisScale - 10,
      layout.bottonRigh[1] * thisScale - 10
    );
    ctx.stroke();
  };

  const drawInnerBorders = (ctx, layout, thisScale) => {
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.rect(
      layout.upperLeft[0] * thisScale,
      layout.upperLeft[1] * thisScale,
      (layout.bottonRigh[0] - layout.upperLeft[0]) * thisScale,
      (layout.bottonRigh[1] - layout.upperLeft[1]) * thisScale
    );
    ctx.stroke();

    if (!layout.isObstacle) {
      ctx.fill();
    }
  };

  useEffect(() => {
    if (props.layout != undefined) {
      let innerLayout = {
        upperLeft: [0, 0],
        bottonRigh: [100, 100]
      };

      const canvas = canvasRef.current;

      const originalHeight = canvas.height;
      const originalWidth = canvas.width;

      let dimensions = getObjectFitSize(
        true,
        canvas.clientWidth,
        canvas.clientHeight,
        canvas.width,
        canvas.height
      );

      const dpr = window.devicePixelRatio || 1;
      canvas.width = dimensions.width * dpr;
      canvas.height = dimensions.height * dpr;

      const context = canvas.getContext("2d");
      let ratio = Math.min(
        canvas.clientWidth / originalWidth,
        canvas.clientHeight / originalHeight
      );
      context.scale(ratio * dpr, ratio * dpr);

      const thisScale = defineScale(
        props.layout.bottonRigh[0] - props.layout.upperLeft[0],
        props.layout.bottonRigh[1] - props.layout.upperLeft[1],
        context.canvas.width,
        context.canvas.height
      );

      // outer(context, props.innerLayout);
      drawBorders(context, props.layout, thisScale);

      if (props.layout.innerLayout !== undefined) {
        props.layout.innerLayout.map(layout => {
          drawInnerBorders(context, layout, thisScale);
        });
      }
    }
  }, [drawBorders]);

  function getObjectFitSize(
    contains /* true = contain, false = cover */,
    containerWidth,
    containerHeight,
    width,
    height
  ) {
    var doRatio = width / height;
    var cRatio = containerWidth / containerHeight;
    var targetWidth = 0;
    var targetHeight = 0;
    var test = contains ? doRatio > cRatio : doRatio < cRatio;

    if (test) {
      targetWidth = containerWidth;
      targetHeight = targetWidth / doRatio;
    } else {
      targetHeight = containerHeight;
      targetWidth = targetHeight * doRatio;
    }

    return {
      width: targetWidth,
      height: targetHeight,
      x: (containerWidth - targetWidth) / 2,
      y: (containerHeight - targetHeight) / 2
    };
  }

  return <canvas ref={canvasRef} {...props} />;
};

// Canvas.propTypes = {
//   layour: PropTypes.object,
//   innerLayout: PropTypes.array
// };

export default Canvas;
