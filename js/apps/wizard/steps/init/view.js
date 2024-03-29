define(function(require) {
  'use strict';

  var Backbone = require('backbone'),
      wizardTpl = require('tpl/apps/wizard/steps/init/template');

  return Backbone.View.extend({

    initialize: function() {
      console.log('first wizard view');
      this.template = wizardTpl;
    },

    render: function() {
      $(this.el).html(this.template());
      return this;
    }
  });
});