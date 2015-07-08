/**
 * @fileOverview Main router file
 */

/**
 * Router component Require module
 * @name RouterModule
 * @class
 * @param {Object} _ Underscore
 * @param {Object} Backbone Backbone
 * @return {Constructor} Router
 */
define(function(require) {
  'use strict';
  var Backbone = require('backbone'),
      WizardViewer = require('apps/wizard/views/wizardview');

  return Backbone.Router.extend({
    routes: {
      "": 'Wizard',
      "/": 'Wizard'
    },
    // sections
    Wizard: function(){
      $('#backbone').html( (new WizardViewer()).render().el );
    }
  });
});
