function	setActive(id) {
	var elements = document.getElementsByClassName("active_chat");
	if (elements)
		var element = elements[0];
	if (element)
		element.classList.remove(`active_chat`);
	var selectedChat = document.getElementById(id);
	selectedChat.className += ' active_chat';
}