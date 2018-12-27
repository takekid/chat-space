$(function(){
  function buildHTML(message){
    var InputImage = '';
    if (message.image.url) {
    InputImage = `<img src="${message.image.url}">`;
  }
  var html = `<div class="message" data-message-id=${message.id}>
                      <div class="upper-message">
                          <div class="upper-message__user-name">
                            ${ message.user_name }
                          </div>
                          <div class="upper-message__date">
                            ${ message.time }
                          </div>
                      </div>
                      <div class="lower-message">
                          <p class="lower-message__content">
                            ${message.content }
                          </p>
                          ${InputImage}
                      </div>
                  </div>`;
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__message').val('');
      $('.form__submit').prop('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('error');
    })
    })

  var interval = setInterval(function(){
    if(window.location.href.match(/\/groups\/\d+\/messages/)) {
      var message_id = $('.message').last().data('message-id');
      $.ajax({
      url: location.href,
      type:'GET',
      data: { id: message_id },
      dataType: 'json'
    })
    .done(function(data) {
      data.forEach(function(message) {
        var html = buildHTML(message);
        $('.messages').append(html);
        $('.form__submit').val('');
        $('.form__submit').prop('disabled', false);
        $(".messages").animate({scrollTop:$('.messages')[0].scrollHeight},'fast');
      })
        })
    .fail(function(){
      alert('更新に失敗しました');
    });
    } else {
      clearInterval(interval);
    }},5000);
  });
