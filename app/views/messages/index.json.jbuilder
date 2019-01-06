json.array! @new_message.each do |message|
  json.user_name    message.user.name
  json.date    message.created_at
  json.content message.content
  json.image   message.image
  json.id      message.id
end
