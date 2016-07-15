// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require bootstrap
//= require jquery_ujs
//= require turbolinks
//= require_tree .
$(document).on('click', '.add_answer', function() {
  var association = $(this).attr('name');
  var regexp = new RegExp('new_' + association, 'g');
  var new_id = new Date().getTime();
  $(this).parent().before(window[association + '_form'].replace(regexp, new_id));
  return false;
});

$(document).on('click', '.remove', function() {
  $(this).closest('.field').remove();
  return false;
});

function addForm() {
  var association = 'answers';
  var regexp = new RegExp('new_' + association, 'g');
  var new_id = new Date().getTime();
  $('.add_answer').parent().before(window[association + '_form'].replace(regexp, new_id));
  $('.correct-choose').hide();
  $('.remove-choose').hide();
}

function changeType() {
  var options = $('.field');
  options.remove();
}

var prev;
$(document).on('focus', '.question-type', function() {
  prev = this.value;
});

$(document).on('change', '.question-type', function() {
  if($(this).val() == 0) {
    $('.form-inline').remove();
    $('.add_answer').show();
    var allCheckboxs = $('.correct');
    allCheckboxs.each(function(index, cb) {
      $(cb).attr('checked', false);
    })
    if(prev == 'text'){
      changeType();
    }
  } else if ($(this).val() == 1) {
    $('.form-inline').remove();
    $('.add_answer').show();
    if(prev == 'text'){
      changeType();
    }
  } else if($(this).val() == 2) {
    $('.add_answer').hide();
    changeType();
    addForm();
    var allCheckboxs = $('.correct');
    allCheckboxs.each(function(index, cb) {
      $(cb).attr('checked', true);
    })
  }
  prev = $(this).val();
});
