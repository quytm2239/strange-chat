Date.prototype.ddmmhhmm = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();
  var hh = this.getHours();
  var min = this.getMinutes();

  return ((dd > 9 ? '' : '0') + dd) + '/' + ((mm > 9 ? '' : '0') + mm) + ' ' + ((hh > 9 ? '' : '0') + hh) + ':' + ((min > 9 ? '' : '0') + min)
};
var myName = '';
var messHtml = '<div class="media-left">' +
                    '<img src="{avatar}" class="img-circle img-sm" alt="Profile Picture">' +
                  '</div>' +
                  '<div class="media-body pad-hor">' +
                    '<div class="speech">' +
                      '<a href="#" class="media-heading">{username}</a>' +
                      '<p>{message}</p>' +
                      '<p class="speech-time">' +
                        '<i class="fa fa-clock-o fa-fw"></i> {time}' +
                      '</p>' +
                    '</div>' +
                  '</div>';
$(function () {
  var socket = io();
  $('form').submit(function(e) {
    e.preventDefault(); // prevents page reloading
    socket.emit('new_message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('your_info', function(msg){
    myName = msg.username
  });
  socket.on('new_message', function(msg){
    var date = new Date(msg.time).ddmmhhmm();
    var suffix = myName === msg.username ? '(You)' : ''
    var res = messHtml.replace("{username}", msg.username + suffix);
    res = res.replace("{message}", msg.message);
    res = res.replace("{avatar}", msg.avatar);
    res = res.replace("{time}", date);
    $('#messages').append($('<li class="mar-btm">').html(res));
    $('#messages-container').animate({scrollTop: $('#messages').prop("scrollHeight")}, 100);
  });
  socket.on('join_chat', function(msg){
    var suffix = myName === msg.username ? '(You)' : ''
    $('#messages').append($('<li class="mar-btm">').html('<b>' + msg.username + suffix + '</b>' + ' has joined chat.</br>Online user: ' + msg.total_online));
    $('#messages-container').animate({scrollTop: $('#messages').prop("scrollHeight")}, 100);
  });
});
