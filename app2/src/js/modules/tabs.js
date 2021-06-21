import utils from './utils';

function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClassname) {
  const tabsContainer = document.querySelector('.tabcontainer');
  const tabs = tabsContainer.querySelectorAll(tabsSelector);
  const tabsContent = tabsContainer.querySelectorAll(tabsContentSelector);
  const tabsParent = tabsContainer.querySelector(tabsParentSelector);


  function hideTabContent () {
    tabsContent.forEach(item => {
      item.classList.add(utils.hidden_classname);
      item.classList.remove(utils.shown_classname, utils.fade_classname);
    });

    tabs.forEach(tab => {
      tab.classList.remove(activeClassname);
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add(utils.shown_classname, utils.fade_classname);
    tabsContent[i].classList.remove(utils.hidden_classname);
    tabs[i].classList.add(activeClassname);
  }

  hideTabContent();
  showTabContent(0);

  tabsParent.addEventListener('click', (evt) => {
    const target = evt.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

export default tabs;