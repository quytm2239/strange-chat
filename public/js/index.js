Date.prototype.ddmmhhmm = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();
  var hh = this.getHours();
  var min = this.getMinutes();

  return ((dd > 9 ? '' : '0') + dd) + '/' + ((mm > 9 ? '' : '0') + mm) + ' ' + ((hh > 9 ? '' : '0') + hh) + ':' + ((min > 9 ? '' : '0') + min)
};
var myName = '';
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
    console.log(date);
    var suffix = myName === msg.username ? '(You)' : ''
    $('#messages').append($('<li>').html(date + ': ' + '<b>' +  msg.username + suffix + '</b>' + ' just talk: ' + '<b>' + msg.message + '</b>'));
  });
  socket.on('join_chat', function(msg){
    var suffix = myName === msg.username ? '(You)' : ''
    $('#messages').append($('<li>').html('<b>' + msg.username + suffix + '</b>' + ' has joined chat. Online user: ' + msg.total_online));
  });
});
