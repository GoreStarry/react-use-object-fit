import React from "react";

import App from "./App";

export default {
  title: "Example/Page",
  component: App,
};

const Template = (args) => <App {...args} />;

export const ImageUpload = Template.bind({});
ImageUpload.args = {};
