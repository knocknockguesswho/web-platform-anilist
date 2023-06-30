const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  customErrorPage: true,
  images: {
    domains: ['s4.anilist.co', 'images.unsplash.com', 'media.istockphoto.com'],
  },
  webpack: (config) => {
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));
    return config;
  },
};
