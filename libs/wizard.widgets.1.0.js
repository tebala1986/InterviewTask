/*!
 * Collecting user input by using forms is a recurring task in web development. A group of forms that
 * is used to accomplish a task is often called a wizard. The Wizard control simplifies many
 * of the tasks that are associated with building multiple forms and collecting user input. The
 * Wizard control provides a simple mechanism that allows you to easily build steps, add a new step,
 * or reorder the steps
 *
 */
define(function(a) {
    "use strict";
    var b; // if exist requireJs
    "undefined" != typeof a && (a("underscore") && a("backbone") || console.log('requireJs shim configuration:\npath-to-lib:{\ndeps:["underscore","backbone"]\n}')), window._ ? _ = window._ : console.log("You need to have underscore previously loaded"), window.Backbone ? b = window.Backbone : console.log("You need to have Backbone prevoiusly loaded");
    var c = '<div id="progress_indicator" class="progress_indicator"></div><div class="right"><header><h2 id="step_title"></h2><p id="step_instructions"></p></header><div class="current_step_container"></div></div><footer><div id="buttons"><button id="prev_step_button" class="btn btn-info">Prev:</button><button id="next_step_button" class="btn btn-info">Next:</button></div></footer>',
        e = b.View.extend({
            id: "wizard",
            events: {
                "click #next_step_button": "nextStep",
                "click #prev_step_button": "goToStep",
                "click #progress_indicator > label": "goToStep"
            },
            initialize: function(a) {
                _.bindAll(this, "render", "updateModel"),
                console.log("arg", a),
                    this.steps = a.steps,
                    this.currentStep = 0,
                    this.template =  c
            },
            updateModel     :   function(){
                'use strict';
                for(var property in this.steps[this.currentStep].model){
                    this.steps[this.currentStep].model[property] = $("#"+property).val();
                }
            },
            render: function() {
                return $(this.el).html(_.template(this.template)),
                    this.progressIndicator = this.$("#progress_indicator"),
                    this.title = this.$("h2#step_title"),
                    this.instructions = this.$("p#step_instructions"),
                    this.currentStepContainer = this.$(".current_step_container"),
                    this.nextStepButton = this.$("#next_step_button"),
                    this.prevStepButton = this.$("#prev_step_button"),
                    this.renderStep(this.currentStep, !0), this
            },
            renderProgressIndicator: function() {
                this.progressIndicator.empty(), _.each(this.steps, _.bind(function(a) {
                    if (a.step_number <= this.currentStep) {
                        var b = '<label data-step="' + a.step_number + '"><span>' + a.step_number + "</span><title>" + a.title + "</title></label>";
                        this.progressIndicator.append(b)
                    }
                }, this))
            },
            addStep: function(a) {
                console.log("adding step WIV", a), console.log("steps", this.steps);
                for (var b = this.currentStep + 1; b < this.steps.length; b++) {
                    var c = this.steps[b];
                    c.step_number = this.steps[b].step_number + 1
                }
                this.steps.splice(this.currentStep + 1, 0, a), this.renderStep(this.currentStep, !0)
            },
            renderStep: function(a, b) {
                console.log("renderStep", a, b, this.steps);
                var c, d = this.steps[a];
                this.isFirstStep() ? console.log("First Step Called") : c = this.steps[this.currentStep - 1];
                var e = this.steps[this.currentStep + 1];
                this.title.html(d.title),
                this.instructions.html(d.instructions),
                this.currentView = new d.view,
                this.currentStepContainer.html(this.currentView.render().el),
                this.renderProgressIndicator(),
                c ? (this.prevStepButton.attr("data-step", this.currentStep - 1), this.prevStepButton.html("Prev: " + c.title).show()) : this.prevStepButton.hide(),
                this.nextStepButton.html(e ? "Next: " + e.title : "Finish")
            },
            goToStep: function(a) {
                var b = parseInt($(a.currentTarget).attr("data-step"));
                console.log("click stepProgress", b), this.prevStep(b)
            },
            nextStep: function() {
                this.updateModel(),this.isLastStep() ? this.save() : (this.currentStep += 1,
                    this.renderStep(this.currentStep, !0))
            },
            prevStep: function(a) {
                this.updateModel(),this.currentStep > 0 ? (a ? this.currentStep = parseInt(a) : (this.currentStep -= 1,
                    console.log("previous step",this.currentStep)),
                    this.renderStep(this.currentStep, !1)) : console.log("Smoothy progress is going on",this.renderStep(this.currentStep, !1))
            },
            isFirstStep: function() {
                return 0 === this.currentStep
            },
            isLastStep: function() {
                return this.currentStep == this.steps.length - 1
            },
            save: function() {
                console.log("sending form");
                var idx = 0 ;
                for(var o in this.steps) {
                    var t = "model" + idx;
                    localStorage.setItem(t, JSON.stringify(this.steps[o].model));
                    idx++;
                }
                alert("form has been sent successfully! \n you can read data from localStorage!");
            }
        });
    return b.View.extend({
        initialize: function(a) {
            _.bindAll(this, "render", "wizardMethod"),
            this.steps = this.turnSteps(a.steps),
            this.render()
        },
        turnSteps: function(a) {
            this.steps = [], console.log("number of slides", a.length);
            for (var b = 0; b < a.length; b++) this.steps.push({
                step_number: b,
                title: a[b].title,
                instructions: a[b].intro,
                view: a[b].view,
                model : a[b].model
            });
            return this.steps
        },
        render: function() {
            return this.wizardMethod(),
                (console.log("Going to Call Render Complete method"), this.onRenderComplete()),
                this
        },
        onRenderComplete: function() { // check every 200ms to see if this.el has been injected into the DOM
            if (!$.contains(document.documentElement, this.el)) {
                var a = this;
                return void setTimeout(function() {
                    a.onRenderComplete()
                }, 200)
            }
        },
        addStep: function(a) {
            console.log("adding step WBV"), this.wizard.addStep({
                step_number: window.wizard.wizard.currentStep + 1,
                title: a.title,
                instructions: a.intro,
                view: a.view
            })
        },
        wizardMethod: function() {
            var a = this.steps;
            this.wizard = new e({
                steps: a
            }), console.log("view", this.wizard), $(this.el).html(this.wizard.render().el)
        }
    })
});
