import React from "react";

import App from "./App";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Example/Page",
  component: App,
  argTypes: {
    type: {
      options: ["cover", "contain"],
      control: { type: "select" },
    },
  },
};

const Template = (args) => <App {...args} />;

export const ImageUpload = Template.bind({});
ImageUpload.args = {
  type: "cover",
  containerWidth: 100,
  containerHeight: 200,
};
