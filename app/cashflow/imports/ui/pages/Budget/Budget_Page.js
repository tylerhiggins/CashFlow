import { Template } from 'meteor/templating';
import { Stuff } from '../../../api/stuff/stuff.js';
import { Goals } from '../../../api/stuff/goals.js';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import './Budget_Page.js';

// create some locally global variables the helper functions can access
Template.Budget_Page.onCreated(function diffOnCreated() {
  // total starts at 0
  this.diff = new ReactiveVar(0);
});

// Display the Schema data on the page
Template.Budget_Page.helpers({
  /**
   * @returns {*} All of the Stuff documents.
   */
  stuffList() {
    return Stuff.find();
  },
  /**
   * @returns {*} All of the Goals documents.
   */
  goalList() {
    return Goals.find();
  },

  // return the difference between the goal and the balance
  difference(goal, balance) {
    const diff = Math.round((goal - balance) * 100) / 100;
    if (diff < 0) {
      return 0;
    }
    return diff;
  },

  // check if the current user is the owner of the budget data
  isOwner(user) {
    return user.hash.user === Meteor.userId();
  },
});
