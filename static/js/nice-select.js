
document.addEventListener('DOMContentLoaded', function () {
    const niceSelect = document.querySelectorAll('.nice-select');

    niceSelect.forEach(function (selectElement) {
        const select = selectElement.querySelector('select');
        const customSelect = document.createElement('div');
        customSelect.classList.add('nice-select-wrapper');

        const trigger = document.createElement('div');
        trigger.classList.add('custom-select');
        customSelect.appendChild(trigger);

        const list = document.createElement('ul');
        list.classList.add('list');
        customSelect.appendChild(list);

        selectElement.appendChild(customSelect);

        const currentText = document.createElement('span');
        currentText.classList.add('current');
        trigger.appendChild(currentText);

        Array.from(select.options).forEach(function (option) {
            const listItem = document.createElement('li');
            listItem.classList.add('option');
            listItem.textContent = option.textContent;
            listItem.dataset.value = option.value;
            listItem.addEventListener('click', function () {
                select.value = listItem.dataset.value;
                currentText.textContent = listItem.textContent;
                closeDropdown();
                select.dispatchEvent(new Event('change'));
            });
            list.appendChild(listItem);
        });

        trigger.addEventListener('click', function (e) {
            e.stopPropagation();
            if (customSelect.classList.contains('open')) {
                closeDropdown();
            } else {
                openDropdown();
            }

            document.addEventListener('click', function (e) {
                if (!customSelect.contains(e.target)) {
                    closeDropdown();
                }
            });

            function openDropdown() {
                customSelect.classList.add('open');
                list.style.display = 'block';
            }

            function closeDropdown() {
                customSelect.classList.remove('open');
                list.style.display = 'none';
            }
        });
    })

});