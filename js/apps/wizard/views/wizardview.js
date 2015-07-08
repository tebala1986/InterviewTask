define(function(require) {
  'use strict';

  /**
  * Module wizard Base init view
  * path: apps/wizard/views/wizard
  * @class wizard
  */

  var baseAddress  = {
      firstname : "",
      lastname : ""
      },
      detailedAddress ={
          address1    : "",
          address2    : "",
          city            : "",
          state           : "",
          zip             : ""
      };
  var Backbone = require('backbone')

  // templates
  , template = require('tpl/apps/wizard/templates/layout')

  // just for test
  , Backbone_wizard = require('wizard')
  //Steps
  , WizardSteps = [
      { view: require('apps/wizard/steps/init/view'), title:'Step 1', intro:'', model : baseAddress},
      { view: require('apps/wizard/steps/finish/view'), title:'Step 2', model : detailedAddress},
  ];

  return Backbone.View.extend({
    /**
    * Add initialize init
    * @name class.initialize
    * @class DictionariesBaseView
    * @constructor
    */

    initialize:function () {
      this.template = template;
      console.log('init BaseView' );
    },

    render:function () {
      console.log('rendering....' );
      var self = this;
      $(this.el).html(this.template() );
      window.wizard = new Backbone_wizard({
        el : self.$el.find('#wizardContainer'),
        steps : WizardSteps
      });
      return this;
    }
  });
});