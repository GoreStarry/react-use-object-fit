# react-use-object-fit

Get scale size and offset by custom hook, mainly used for canvas evn.

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
 *   container: {
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
 *    ratio, // origin image ratio
 *    imgWidth,
 *    imgHeight,
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
    ratio,
    offsetX,
    offsetY,
    imgWidth,
    imgHeight,
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
        width={imgWidth}
        height={imgHeight}
        x={offsetX}
        y={offsetY}
      />
  );
}

```

[Storybook](https://gorestarry.github.io/react-use-object-fit/storybook)

## License

MIT
