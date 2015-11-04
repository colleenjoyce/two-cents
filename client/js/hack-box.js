'use strict';

var $ = require('jquery');

function showProgress() {
  $("section").each(function(index, el) {
    var $container = $(".container");

    if ($(el).is(":visible")) {
        $container.removeClass();
        $container.addClass("index-" + index);
    }
  });
}

function selectFeeling(e) {
  var $this = $(e.currentTarget);
  var content = $this.children('p').text();
  var $emotion = $('.emotion');
  var emoType = $this.data('feeling');

  $('.box.feeling').removeClass('selected');
  $this.addClass('selected');
  $emotion.text(content.toLowerCase());

  // Show correct grid
  $('.grid-because').children('.grid-container').hide();
  $('.grid-container.' + emoType).show();

  $('.grid-feeling').hide();
  $('.grid-because').show();
}

function selectReason(e) {
  var $this = $(e.currentTarget);

  $('.box.because').removeClass('selected');
  $this.addClass('selected');

  $('.grid-because').hide();
  $('.grid-better').show();
}

function selectBetter(e) {
  var $this = $(e.currentTarget);

  $('.box.better').removeClass('selected');
  $this.addClass('selected');

  // Fill in inputs
  fillInputs();

  $('.grid-better').hide();
  $('.mad-libs').show();
}

function fillInputs() {
  var feeling = $('.box.feeling.selected').children('p').text();
  var because = $('.box.because.selected').children('p').text();
  var better = $('.box.better.selected').children('p').text();

  $('input[name=feeling]').val(feeling.toLowerCase());
  $('em.feeling').text(feeling.toLowerCase());
  $('input[name=because]').val(because.toLowerCase());
  $('em.because').text(because.toLowerCase());
  $('input[name=better]').val(better.toLowerCase());
  $('em.better').text(better.toLowerCase());
}

function goToSection(className) {
  return function(e) {
    $('section').hide();
    $('.' + className).show();
  }
}

function initEvents() {
  $('.box.feeling').click(selectFeeling);
  $('.box.because').click(selectReason);
  $('.box.better').click(selectBetter);
  $('.emotion').click(goToSection('grid-feeling'));
  $('.start-over').click(goToSection('grid-feeling'));
  $('.get-started').click(goToSection('grid-feeling'));
  $('em.feeling').click(goToSection('grid-feeling'));
  $('em.because').click(goToSection('grid-because'));
  $('em.better').click(goToSection('grid-better'));
  $(document).click(showProgress);
}

function init() {
  initEvents();
}

module.exports = {
  init : init
};
