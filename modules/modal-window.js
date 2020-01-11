// Поиск до нужного элемента по родителям
function findParent(item, query) {
    // Если элемента нет, то доходим до body и закругляемся
    if (item === null || item.tagName === 'BODY') {
        return false;
    }

    // Если нашли нужный элемнет, то возвращаем его, иначе берем его родителя и ищем снова
    if (item.classList.contains(query)) {
        return item;
    } else {
        return findParent(item.parentElement, query);
    }
}

// Поиск до нужного элемента по потомкам
function delegateModal(event) {
    let target = event.target;

    if (target.classList.contains('js-show-modal')) {
        event.preventDefault();
        showModal(target);
    }
    else {
        target = findParent(target, 'js-show-modal');
        if (target) {
            event.preventDefault();
            showModal(target);
        }
    }
}

// Закрытие модального окна
function closeModal(event) {
    event.preventDefault();

    let modalWindow = findParent(event.target, 'modal-window');
    let modalOverlay = modalWindow.querySelector('.modal-window__overlay');
    let modalArea = modalWindow.querySelector('.modal-window__area');
    let closeBtns = modalWindow.getElementsByClassName('js-close-modal');

    if (closeBtns.length > 0) {
        for (let i = 0; i < closeBtns.length; i++) {
            closeBtns[i].removeEventListener('click', closeModal);
        }
    }

    modalOverlay.removeEventListener('click', closeModal);

    modalOverlay.classList.remove('modal-window__overlay_show');
    modalArea.classList.remove('modal-window__area_show');

    // Необходимо для отработки css-анимации
    setTimeout(function () {
        modalWindow.classList.remove('modal-window_show');
    }, 300);
}

// Открытие модального окна
export function showModal(item, withoutButton) {
    let link, linkHref = null;

    if (!withoutButton) {
        link = item;
        linkHref = link.getAttribute('href');
    } else {
        linkHref = item;
    }

    let modalWindow = document.getElementById(linkHref.substr(1));
    let modalOverlay = modalWindow.querySelector('.modal-window__overlay');
    let modalArea = modalWindow.querySelector('.modal-window__area');
    let closeBtns = modalWindow.getElementsByClassName('js-close-modal');

    modalWindow.classList.add('modal-window_show');

    // Необходимо для отработки css-анимации
    setTimeout(function () {
        modalOverlay.classList.add('modal-window__overlay_show');
        modalArea.classList.add('modal-window__area_show');
    }, 100);

    modalOverlay.addEventListener('click', closeModal);

    if (closeBtns.length > 0) {
        for (let i = 0; i < closeBtns.length; i++) {
            closeBtns[i].addEventListener('click', closeModal);
        }
    }
}

// Инициализация делегированного события для модального окна
export default function initModal() {
    document.body.addEventListener('click', delegateModal);
}
