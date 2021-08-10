# react-use-object-fit

Get scale size and offset by custom hook, mainly used for draw canvas.

[Storybook](https://gorestarry.github.io/react-use-object-fit/storybook)

## Install

### npm

```bash
npm install --save GoreStarry/react-use-object-fit
```

### yarn

```bash
yarn add GoreStarry/react-use-object-fit
```

## API

```js
/**
 * @param {object} {
 *   type, // "cover", "contain"
 *   imgUrl,
 *   container: {****
 *      ref, // get container size by React ref
 *      dom, // get container size by Dom elm
 *      width, // directly give container size
 *      height
 *   },
 * }
 * @return {object} {
 *    width, // object fit width
 *    height, // object fit hight
 *    offsetX, // object fit offsetX
 *    offsetY, // object fit offsetY
 *    imgWidth,
 *    imgHeight,
 *    imgRatio,
 *    containerWidth,
 *    containerHeight,
 * }
 */
```

## Usage

```js
import React from 'react';

import useObjectFit from "react-use-object-fit";

export default function App() {
  const url = 'https://??';
  const {
    width,
    height,
    offsetX,
    offsetY,
    imgWidth,
    imgHeight,
    imgRatio,
    containerWidth,
    containerHeight,
  } = useObjectFit({
    type: "cover",
    imgUrl: url,
    container: { width: 60, height: 100 },
  });

  return (
     <Sprite
        image={url}
        width={width}
        height={height}
        x={offsetX}
        y={offsetY}
      />
  );
}

```

## License

MIT
