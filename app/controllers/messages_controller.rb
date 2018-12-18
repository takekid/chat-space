class MessagesController < ApplicationController
  def index
  end
  def chat_display_acction
    render layout: 'chat_display'
  end
end
