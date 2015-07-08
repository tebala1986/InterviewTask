require.config({
  waitSeconds: 0,
  baseUrl: 'js',
  paths: {
    // Libraries
    jquery      : "../libs/jquery/jquery",
    backbone    : '../libs/backbone-1.1.2/backbone',
    handlebars  : "../libs/handlebars/handlebars",
    underscore  : "../libs/underscore/underscore",
    jade        : '../libs/jade/runtime',
    bootstrap   : '../libs/bootstrap-3/bootstrap',
    wizard      : '../libs/wizard.widgets.1.0' // custom library
  },

  shim: {
    jquery: {
      exports: '$'
    },
    backbone:{
      deps: ['jquery','underscore'],
      exports: 'Backbone'
    },
    underscore: {
      exports: '_'
    },
    handlebars: {
      deps: ['backbone'],
      exports: 'Handlebars'
    },
    bootstrap:{
      deps: ['jquery']
    },
    wizard:{
      deps:['underscore', 'backbone']
    }
  }
});

define(function(require) {
  'use strict';

  var Backbone = require('backbone'),
      AppRouter = require('apps/router');

  new AppRouter({});

  Backbone.history.start();

});
