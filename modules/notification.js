export default function showNotify(title, message, type) {
    let notificationList = document.getElementsByClassName('notification__list')[0];
    let notification = document.createElement("li");
    let animateTimer = null;
    let oldNotify = document.querySelectorAll('.notification__item_hidden');
    let delay = 7000;

    if (typeof notificationList === 'undefined' || notificationList === null) {
        console.warn('На странице не найден блок нотификаций');

        return false;
    }

    // Подчищаем старые уведомления
    if (oldNotify.length > 0) {
        Array.prototype.slice.call(oldNotify).map(item => item.remove());
    }

    notification.classList.add('notification__item');

    // Установка типа уведомления
    switch (type) {
        case 'error':
            notification.classList.add('notification__item_error');
            break;

        case 'success':
            notification.classList.add('notification__item_success');
            break;
    }

    // Если есть только заголовок, добавляем нужный класс
    if (message === '' || message === false) {
        notification.classList.add('notification__item_title-only');
    }

    // Заполняем контентом элемент
    notification.innerHTML = "<p class='notification__title'>" + title + "</p><p class='notification__text'>" + message + "</p>";
    notification.innerHTML += "<a href='#' class='notification__close' onclick='this.parentNode.remove(); return false;'><i class='material-icons notification__close-icon'>close</i></a>";

    notificationList.appendChild(notification);

    // Анимация добавления в общий список уведомлений
    let notificationItems = Array.prototype.slice.call(notificationList.getElementsByClassName('notification__item'));
    let items = notificationItems.reverse();
    let newItem = items[0];
    let newItemHeight = newItem.offsetHeight;

    notificationList.setAttribute("style", "padding-bottom: " + (newItemHeight + 10) + "px");
    notificationList.classList.add('notification__list_animate');

    if (animateTimer !== null) {
        clearTimeout(animateTimer);
    }

    animateTimer = setTimeout(function () {
        notificationList.classList.remove('notification__list_animate');
        notificationList.style.paddingBottom = 0;

        newItem.classList.add('notification__item_show');

        // Автоматическое закрытие уведомления
        setTimeout(function () {
            newItem.classList.add('notification__item_hide');
        }, delay);

        setTimeout(function () {
            newItem.classList.remove('notification__item_hide');
            newItem.classList.remove('notification__item_show');
            newItem.classList.add('notification__item_hidden');
        }, delay + 1000);
    }, 300);
}